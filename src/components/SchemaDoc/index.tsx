import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Divider, IconButton } from '@mui/material';
import { useState } from 'react';

import { SchemaField, SchemaStackItem } from 'src/types';

import useSchema from 'hooks/useSchema';

import SchemaBreadcrumbs from 'components/SchemaBreadcrumbs';
import SchemaItemsList from 'components/SchemaItemsList';
import Loader from 'components/UI/Loader';

import style from './style.module.scss';

export default function SchemaDoc() {
  const [typeNameStack, setTypeNameStack] = useState<SchemaStackItem[]>([]);

  const { schema, error, isLoading } = useSchema();

  const handleFieldClick = (stackItem: SchemaStackItem) => {
    setTypeNameStack([...typeNameStack, stackItem]);
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

  const renderRoot = () => {
    if (!schema) return;
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

  const renderContent = () => {
    switch (true) {
      case isLoading:
        return <Loader />;
      case error || !schema:
        return <p>Unexpected error occurred</p>;
      case typeNameStack.length > 0:
        return renderFields();
      default:
        return renderRoot();
    }
  };

  return (
    <div className={style.container}>
      <h1>Documentation</h1>
      <Divider />
      <SchemaBreadcrumbs
        items={typeNameStack}
        handleClick={handleBreadcrumbClick}
      />
      {renderContent()}
    </div>
  );
}
