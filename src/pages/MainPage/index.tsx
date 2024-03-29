import {
  DEFAULT_API,
  DEFAULT_HEADERS,
  DEFAULT_QUERY,
  DEFAULT_VARIABLES,
} from 'constants/api';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Collapse, IconButton } from '@mui/material';
import { FormEvent, lazy, Suspense, useState } from 'react';

import EditorMode from 'enums/editorMode';

import cls from 'utils/classnames';
import displayNotification from 'utils/displayNotification';
import fetchQuery from 'utils/fetchQuery';

import useOpen from 'hooks/useOpen';
import useTranslation from 'hooks/useTranslation';

import ActionsPanel from 'components/ActionsPanel';
import Editor from 'components/Editor';
import EndpointForm from 'components/EndpointForm';
import Loader from 'components/UI/Loader';
import Overlay from 'components/UI/Overlay';

import prettifyQuery from './utils/prettifyQuery';
import safeJsonParse from './utils/safeJsonParse';

import styles from './MainPage.module.scss';

const SchemaDoc = lazy(() => import('components/SchemaDoc'));

export default function MainPage() {
  const translation = useTranslation();
  const [inputValue, setInputValue] = useState(DEFAULT_API);
  const [currentEndpoint, setCurrentEndpoint] = useState(DEFAULT_API);

  const [query, setQuery] = useState(
    currentEndpoint === DEFAULT_API ? DEFAULT_QUERY : ''
  );
  const [headers, setHeaders] = useState(
    currentEndpoint === DEFAULT_API ? DEFAULT_HEADERS : ''
  );
  const [variables, setVariables] = useState(
    currentEndpoint === DEFAULT_API ? DEFAULT_VARIABLES : ''
  );

  const {
    isOpen: isVariablesOpen,
    handleOpen: handleVariablesOpen,
    handleClose: handleVariablesClose,
  } = useOpen();
  const {
    isOpen: isHeadersOpen,
    handleOpen: handleHeadersOpen,
    handleClose: handleHeadersClose,
  } = useOpen();
  const {
    isOpen: isDocsOpen,
    handleOpen: handleDocsOpen,
    handleClose: handleDocsClose,
  } = useOpen();

  const [viewerValue, setViewerValue] = useState('');
  const [isJsonLoading, setIsJsonLoading] = useState(false);

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
      query: JSON.stringify({
        query,
        variables: safeJsonParse(
          variables,
          translation('MainPage.variablesError')
        ),
      }),
      headers: safeJsonParse(headers, translation('MainPage.headersError')),
    })
      .then((json) => setViewerValue(JSON.stringify(json, null, '  ')))
      .catch(() => {
        displayNotification(translation('MainPage.unknownError'), 'error');
      })
      .finally(() => {
        setIsJsonLoading(false);
      });
  };

  const setPrettifiedQuery = () => {
    setQuery(prettifyQuery(query, translation));
  };

  return (
    <div className={styles.wrapper}>
      {isJsonLoading && (
        <Overlay>
          <Loader />
        </Overlay>
      )}
      {isDocsOpen && (
        <Suspense
          fallback={
            <Overlay>
              <Loader />
            </Overlay>
          }
        >
          <SchemaDoc api={currentEndpoint} />
        </Suspense>
      )}
      <div className={styles.queryWrapper}>
        <EndpointForm
          inputValue={inputValue}
          handleChangeEndpoint={handleChangeEndpoint}
          handleChangeInput={handleChangeInput}
          translation={translation}
        />
        <div className={styles.sandboxWrapper}>
          <div className={styles.editorWrapper}>
            <Editor
              editorMode={EditorMode.Query}
              value={query}
              setValue={handleChangeQuery}
              size="large"
            />
            <ActionsPanel
              query={query}
              sendQuery={sendQuery}
              toggleDocs={() =>
                isDocsOpen ? handleDocsClose() : handleDocsOpen()
              }
              setPrettifiedQuery={setPrettifiedQuery}
            />
          </div>
          <div className={styles.editorWrapper}>
            <Editor
              editorMode={EditorMode.JSON}
              isReadonly
              value={viewerValue}
              setValue={handleChangeViewer}
              size="large"
            />
          </div>
        </div>
        <div className={styles.additionalFeatures}>
          <div className={styles.feature}>
            <span>{translation('MainPage.headers')}</span>
            <IconButton
              onClick={() =>
                isHeadersOpen ? handleHeadersClose() : handleHeadersOpen()
              }
              aria-expanded={isHeadersOpen}
              aria-label="show more"
              className={styles.collapseButton}
            >
              <ExpandMoreIcon className={cls(isHeadersOpen && styles.rotate)} />
            </IconButton>

            <Collapse in={isHeadersOpen}>
              <Editor
                editorMode={EditorMode.JSON}
                value={headers}
                setValue={(value) => setHeaders(value)}
                size="small"
              />
            </Collapse>
          </div>
          <div className={styles.feature}>
            <span>{translation('MainPage.variables')}</span>
            <IconButton
              onClick={() =>
                isVariablesOpen ? handleVariablesClose() : handleVariablesOpen()
              }
              aria-expanded={isVariablesOpen}
              aria-label="show more"
              className={styles.collapseButton}
            >
              <ExpandMoreIcon
                className={cls(isVariablesOpen && styles.rotate)}
              />
            </IconButton>

            <Collapse in={isVariablesOpen}>
              <Editor
                editorMode={EditorMode.JSON}
                value={variables}
                setValue={(value) => setVariables(value)}
                size="small"
              />
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
}
