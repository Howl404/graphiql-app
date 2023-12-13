import { FetchQueryParams } from 'src/types';

import displayNotification from 'utils/displayNotification';

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
    return await response.json();
  } catch (e) {
    if (e instanceof Error) {
      displayNotification(e.message, 'error');
    }
  }
};
