import { javascript } from '@codemirror/lang-javascript';
import { aura } from '@uiw/codemirror-theme-aura';
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm';
import CodeMirror, { lineNumbers } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { useCallback } from 'react';

import EditorMode from 'enums/editorMode';

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

  const isReadonly = editorMode === EditorMode.JSON;
  const editorTheme = isReadonly ? tokyoNightStorm : aura;
  const editorLanguage = isReadonly ? javascript() : graphql();
  const basicSetup = {
    lineNumbers: false,
    closeBrackets: false,
    autocompletion: true,
    highlightSelectionMatches: true,
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
    />
  );
}
