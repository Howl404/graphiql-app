import displayNotification from 'utils/displayNotification';

const OPENING_BRACE = '{';
const CLOSING_BRACE = '}';
const NEW_LINE = '\n';
const SINGLE_SPACE = ' ';

export default function prettifyQuery(fullQuery: string) {
  const queryArr = fullQuery.split('fragment');
  const resultArr = queryArr.map((query) => {
    if (checkBrackets(query)) {
      const unformattedQuery = clearFormat(query);
      const formattedQuery = formatQuery(unformattedQuery);
      return addIndents(formattedQuery);
    } else {
      displayNotification(
        `Please check your query's brackets and run again`,
        'error'
      );
      return query;
    }
  });

  return resultArr.join(`${NEW_LINE}${NEW_LINE}fragment `);
}

function checkBrackets(query: string) {
  const stack = [];
  for (let i = 0; i < query.length; i++) {
    const currentChar = query[i];
    const topStackItem = stack[stack.length - 1];
    if (currentChar === OPENING_BRACE) {
      stack.push(currentChar);
    }
    if (currentChar === CLOSING_BRACE && topStackItem === OPENING_BRACE) {
      stack.pop();
    }
  }

  return stack.length === 0;
}

function clearFormat(query: string) {
  return query.replace(/\n/g, SINGLE_SPACE).replace(/\s+/g, SINGLE_SPACE);
}

function formatQuery(query: string) {
  const title =
    query.replace(/(?<![A-Za-z)]) {/gm, `{${NEW_LINE}`)[0] !== OPENING_BRACE
      ? query.split(OPENING_BRACE)[0]
      : '';
  if (title) {
    const queryInnerArr = query.split(OPENING_BRACE);
    queryInnerArr.shift();
    const queryInner = `{${queryInnerArr.join(OPENING_BRACE)}`;
    const formatInner = formatQueryInner(queryInner);
    return `${formatTitle(title.trim())} ${formatInner}`;
  } else {
    return formatQueryInner(query.trim());
  }
}

function formatTitle(queryTitle: string) {
  return queryTitle
    .replace(/( \( | \(|\( )/gm, '(')
    .replace(/( \))/gm, ')')
    .replace(/( : |(?<=[A-Za-z]):(?=[A-Za-z]))/gm, ': ')
    .replace(/( , |(?<=[A-Za-z]),(?=[A-Za-z]))/gm, ', ')
    .replace(/((?<=.[^ ])= |(?<=.[^ ])=(?=.[^ ])| =(?=.[^ ]))/gm, ' = ');
}

function formatQueryInner(query: string) {
  return query
    .replace(/( \( | \(|\( )/gm, '(')
    .replace(/( \))/gm, ')')
    .replace(/( : |(?<=[A-Za-z]):(?=[A-Za-z]))/gm, ': ')
    .replace(/( , |(?<=[A-Za-z]),(?=[A-Za-z]))/gm, ', ')
    .replace(/((?<=.[^ ])= |(?<=.[^ ])=(?=.[^ ])| =(?=.[^ ]))/gm, ' = ')
    .replace(/{/m, `${OPENING_BRACE}${NEW_LINE}`)
    .replace(/(?<![A-Za-z)]) {/gm, `${OPENING_BRACE}${NEW_LINE}`)
    .replace(/(?<=[A-Za-z)] |[A-Za-z)]){/gm, ` ${OPENING_BRACE}${NEW_LINE}`)
    .replace(/{\n (?=[A-Za-z)])/gm, `${OPENING_BRACE}${NEW_LINE}`)
    .replace(/}/gm, `${NEW_LINE}${CLOSING_BRACE}`)
    .replace(/} (?=[A-Za-z)])/gm, `${CLOSING_BRACE}${NEW_LINE}`)
    .replace(/}(?=[A-Za-z)])/gm, `${CLOSING_BRACE}${NEW_LINE}`)
    .replace(/(?<=[A-Za-z)]) (?=[A-Za-z)])/gm, NEW_LINE)
    .replace(/ {2,}/gm, SINGLE_SPACE);
}

function addIndents(query: string) {
  const queryArr = query.split(NEW_LINE);
  const indent = 2;
  let indentCount = 0;
  let result = '';

  for (let i = 0; i < queryArr.length; i++) {
    if (queryArr[i].includes(CLOSING_BRACE)) indentCount--;
    result +=
      SINGLE_SPACE.repeat(indentCount * indent) + queryArr[i].trim() + NEW_LINE;
    if (queryArr[i].includes(OPENING_BRACE)) indentCount++;
  }

  return result.trim();
}
