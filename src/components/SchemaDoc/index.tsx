import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Divider, IconButton } from '@mui/material';
import { useState } from 'react';

import { SchemaField, SchemaStackItem } from 'src/types';

import cls from 'utils/classnames';

import useSchema from 'hooks/useSchema';

import SchemaBreadcrumbs from 'components/SchemaBreadcrumbs';
import SchemaItemsList from 'components/SchemaItemsList';
import Loader from 'components/UI/Loader';

import style from './style.module.scss';

type SchemaDocType = {
  api: string;
  isDocsOpen: boolean;
};

export default function SchemaDoc({ api, isDocsOpen }: SchemaDocType) {
  const [typeNameStack, setTypeNameStack] = useState<SchemaStackItem[]>([]);

  const { schema, error, isLoading } = useSchema(api);

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
      text: currentText,
    } = typeNameStack.at(-1) ?? {};

    const getCurrentType = (typeName?: string | null) =>
      schema?.types.find((type) => type.name === typeName);

    const currentType = getCurrentType(currentTypeName);

    if (!currentType) return;

    const items = [
      { data: currentArgs, title: 'Arguments' },
      { data: currentType?.fields, title: 'Fields' },
      { data: currentType?.inputFields, title: 'Input Fields' },
    ].filter(({ data }) => data?.length);

    return (
      <>
        <IconButton
          size="small"
          onClick={handleBackClick}
          aria-label="back"
          color="primary"
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <span className={style.listTitle}>
          {currentName}:{' '}
          <span className={style.itemType}>{currentText ?? currentName}</span>
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
        {currentType.possibleTypes?.length && (
          <>
            <h3>Implementations</h3>
            {currentType.possibleTypes.map(({ name }) => {
              const typeLink = getCurrentType(name);
              if (!typeLink) return;

              return (
                <SchemaItemsList
                  key={typeLink.name}
                  title={typeLink.name ?? ''}
                  data={typeLink.fields ?? ([] as SchemaField[])}
                  handleFieldClick={handleFieldClick}
                />
              );
            })}
          </>
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
    ].filter((field) => field.type.name) as SchemaField[];

    return (
      <SchemaItemsList
        title="Root types"
        data={rootItems}
        handleFieldClick={handleFieldClick}
        disableSort
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
    <div className={cls(style.container, isDocsOpen && style.docsVisible)}>
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
