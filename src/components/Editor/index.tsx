import { langs } from '@uiw/codemirror-extensions-langs';
import { aura } from '@uiw/codemirror-theme-aura';
import { githubLight } from '@uiw/codemirror-theme-github';
import { materialLight } from '@uiw/codemirror-theme-material';
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm';
import CodeMirror, { lineNumbers } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { useCallback, useContext } from 'react';

import EditorMode from 'enums/editorMode';
import Themes from 'enums/themes';

import { AppThemeContext } from 'context/ThemeContext';

import styles from './Editor.module.scss';

type EditorType = {
  editorMode: EditorMode;
  value: string;
  setValue: (value: string) => void;
};

export default function Editor({ editorMode, value, setValue }: EditorType) {
  const onChange = useCallback(
    (val: string) => {
      setValue(val);
    },
    [setValue]
  );

  const { themeType } = useContext(AppThemeContext);
  const isReadonly = editorMode === EditorMode.JSON;
  let editorTheme;
  if (isReadonly) {
    editorTheme = themeType === Themes.Dark ? tokyoNightStorm : materialLight;
  } else {
    editorTheme = themeType === Themes.Dark ? aura : githubLight;
  }

  const editorLanguage = isReadonly ? langs.json() : graphql();
  const testId = isReadonly ? 'viewer' : 'editor';
  const basicSetup = {
    lineNumbers: false,
    closeBrackets: false,
    autocompletion: true,
    highlightSelectionMatches: true,
    foldGutter: true,
  };

  return (
    <CodeMirror
      readOnly={isReadonly}
      value={value}
      theme={editorTheme}
      className={styles.editor}
      width="100%"
      height="55vh"
      extensions={[lineNumbers(), editorLanguage]}
      onChange={onChange}
      basicSetup={basicSetup}
      data-testid={testId}
    />
  );
}
