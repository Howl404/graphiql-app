import { FormEvent, useState } from 'react';
import { DEFAULT_API, DEFAULT_QUERY } from 'src/constants/api';

import EditorMode from 'enums/editorMode';

import displayNotification from 'utils/displayNotification';
import { fetchQuery } from 'utils/fetchQuery';

import ActionsPanel from 'components/ActionsPanel';
import Editor from 'components/Editor';
import EndpointForm from 'components/EndpointForm';
import SchemaDoc from 'components/SchemaDoc';
import Dimming from 'components/UI/Dimming';
import Loader from 'components/UI/Loader';

import prettifyQuery from './utils/prettifyQuery';

import styles from './GraphiqlPage.module.scss';

export default function GraphiqlPage() {
  const [inputValue, setInputValue] = useState(DEFAULT_API);
  const [currentEndpoint, setCurrentEndpoint] = useState(DEFAULT_API);
  const [query, setQuery] = useState(
    currentEndpoint === DEFAULT_API ? DEFAULT_QUERY : ''
  );
  const [viewerValue, setViewerValue] = useState('');
  const [isJsonLoading, setIsJsonLoading] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  const handleChangeEndpoint = (event: FormEvent) => {
    event.preventDefault();
    setCurrentEndpoint(inputValue);
  };

  const handleChangeInput = (value: string) => setInputValue(value);

  const handleChangeQuery = (value: string) => setQuery(value);

  const handleChangeViewer = (value: string) => setViewerValue(value);

  const sendQuery = () => {
    setIsJsonLoading(true);
    fetchQuery({
      api: currentEndpoint,
      query: JSON.stringify({ query: query }),
    })
      .then((json) => setViewerValue(JSON.stringify(json, null, '  ')))
      .catch(() => {
        displayNotification('Sorry, something went wrong...', 'error');
      })
      .finally(() => {
        setIsJsonLoading(false);
      });
  };

  const toggleDocs = () => {
    setIsDocsOpen((prev) => !prev);
  };

  const setPrettifiedQuery = () => {
    setQuery(prettifyQuery(query));
  };

  return (
    <div className={styles.wrapper}>
      <EndpointForm
        inputValue={inputValue}
        handleChangeEndpoint={handleChangeEndpoint}
        handleChangeInput={handleChangeInput}
      />
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
            toggleDocs={toggleDocs}
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
      <SchemaDoc api={currentEndpoint} isDocsOpen={isDocsOpen} />
      {isJsonLoading && (
        <Dimming>
          <Loader />
        </Dimming>
      )}
    </div>
  );
}