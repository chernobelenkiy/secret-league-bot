const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.IMPROVE_YOUR_CV);

const createMenu = (payload, yes = 1, no = 0) => {
  return {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [
        Markup.button.callback(`Да-${yes}`, payload),
        Markup.button.callback(`Нет-${no}`, payload),
      ]
    ])
  };
}

const start = {
  payload: 'smallResume',
  text: `
<b>Привет! Многих кандидатов волнует вопрос - а хорошее ли у меня резюме? Многие не могут понять это самостоятельно и прибегают к услугам экспертов. Мы подготовили для вас 9 простых вопросов, которые помогут понять, соответствует ли ваше резюме современным тенденциям и как его улучшить.</b>
Поехали!

1. Ваше резюме меньше двух страниц?
Варианты ответов и баллы:
`
};

const result = {
  id: 'demo',
  text: `
Комментарий эксперта
Перед отправкой резюме работодателю важно дать его кому-нибудь почитать, будь то знакомый HR, карьерный консультант или ваша любимая бабуля. Так вы получите мнение со стороны и исправите ошибки, если таковые имеются!

мин - 1
макс - 9

Ваш результат: От 1 до 5. Неплохой результат, но, есть ряд моментов, которые стоит улучшить. Сегодня ваши ответы комментировали эксперты сервиса бережной релокации <a href="https://relo.ae/">Relo.ae</a>. Если вы хотите улучшить ваше резюме и сопроводительное интервью, прокачать навык прохождения интервью на английском и найти работу в Европе и Великобританию, отправьте заявку -> форма заявки

Ваш результат: От 6 до 9. Супер-результат! Кажется, вы отлично поработали над своим резюме. Но, как говорится, нет предела совершенству. Сегодня ваши ответы комментировали эксперты сервиса бережной релокации <a href="https://relo.ae/">Relo.ae</a>. Если вы хотите улучшить ваше резюме и сопроводительное интервью, прокачать навык прохождения интервью на английском и найти работу в Европе и Великобританию, отправьте заявку -> форма заявки  
`
};

const steps = [
  {
    id: 'smallResume',
    payload: 'photo',
    text: `
Комментарий эксперта:
Согласно исследованиям, рекрутер тратит на просмотр резюме не более 7,5 секунд. А в очень крупных компаниях первичный отбор делают машины. В идеале, резюме не должно быть более 2-х страниц и содержать основные тэги. Резюме не должно походить на биографию Льва Толстого. Другая крайность - слишком мало информации, рекрутер может просто не понять, чем вы занимаетесь. Совет: соблюдайте баланс, из резюме должны быть понятны ваш функционал и достижения, но оно не должно быть более 2-ух страниц текста. 

2. В вашем резюме есть фото?
Варианты ответов и баллы:`
  },
  {
    id: 'photo',
    payload: 'template',
    text: `
Комментарий эксперта:
Кто это у нас тут такой красивый 🙂 На самом деле, однозначного ответа на этот вопрос, нужно ли фото в резюме, у нас нет. Согласно некоторым исследованиям, наличие фото в резюме повышает количество отказов. Если вы все-такие решили, что вашему резюме просто необходимо фото, то подойдите к выбору со всей серьезностью. На фото не должно быть посторонних людей, ваш образ должен располагать к себе работодателя. Фото на паспорт или с веселой вечеринки, наверное, не самый лучший вариант. Дерзайте, мы уверены, что вам удастся найти подходящий имидж для поиска работы мечты! 

3. Используете ли вы шаблон для резюме?
Варианты ответов и баллы:`
  },
  {
    id: 'template',
    payload: 'achievements',
    text: `
Комментарий эксперта:
Шаблон позволяет структурировать резюме, сделать его аккуратным и читабельным. Убедитесь, что в шаблоне нет огромных отступов и раздражающих элементов, отвлекающих от сути резюме. Также запомните, шаблон с работного сайта хорош только для этого работного сайта. Если вы планируете отправлять ваше резюме рекрутерам в почту, лучше поискать более компактный и красивый вариант в интернете, а не отправлять выгрузку с карьерного сайта.

4. Указаны ли в резюме ваши достижения?
Варианты ответов и быллы:
    `
  },
  {
    id: 'achievements',
    payload: 'custom',
    text: `
Комментарий эксперта:
Достижения - это важно! Убедитесь, что ваше резюме написано на языка результата. Описание функционала - это, конечно, хорошо, но работодатель хочет видеть, в первую очередь, ваши достидения. Метрики - это отличный способ доказать компетентность и повысить доверие к себе. Будьте Data-driven! 

5. Кастомизируете ли вы свое резюме, откликаясь на разные вакансии?
Варианты ответов и баллы:
    `
  },
  {
    id: 'custom',
    payload: 'letter',
    text: `
Комментарий эксперта:
Эксперты считают, что резюме, в идеале, необходимо кастомизировать под каждую вакансию. Это очень трудоемкий процесс, особенно, если вы отправляете 50-100 откликов. Мы рекомендуем иметь 2-3 версии резюме и кастомизировать и обязательно кастомизировать их под особенно интересные вам вакансии.

6. Есть ли у вас сопроводительное письмо?
Варианты ответов и баллы:
    `
  },
  {
    id: 'letter',
    payload: 'truth',
    text: `
Комментарий эксперта: 
Согласно статистике, только 30% кандидатов уделяют внимание вопроводительным письмам. Иногда работодатели сами указывают в вакансии вопросы, на которые нужно ответить в сопроводительном. Это своеобразный фильтр и тест на внимательность, не игнорирйе эти вопросы. В идеале, нужно иметь сопроводительное письмо, отвечающее на вопросы: кто вы? чем вас заинтересовала вакансия? и что вы можете в компанию привнести? Но не увлекайтесь, слишком подробное сопроводительное, с высокой долей вероятности, читать не будут.

7. В вашем резюме правда и только правда?
Варианты ответов и баллы:
    `
  },
  {
    id: 'truth',
    payload: 'relevant',
    text: `
Комментарий эксперта:
Конечно, кто не приукрашивает своих достижения на интервью 🙂 Это нормально, сам себя не похвалишь - никто не похвалит. Однако, не стоит размещать в резюме заведомо ложную информацию. Ложь может обнаружиться прямо на собеседовании, при проверке рекомендаций или, непосредственно, в ходе работы, если вы, например, припишете себе скилы, которыми не обладаете. Илон Маск рекомендует на интервью спрашивать человека о самых сложных проблемах , которые возникали на работе и о том, как он с ними справился. Илон считает, что “люди, которые действительно преодолевали трудности, точно знают ход решения - они могут опивсать даже самы мелкие детали”. Научно доказано, что такой метод увеличивает вероятность раскрытия лжецов на 70% и называется методом “ассиметричного управления информацией”

8. Актуальна ли информация о вас в резюме и профессиональных социальных сетях?
Варианты ответов и баллы:
    `
  },
  {
    id: 'relevant',
    payload: 'demo',
    text: `
Комментарий эксперта:
Иногда работа нас находит сама, когда мы ее не ищем. Если, например, в вашем LinkedIn содержится актуальная информация, рекрутеры могут найти вас сами. Поэтому не ленитесь и актуализируйте свой профиль, даже если поиск работы не актуален прямо сейчас. Всегда приятно а) иметь варианты в запасе б) понимать свою восстребованность на рынке труда.

9. Показывали ли вы свое резюме кому-либо?
Варианты ответов и баллы
    `
  },
];

bot.start((ctx) => {
  ctx.reply(start.text, createMenu(start.payload));
});

steps.forEach(step => {
  bot.action(step.id, (ctx) => {
    return ctx.reply(step.text, createMenu(step.payload));
  });
});

bot.action(result.id, (ctx) => {
  return ctx.reply(result.text);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));