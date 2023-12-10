import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Divider, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchQuery } from 'src/utils/fetchQuery';
import { INTROSPECTION_QUERY } from 'src/utils/introspectionQuery';

import {
  SchemaField,
  SchemaResponse,
  SchemaRoot,
  SchemaStackItem,
} from 'src/types';

import SchemaBreadcrumbs from 'components/SchemaBreadcrumbs';
import SchemaItemsList from 'components/SchemaItemsList';

import style from './style.module.scss';

const api = 'https://spacex-production.up.railway.app/';

export default function SchemaDoc() {
  const [schema, setSchema] = useState<SchemaRoot | null>(null);
  const [typeNameStack, setTypeNameStack] = useState<SchemaStackItem[]>([]);

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

  const handleFieldClick = ({ type, name, args }: SchemaStackItem) => {
    setTypeNameStack([...typeNameStack, { type, name, args }]);
  };

  const handleBackClick = () => {
    setTypeNameStack(typeNameStack.slice(0, -1));
  };

  const handleBreadcrumbClick = (i: number) => {
    setTypeNameStack(typeNameStack.slice(0, i));
  };

  const renderFields = () => {
    const {
      type: currentTypeName,
      name: currentName,
      args: currentArgs,
    } = typeNameStack.at(-1) ?? {};
    const currentType = schema?.types.find(
      (type) => type.name === currentTypeName
    );

    if (!currentType) return;

    const items = [
      { data: currentArgs, title: 'Arguments' },
      { data: currentType?.fields, title: 'Fields' },
    ].filter(({ data }) => data?.length);

    return (
      <>
        <IconButton size="small" onClick={handleBackClick} aria-label="back">
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <span className={style.listTitle}>
          {currentName}: {currentTypeName}
        </span>
        {currentType?.description && <p>{currentType.description}</p>}
        {items.map(
          ({ data, title }) =>
            data && (
              <SchemaItemsList
                key={title}
                title={title}
                data={data}
                handleFieldClick={handleFieldClick}
              />
            )
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
    <div className={style.container}>
      <h1>Documentation</h1>
      <Divider />
      {schema && (
        <>
          <SchemaBreadcrumbs
            items={typeNameStack}
            handleClick={handleBreadcrumbClick}
          />
          {typeNameStack.length ? renderFields() : renderRoot(schema)}
        </>
      )}
    </div>
  );
}
