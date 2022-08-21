const _ = require('lodash');
const notion = require('../../db/notion.js');

const parseParameter = (data) => {
  switch(data.type) {
    
    case 'property_item':
      const content = data.results[0];
      if (!content) return null;

      switch (content.type) {
        case 'rich_text':
          return content.rich_text.text.content || '';
        case 'title':
          return content.title.text.content
        default: 
          return null;
      }

    case 'number':
      return data.number || 0;

    default:
      return null;
  }
}

const createStep = async (page) => {
  const id = page.id;
  const keys = Object.keys(page.properties);
  const step = {};
  const props = keys.map(key => ({
    page_id: id,
    property_id: page.properties[key].id
  }));

  const results = await Promise.all(props.map(p => notion.pages.properties.retrieve(p)));

  results.forEach((res, i) => {
    step[keys[i].toLowerCase()] = parseParameter(res);    
  });

  return step;
}

const createSteps = async (response) => {
  const orderedResults = _.reverse(response.results);
  return await Promise.all(orderedResults.map(res => createStep(res)));
}

const queryData = async () => {
  const response = await notion.databases.query({
    database_id: process.env.CV_STEPS_DB_ID,
  });

  return createSteps(response);
};

module.exports = {
  queryData
}
