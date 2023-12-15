import { Button } from '@mui/material';
import { FormEvent, useState } from 'react';
import { DEFAULT_API } from 'src/constants/api';

import EditorMode from 'enums/editorMode';

import { fetchQuery } from 'utils/fetchQuery';

import ActionsPanel from 'components/ActionsPanel';
import Editor from 'components/Editor';
import SchemaDoc from 'components/SchemaDoc';
import Dimming from 'components/UI/Dimming';
import Loader from 'components/UI/Loader';

import styles from './Graphiql.module.scss';
import prettifyQuery from './utils/prettifyQuery';

export default function Graphiql() {
  const [endpoint, setEndpoint] = useState(DEFAULT_API);
  const [query, setQuery] = useState('query ExampleQuery {rockets {company}}');
  const [viewerValue, setViewerValue] = useState('');
  const [isJsonLoading, setIsJsonLoading] = useState(false);

  const handleChangeEndpoint = (event: FormEvent) => {
    event.preventDefault();

    // TODO update documentation for current endpoint or display error notification
    // TODO add handler onBlur for change endpoint
  };
  const handleChangeQuery = (value: string) => setQuery(value);
  const handleChangeViewer = (value: string) => setViewerValue(value);
  const sendQuery = async () => {
    setIsJsonLoading(true);
    const json = await fetchQuery({
      api: endpoint,
      query: JSON.stringify({ query: query }),
    });
    setViewerValue(JSON.stringify(json, null, '  '));
    setIsJsonLoading(false);
  };
  const setPrettifiedQuery = () => {
    setQuery(prettifyQuery(query));
  };

  return (
    <div className={styles.wrapper}>
      {isJsonLoading && (
        <Dimming>
          <Loader />
        </Dimming>
      )}
      <form className={styles.handlerEndpoint} onSubmit={handleChangeEndpoint}>
        <input
          className={styles.inputEndpoint}
          value={endpoint}
          onChange={(event) => setEndpoint(event.target.value)}
          type="text"
          placeholder="Enter endpoint"
        />
        <Button className={styles.btnEndpoint} size="small" variant="contained">
          Change endpoint
        </Button>
      </form>
      <div className={styles.sandboxWrapper}>
        <div className={styles.editorWrapper}>
          <Editor
            editorMode={EditorMode.Query}
            value={query}
            setValue={handleChangeQuery}
          />
          <ActionsPanel
            query={query}
            sendQuery={sendQuery}
            setPrettifiedQuery={setPrettifiedQuery}
          />
        </div>
        <div className={styles.jsonViewer}>
          <Editor
            editorMode={EditorMode.JSON}
            value={viewerValue}
            setValue={handleChangeViewer}
          />
        </div>
      </div>
      <SchemaDoc />
    </div>
  );
}
