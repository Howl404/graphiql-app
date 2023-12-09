import { useEffect, useState } from 'react';
import { fetchQuery } from 'src/utils/fetchQuery';
import { INTROSPECTION_QUERY } from 'src/utils/introspectionQuery';

import { SchemaResponse, SchemaRoot, TypeName } from 'src/types';

export default function SchemaDoc() {
  const [schema, setSchema] = useState<SchemaRoot | null>(null);
  const [typeNameStack, setTypeNameStack] = useState<TypeName[]>([]);

  useEffect(() => {
    const getSchema = async () => {
      const { data }: SchemaResponse = await fetchQuery({
        api: 'https://spacex-production.up.railway.app/',
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

  const renderFields = () => {
    const currentTypeName = typeNameStack.at(-1)?.type;
    const currentType = schema?.types.find(
      (type) => type.name === currentTypeName
    );

    if (!currentType) return;

    return (
      <>
        <span onClick={() => setTypeNameStack([])}>Root </span>
        {typeNameStack.map(({ type, name }) => (
          <span key={type}>{name ?? type} </span>
        ))}
        <br />
        <button onClick={handleBackClick}>Back</button>
        <span>{currentTypeName}</span>
        {currentType.fields?.length && (
          <>
            <p>Fields:</p>
            <ul>
              {currentType.fields?.map(({ name, type }) => {
                const obj = {
                  typeName: type.name,
                  text: type.name,
                };
                if (!type.name && type.ofType?.name) {
                  obj.typeName = type.ofType.name;
                  obj.text = `[${type.ofType.name}]`;
                }

                return (
                  <li
                    key={name}
                    onClick={() =>
                      handleFieldClick({ type: obj.typeName ?? '', name })
                    }
                  >
                    {name}: {obj.text}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </>
    );
  };

  const renderRoot = (schema: SchemaRoot) => {
    const { queryType, mutationType, subscriptionType } = schema;

    return (
      <>
        Root types
        <ul>
          {[
            { type: queryType?.name, name: 'query' },
            { type: mutationType?.name, name: 'mutation' },
            { type: subscriptionType?.name, name: 'subscription' },
          ].map(
            (field) =>
              field.type && (
                <li
                  key={field.type}
                  onClick={() =>
                    handleFieldClick({
                      name: field.type ?? '',
                      type: field.type ?? '',
                    })
                  }
                >
                  {`${field.name}: ${field.type}`}
                </li>
              )
          )}
        </ul>
      </>
    );
  };

  return (
    <>
      <h1>docs</h1>
      {schema && (
        <div>{!typeNameStack.length ? renderRoot(schema) : renderFields()}</div>
      )}
    </>
  );
}
