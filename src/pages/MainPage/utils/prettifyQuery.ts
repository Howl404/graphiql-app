import displayNotification from 'utils/displayNotification';

import { TranslationKeys } from 'hooks/useTranslation';

const OPENING_BRACE = '{';
const CLOSING_BRACE = '}';
const NEW_LINE = '\n';
const SINGLE_SPACE = ' ';

export default function prettifyQuery(
  fullQuery: string,
  translation: (key: TranslationKeys) => string
) {
  const queryArr = fullQuery.split('fragment');
  const resultArr = queryArr.map((query) => {
    if (checkBrackets(query)) {
      const clearedQuery = clearFormat(query);
      const formattedQuery = formatQuery(clearedQuery);
      return addIndents(formattedQuery);
    } else {
      displayNotification(translation('MainPage.prettifyError'), 'error');
      return query;
    }
  });

  return resultArr.join(`${NEW_LINE}${NEW_LINE}fragment `);
}

export function checkBrackets(query: string) {
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

export function clearFormat(query: string) {
  return query.replace(/\n/g, SINGLE_SPACE).replace(/\s+/g, SINGLE_SPACE);
}

export function formatQuery(query: string) {
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

export function formatTitle(queryTitle: string) {
  return queryTitle
    .replace(/( \( | \(|\( )/gm, '(')
    .replace(/( \))/gm, ')')
    .replace(/( : |(?<=[A-Za-z]):(?=[A-Za-z]))/gm, ': ')
    .replace(/( , |(?<=[A-Za-z]),(?=[A-Za-z]))/gm, ', ')
    .replace(/((?<=.[^ ])= |(?<=.[^ ])=(?=.[^ ])| =(?=.[^ ]))/gm, ' = ');
}

export function formatQueryInner(query: string) {
  return query
    .replace(/( \( | \(|\( )/gm, '(')
    .replace(/( \))/gm, ')')
    .replace(/\)(?=[A-Za-z])/gm, `)${NEW_LINE}`)
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

export function addIndents(query: string) {
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
