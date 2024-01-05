import { describe, expect, it } from 'vitest';

import prettifyQuery, {
  addIndents,
  checkBrackets,
  clearFormat,
  formatQueryInner,
  formatTitle,
} from './prettifyQuery';

const mockTranslation = (str: string) => str;

describe('function checkBrackets', () => {
  it('should return false if there is an unclosed pair of braces', () => {
    const query = 'query UnclosedPair {unclosed {pair}';
    const checkResult = checkBrackets(query);
    expect(checkResult).toBe(false);
  });

  it(`should return true if there isn't an unclosed pair of braces`, () => {
    const query = 'query closedPair {closed {pair of braces}}';
    const checkResult = checkBrackets(query);
    expect(checkResult).toBe(true);
  });
});

describe('function clearFormat', () => {
  it('should return query without multiple new line and spaces', () => {
    const rightResult = 'query ExampleQuery { rockets { company country} }';
    const query = `query            ExampleQuery
    
    {
      
            rockets {          company  country}    }`;
    const result = clearFormat(query);
    expect(result).toBe(rightResult);
  });

  it(`should return query and fragment without multiple new line and spaces`, () => {
    const rightResult =
      'query ExampleQuery { rockets { company country} } fragment { sd{dwd} }';
    const query = `query            ExampleQuery
    
    {
      
            rockets {          company  country}    }    fragment
            {     sd{dwd}    }`;
    const result = clearFormat(query);
    expect(result).toBe(rightResult);
  });
});

describe('function formatTitle', () => {
  it('should return query title with right format of arguments', () => {
    const rightResult = 'query ExampleQuery($first: Int = 3)';
    const query = 'query ExampleQuery ($first:Int=3 )';
    const result = formatTitle(query);
    expect(result).toBe(rightResult);
  });
});

describe('function formatQueryInner', () => {
  it('should return query inner with right format', () => {
    const rightResult = `{
rockets {
company(first: $first)
country
}
}`;
    const query = `{ rockets { company (first : $first)country}}`;
    const result = formatQueryInner(query);
    expect(result).toBe(rightResult);
  });
});

describe('function addIndents', () => {
  it('should return query with right indent count', () => {
    const rightResult = `query ExampleQuery($myId: myId) {
  rockets {
    company
    country
    id(id: myId)
  }
}`;
    const query = `query ExampleQuery($myId: myId) {
rockets {
company
country
id(id: myId)
}
}`;
    const result = addIndents(query);
    expect(result).toBe(rightResult);
  });
});

describe('function prettifyQuery', () => {
  it('should return fully formatted query', () => {
    const rightResult = `query ExampleQuery($first: Int = 3) {
  rockets {
    company
  }
}

fragment comparisonFields on Character {
  name
  country
}`;
    const query = `query ExampleQuery ( $first : Int=3) {rockets {company}}fragment comparisonFields on Character {name country}`;
    const result = prettifyQuery(query, mockTranslation);
    expect(result).toBe(rightResult);
  });

  it('should return partially formatted query if there is unclosed braces', () => {
    const rightResult = `query ExampleQuery ( $first : Int=3) {rockets {company}

fragment comparisonFields on Character {
  name
  country
}`;
    const query = `query ExampleQuery ( $first : Int=3) {rockets {company}fragment comparisonFields on Character {name country}`;
    const result = prettifyQuery(query, mockTranslation);
    expect(result).toBe(rightResult);
  });
});
