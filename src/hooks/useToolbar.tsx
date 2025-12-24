import { LOW_PRIORITY, RichTextAction } from '@/constants';
import { updateToolbar } from '@/utils/updateToolbar';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $patchStyleText } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  INSERT_PARAGRAPH_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useEffect, useState } from 'react';

const useToolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [hasTextColor, setHasTextColor] = useState(false);
  const [disableMap, setDisableMap] = useState<{ [id: string]: boolean }>({
    [RichTextAction.Undo]: true,
    [RichTextAction.Redo]: true,
  });
  const [headingType, setHeadingType] = useState('');
  const [selectionMap, setSelectionMap] = useState<{ [id: string]: boolean }>(
    {}
  );
  const [showLinkEditor, setShowLinkEditor] = useState(false);
  const [isLink, setIsLink] = useState(false);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar({
            setHasTextColor,
            setHeadingType,
            setIsLink,
            setSelectionMap,
          });
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () =>
          updateToolbar({
            setHasTextColor,
            setHeadingType,
            setIsLink,
            setSelectionMap,
          }),
        LOW_PRIORITY
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setDisableMap((prev) => ({ ...prev, undo: !payload }));
          return payload;
        },
        LOW_PRIORITY
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setDisableMap((prev) => ({ ...prev, redo: !payload }));
          return payload;
        },
        LOW_PRIORITY
      ),
      editor.registerCommand(
        INSERT_PARAGRAPH_COMMAND,
        () => {
          setTimeout(() => {
            editor.update(() => {
              const selection = $getSelection();
              if ($isRangeSelection(selection)) {
                // Clear all text formats
                const formats: Array<
                  | 'bold'
                  | 'italic'
                  | 'underline'
                  | 'strikethrough'
                  | 'code'
                  | 'subscript'
                  | 'superscript'
                  | 'highlight'
                > = [
                  'bold',
                  'italic',
                  'underline',
                  'strikethrough',
                  'code',
                  'subscript',
                  'superscript',
                  'highlight',
                ];

                formats.forEach((format) => {
                  if (selection.hasFormat(format)) {
                    selection.toggleFormat(format);
                  }
                });

                $patchStyleText(selection, {
                  color: null,
                  'background-color': null,
                  'font-size': null,
                  'font-family': null,
                });
              }
            });
          }, 0);
          return false;
        },
        LOW_PRIORITY
      )
    );
  }, [
    editor,
    setDisableMap,
    setHasTextColor,
    setHeadingType,
    setIsLink,
    setSelectionMap,
  ]);

  return {
    editor,
    setShowColorPicker,
    setShowLinkEditor,
    headingType,
    disableMap,
    selectionMap,
    isLink,
    hasTextColor,
    showLinkEditor,
    showColorPicker,
  };
};

export default useToolbar;
