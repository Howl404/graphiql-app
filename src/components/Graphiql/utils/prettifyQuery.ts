export default function prettifyQuery(query: string) {
  const unformattedQuery = clearFormat(query);
  const formattedQuery = formatQuery(unformattedQuery);
  return addIndents(formattedQuery);
}

function clearFormat(query: string) {
  return query.replace(/\n/, ' ').replace(/\s+/g, ' ');
}

function formatQuery(query: string) {
  let result = '';
  for (let i = 0; i < query.length; i++) {
    if (query[i] === '{') {
      result +=
        query[i - 1] && query[i - 1] !== ' '
          ? ` ${query[i]}\n`
          : `${query[i]}\n`;
      continue;
    }
    if (query[i] === '}') {
      result += `\n${query[i]}`;
      if (
        query[i + 1] &&
        (query[i + 1].match(/[A-Za-z]/) ||
          (query[i + 1] === ' ' &&
            query[i + 2] &&
            query[i + 2].match(/[A-Za-z]/)))
      )
        result += '\n';
      continue;
    }
    if (
      query[i] === ' ' &&
      query[i - 1] &&
      query[i - 1].match(/[A-Za-z]/) &&
      query[i + 1].match(/[A-Za-z]/) &&
      result.includes('{')
    ) {
      result += '\n';
      continue;
    }
    if (query[i] === '\n' && query[i + 1].match(/[A-Za-z]/)) continue;
    result += query[i];
  }
  return result;
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
