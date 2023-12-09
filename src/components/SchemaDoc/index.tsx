import { useEffect, useState } from 'react';
import { fetchQuery } from 'src/utils/fetchQuery';
import { INTROSPECTION_QUERY } from 'src/utils/introspectionQuery';

import { SchemaField, SchemaResponse, SchemaRoot, TypeName } from 'src/types';

import SchemaBreadcrumbs from 'components/SchemaBreadcrumbs';
import SchemaItemsList from 'components/SchemaItemsList';

const api = 'https://spacex-production.up.railway.app/';

export default function SchemaDoc() {
  const [schema, setSchema] = useState<SchemaRoot | null>(null);
  const [typeNameStack, setTypeNameStack] = useState<TypeName[]>([]);

  useEffect(() => {
    const getSchema = async () => {
      const { data }: SchemaResponse = await fetchQuery({
        api,
        query: JSON.stringify({ query: INTROSPECTION_QUERY }),
      });
      if (data?.__schema) setSchema(data.__schema);
    };
    getSchema();
  }, []);

  const handleFieldClick = ({ type, name }: TypeName) => {
    setTypeNameStack([...typeNameStack, { type, name }]);
  };

  const handleBackClick = () => {
    setTypeNameStack(typeNameStack.slice(0, -1));
  };

  const handleBreadcrumbClick = (i: number) => {
    setTypeNameStack(typeNameStack.slice(0, i));
  };

  const renderFields = () => {
    const currentTypeName = typeNameStack.at(-1)?.type;
    const currentType = schema?.types.find(
      (type) => type.name === currentTypeName
    );

    if (!currentType) return;

    return (
      <>
        <button onClick={handleBackClick}>Back</button>
        <span>{currentTypeName}</span>
        {currentType.fields?.length && (
          <SchemaItemsList
            title="Fields"
            data={currentType.fields}
            handleFieldClick={handleFieldClick}
          />
        )}
      </>
    );
  };

  const renderRoot = (schema: SchemaRoot) => {
    const { queryType, mutationType, subscriptionType } = schema;

    const rootItems = [
      { type: { name: queryType?.name }, name: 'query' },
      { type: { name: mutationType?.name }, name: 'mutation' },
      { type: { name: subscriptionType?.name }, name: 'subscription' },
    ].filter((field) => field.type.name !== null) as SchemaField[];

    return (
      <SchemaItemsList
        title="Root types"
        data={rootItems}
        handleFieldClick={handleFieldClick}
      />
    );
  };

  return (
    <>
      <h1>Documentation</h1>
      {schema && (
        <div>
          <SchemaBreadcrumbs
            items={typeNameStack}
            handleClick={handleBreadcrumbClick}
          />
          {typeNameStack.length ? renderFields() : renderRoot(schema)}
        </div>
      )}
    </>
  );
}
