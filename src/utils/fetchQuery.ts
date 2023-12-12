import { FetchQueryParams } from 'src/types';

export const fetchQuery = async ({ api, headers, query }: FetchQueryParams) => {
  try {
    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: query,
    });
    const data = await response.json();
    return data;
  } catch (e) {
    // TODO: show notification
    console.error(e);
  }
};
