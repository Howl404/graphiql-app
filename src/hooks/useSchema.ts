import { useEffect, useState } from 'react';
import { DEFAULT_API } from 'src/constants/api';
import { INTROSPECTION_QUERY } from 'src/constants/introspectionQuery';

import { SchemaResponse, SchemaRoot } from 'src/types';

import { fetchQuery } from 'utils/fetchQuery';

const cache: Record<string, SchemaRoot> = {};

export default function useSchema(api = DEFAULT_API) {
  const [schema, setSchema] = useState<SchemaRoot | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSchema = async () => {
      if (cache[api]) {
        setSchema(cache[api]);
        return;
      }

      setIsLoading(true);

      try {
        const { data }: SchemaResponse = await fetchQuery({
          api,
          query: JSON.stringify({ query: INTROSPECTION_QUERY }),
        });
        if (data?.__schema) {
          cache[api] = data.__schema;
          setSchema(data.__schema);
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getSchema();
  }, [api]);

  return { schema, error, isLoading };
}
