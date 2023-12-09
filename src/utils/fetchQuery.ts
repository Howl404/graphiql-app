export const fetchQuery = async ({
  api,
  headers,
  query,
}: {
  api: string;
  headers?: Record<string, string>;
  query: string;
}) => {
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
    console.error(e);
  }
};
