export const removeHashtags = (msg: string) => {
  const hashtagRegex = /#\w+/g;
  return msg.replace(hashtagRegex, "");
};

export const extractHashtags = (msg: string) => {
  const hashtagRegex = /#\w+/g;
  const hashMatches = msg.match(hashtagRegex);
  const hashTags = {} as { [key: string]: boolean };

  if (hashMatches) {
    hashMatches.forEach((hashtag) => {
      hashTags[hashtag.replace('#', '')] = true;
    });
  }

  return hashTags;
}