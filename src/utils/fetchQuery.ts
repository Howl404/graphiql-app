import displayNotification from 'utils/displayNotification';

type FetchQueryParams = {
  api: string;
  headers?: Record<string, string>;
  query: string;
};

export default async function fetchQuery({
  api,
  headers,
  query,
}: FetchQueryParams) {
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
}
