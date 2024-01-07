export const DEFAULT_API = 'https://spacex-production.up.railway.app/';

export const DEFAULT_QUERY =
  'query ExampleQuery($limit: Int){rockets(limit: $limit)  {company country} ships(limit: $limit) {name}}';

export const DEFAULT_VARIABLES = `{
  "limit": 2
}`;

export const DEFAULT_HEADERS = `{
  "Content-Type": "application/json"
}`;
