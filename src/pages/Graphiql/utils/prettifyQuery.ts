import displayNotification from 'utils/displayNotification';

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

  return resultArr.join('\n\nfragment ');
}

function checkBrackets(query: string) {
  const stack = [];
  for (let i = 0; i < query.length; i++) {
    const currentChar = query[i];
    const topStackItem = stack[stack.length - 1];
    if (currentChar === '{') {
      stack.push(currentChar);
    }
    if (currentChar === '}' && topStackItem === '{') {
      stack.pop();
    }
  }

  return stack.length === 0;
}

function clearFormat(query: string) {
  return query.replace(/\n/g, ' ').replace(/\s+/g, ' ');
}

function formatQuery(query: string) {
  const title =
    query.replace(/(?<![A-Za-z)]) {/gm, '{\n')[0] !== '{'
      ? query.split('{')[0]
      : '';
  if (title) {
    const queryInnerArr = query.split('{');
    queryInnerArr.shift();
    const queryInner = `{${queryInnerArr.join('{')}`;
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
    .replace(/{/m, '{\n')
    .replace(/(?<![A-Za-z)]) {/gm, '{\n')
    .replace(/(?<=[A-Za-z)] |[A-Za-z)]){/gm, ' {\n')
    .replace(/{\n (?=[A-Za-z)])/gm, '{\n')
    .replace(/}/gm, '\n}')
    .replace(/} (?=[A-Za-z)])/gm, '}\n')
    .replace(/}(?=[A-Za-z)])/gm, '}\n')
    .replace(/(?<=[A-Za-z)]) (?=[A-Za-z)])/gm, '\n')
    .replace(/ {2,}/gm, ' ');
}

function addIndents(query: string) {
  const queryArr = query.split('\n');
  const indent = 2;
  let indentCount = 0;
  let result = '';

  for (let i = 0; i < queryArr.length; i++) {
    if (queryArr[i].includes('}')) indentCount--;
    result += ' '.repeat(indentCount * indent) + queryArr[i].trim() + '\n';
    if (queryArr[i].includes('{')) indentCount++;
  }

  return result.trim();
}
