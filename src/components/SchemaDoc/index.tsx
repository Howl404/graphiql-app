import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Divider, IconButton } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

import { SchemaField, SchemaStackItem } from 'src/types';

import cls from 'utils/classnames';

import useSchema from 'hooks/useSchema';
import useTranslation from 'hooks/useTranslation';

import SchemaBreadcrumbs from 'components/SchemaBreadcrumbs';
import SchemaItemsList from 'components/SchemaItemsList';
import Loader from 'components/UI/Loader';

import style from './style.module.scss';

type SchemaDocType = {
  api: string;
};

export default function SchemaDoc({ api }: SchemaDocType) {
  const [typeNameStack, setTypeNameStack] = useState<SchemaStackItem[]>([]);

  const translation = useTranslation();

  const { schema, error, isLoading } = useSchema(api);

  const handleFieldClick = useCallback(
    (stackItem: SchemaStackItem) => {
      setTypeNameStack([...typeNameStack, stackItem]);
    },
    [typeNameStack]
  );

  const handleBackClick = useCallback(() => {
    setTypeNameStack(typeNameStack.slice(0, -1));
  }, [typeNameStack]);

  const handleBreadcrumbClick = (i: number) => {
    setTypeNameStack(typeNameStack.slice(0, i));
  };

  const renderFields = useMemo(() => {
    const {
      type: currentTypeName,
      name: currentName,
      args: currentArgs,
      text: currentText,
    } = typeNameStack.at(-1) ?? {};

    const getCurrentType = (typeName?: string | null) =>
      schema?.types.find((type) => type.name === typeName);

    const currentType = getCurrentType(currentTypeName);

    if (!currentType) return null;

    const items = [
      { data: currentArgs, title: translation('MainPage.arguments') },
      { data: currentType?.fields, title: translation('MainPage.fields') },
      {
        data: currentType?.inputFields,
        title: translation('MainPage.inputFields'),
      },
    ].filter(({ data }) => data?.length);

    return (
      <>
        <IconButton
          sx={{ mb: '2px' }}
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
              if (!typeLink) return null;

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
  }, [
    typeNameStack,
    translation,
    handleBackClick,
    schema?.types,
    handleFieldClick,
  ]);

  const renderRoot = useMemo(() => {
    if (!schema) return null;
    const { queryType, mutationType, subscriptionType } = schema;

    const rootItems = [
      {
        type: { name: queryType?.name },
        name: translation('MainPage.query'),
      },
      {
        type: { name: mutationType?.name },
        name: translation('MainPage.mutation'),
      },
      {
        type: { name: subscriptionType?.name },
        name: translation('MainPage.subscription'),
      },
    ].filter((field) => field.type.name) as SchemaField[];

    return (
      <SchemaItemsList
        title={translation('MainPage.rootTypes')}
        data={rootItems}
        handleFieldClick={handleFieldClick}
        disableSort
      />
    );
  }, [handleFieldClick, schema, translation]);

  const renderContent = () => {
    switch (true) {
      case isLoading:
        return <Loader />;
      case error || !schema:
        return <p>{translation('MainPage.unknownError')}</p>;
      case typeNameStack.length > 0:
        return renderFields;
      default:
        return renderRoot;
    }
  };

  return (
    <div className={cls(style.container, style.docsVisible)}>
      <h1 className={style.heading}>{translation('MainPage.documentation')}</h1>
      <Divider />
      <SchemaBreadcrumbs
        items={typeNameStack}
        handleClick={handleBreadcrumbClick}
        translation={translation}
      />
      {renderContent()}
    </div>
  );
}
