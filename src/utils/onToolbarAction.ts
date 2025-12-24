import { RichTextAction } from '@/constants';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import {
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  type LexicalEditor,
} from 'lexical';
import type { Dispatch, SetStateAction } from 'react';

type OnToolbarActionProps = {
  id: RichTextAction;
  editor: LexicalEditor;
  setShowColorPicker: Dispatch<SetStateAction<boolean>>;
  setShowLinkEditor: Dispatch<SetStateAction<boolean>>;
};

export const onToolbarAction = ({
  id,
  editor,
  setShowColorPicker,
  setShowLinkEditor,
}: OnToolbarActionProps) => {
  switch (id) {
    case RichTextAction.Bold: {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
      break;
    }

    case RichTextAction.Italics: {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
      break;
    }

    case RichTextAction.Underline: {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
      break;
    }

    case RichTextAction.TextColor: {
      setShowColorPicker((prevProps) => !prevProps);
      break;
    }

    case RichTextAction.Strikethrough: {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
      break;
    }

    case RichTextAction.Superscript: {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
      break;
    }

    case RichTextAction.Subscript: {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
      break;
    }

    case RichTextAction.Highlight: {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight');
      break;
    }

    case RichTextAction.Code: {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
      break;
    }

    case RichTextAction.UnorderedList: {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      break;
    }
    case RichTextAction.OrderedList: {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      break;
    }

    case RichTextAction.Link: {
      setShowLinkEditor((prevProps) => !prevProps);
      break;
    }

    case RichTextAction.LeftAlign: {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
      break;
    }

    case RichTextAction.RightAlign: {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
      break;
    }

    case RichTextAction.CenterAlign: {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
      break;
    }

    case RichTextAction.JustifyAlign: {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
      break;
    }

    case RichTextAction.Undo: {
      editor.dispatchCommand(UNDO_COMMAND, undefined);
      break;
    }

    case RichTextAction.Redo: {
      editor.dispatchCommand(REDO_COMMAND, undefined);
      break;
    }

    default:
      break;
  }
};
