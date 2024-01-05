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
import Dimming from 'components/UI/Dimming';
import Loader from 'components/UI/Loader';

import prettifyQuery from './utils/prettifyQuery';
import safeJsonParse from './utils/safeJsonParse';

import styles from './GraphiqlPage.module.scss';

const SchemaDoc = lazy(() => import('components/SchemaDoc'));

export default function GraphiqlPage() {
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

  const { isOpen: isVariablesOpen, setIsOpen: setIsVariablesOpen } = useOpen();
  const { isOpen: isHeadersOpen, setIsOpen: setIsHeadersOpen } = useOpen();
  const { isOpen: isDocsOpen, setIsOpen: setIsDocsOpen } = useOpen();

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
          translation('GraphQLPage.variablesError')
        ),
      }),
      headers: safeJsonParse(headers, translation('GraphQLPage.headersError')),
    })
      .then((json) => setViewerValue(JSON.stringify(json, null, '  ')))
      .catch(() => {
        displayNotification(translation('GraphQLPage.unknownError'), 'error');
      })
      .finally(() => {
        setIsJsonLoading(false);
      });
  };

  const toggleDocs = () => {
    setIsDocsOpen((prev) => !prev);
  };

  const setPrettifiedQuery = () => {
    setQuery(prettifyQuery(query, translation));
  };

  return (
    <div className={styles.wrapper}>
      {isJsonLoading && (
        <Dimming>
          <Loader />
        </Dimming>
      )}
      {isDocsOpen && (
        <Suspense
          fallback={
            <Dimming>
              <Loader />
            </Dimming>
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
              toggleDocs={toggleDocs}
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
            <p>
              {translation('GraphQLPage.headers')}
              <IconButton
                onClick={() => setIsHeadersOpen(!isHeadersOpen)}
                aria-expanded={isHeadersOpen}
                aria-label="show more"
                className={styles.collapseButton}
              >
                <ExpandMoreIcon
                  className={cls(isHeadersOpen && styles.rotate)}
                />
              </IconButton>
            </p>
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
            <p>
              {translation('GraphQLPage.variables')}
              <IconButton
                onClick={() => setIsVariablesOpen(!isVariablesOpen)}
                aria-expanded={isVariablesOpen}
                aria-label="show more"
                className={styles.collapseButton}
              >
                <ExpandMoreIcon
                  className={cls(isVariablesOpen && styles.rotate)}
                />
              </IconButton>
            </p>
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
