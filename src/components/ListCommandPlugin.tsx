import { LOW_PRIORITY } from '@/constants';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  insertList,
  removeList,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

export default function ListCommandPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregisterUnordered = editor.registerCommand(
      INSERT_UNORDERED_LIST_COMMAND,
      () => {
        insertList(editor, 'bullet');
        return true;
      },
      LOW_PRIORITY
    );

    const unregisterOrdered = editor.registerCommand(
      INSERT_ORDERED_LIST_COMMAND,
      () => {
        insertList(editor, 'number');
        return true;
      },
      LOW_PRIORITY
    );

    const unregisterRemove = editor.registerCommand(
      REMOVE_LIST_COMMAND,
      () => {
        removeList(editor);
        return true;
      },
      LOW_PRIORITY
    );

    return () => {
      unregisterUnordered();
      unregisterOrdered();
      unregisterRemove();
    };
  }, [editor]);

  return null;
}
