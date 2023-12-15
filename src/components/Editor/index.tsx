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

function Editor({ editorMode, value, setValue }: EditorType) {
  const onChange = useCallback(
    (val: string) => {
      setValue(val);
    },
    [setValue]
  );

  const isReadonly = editorMode === EditorMode.JSON;

  return (
    <CodeMirror
      readOnly={isReadonly}
      value={value}
      theme={isReadonly ? tokyoNightStorm : aura}
      className={styles.editor}
      width="100%"
      height="55vh"
      extensions={[isReadonly ? javascript() : graphql(), lineNumbers()]}
      onChange={onChange}
      basicSetup={{
        lineNumbers: false,
        closeBrackets: false,
        autocompletion: true,
        highlightSelectionMatches: true,
      }}
    />
  );
}
export default Editor;
