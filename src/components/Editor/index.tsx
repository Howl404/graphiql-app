import { langs } from '@uiw/codemirror-extensions-langs';
import { aura } from '@uiw/codemirror-theme-aura';
import { noctisLilac } from '@uiw/codemirror-theme-noctis-lilac';
import { tokyoNightDay } from '@uiw/codemirror-theme-tokyo-night-day';
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm';
import CodeMirror, { lineNumbers } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { useCallback, useContext } from 'react';

import EditorMode from 'enums/editorMode';

import cls from 'utils/classnames';

import { AppThemeContext } from 'context/ThemeContext';

import styles from './Editor.module.scss';

type EditorType = {
  editorMode: EditorMode;
  isReadonly?: boolean;
  value: string;
  setValue: (value: string) => void;
  size: 'small' | 'large';
};

export default function Editor({
  editorMode,
  isReadonly,
  value,
  setValue,
  size,
}: EditorType) {
  const onChange = useCallback(
    (val: string) => {
      setValue(val);
    },
    [setValue]
  );
  const { isDarkTheme } = useContext(AppThemeContext);

  let editorTheme;
  if (isReadonly) {
    editorTheme = isDarkTheme ? tokyoNightStorm : tokyoNightDay;
  } else {
    editorTheme = isDarkTheme ? aura : noctisLilac;
  }

  const editorLanguage =
    editorMode === EditorMode.JSON ? langs.json() : graphql();
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
      className={cls(
        styles.editor,
        editorMode === EditorMode.Query && styles.queryEditor
      )}
      width="100%"
      height={size === 'large' ? '55vh' : '20vh'}
      extensions={[lineNumbers(), editorLanguage]}
      onChange={onChange}
      basicSetup={basicSetup}
      data-testid={testId}
    />
  );
}
