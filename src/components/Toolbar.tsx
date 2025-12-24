import {
  HEADINGS,
  LOW_PRIORITY,
  RICH_TEXT_OPTIONS,
  RichTextAction,
} from '@/constants';
import { $isLinkNode } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createHeadingNode,
  $isHeadingNode,
  type HeadingTagType,
} from '@lexical/rich-text';
import { $patchStyleText, $wrapNodes } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INSERT_PARAGRAPH_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import { useEffect, useState } from 'react';
import ColorPicker from './ColorPicker';
import LinkEditor from './LinkEditor';

const Toolbar = () => {
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

  const updateToolbar = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setSelectionMap({
        [RichTextAction.Bold]: selection.hasFormat('bold'),
        [RichTextAction.Italics]: selection.hasFormat('italic'),
        [RichTextAction.Underline]: selection.hasFormat('underline'),
        [RichTextAction.Strikethrough]: selection.hasFormat('strikethrough'),
        [RichTextAction.Superscript]: selection.hasFormat('superscript'),
        [RichTextAction.Subscript]: selection.hasFormat('subscript'),
        [RichTextAction.Code]: selection.hasFormat('code'),
        [RichTextAction.Highlight]: selection.hasFormat('highlight'),
      });

      const node = selection.anchor.getNode();
      const parent = node.getParent();
      setIsLink($isLinkNode(parent));

      const style = node.getStyle();
      setHasTextColor(style ? style.includes('color:') : false);

      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();

      const currentBlockType = $isHeadingNode(element) ? element.getTag() : '';
      setHeadingType(currentBlockType);
    }
    return true;
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => updateToolbar(),
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
  }, [editor]);

  const onAction = (id: RichTextAction) => {
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
        setShowColorPicker(!showColorPicker);
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

      case RichTextAction.Link: {
        setShowLinkEditor(!showLinkEditor);
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

  const updateHeading: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const heading = e.target.value as HeadingTagType;
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createHeadingNode(heading));
      }
    });
  };

  return (
    <div className='relative'>
      <div className='flex items-center mb-1'>
        <select
          className='border border-gray-200 p-[8.5px] mr-1'
          value={headingType}
          onChange={updateHeading}
        >
          <option value=''>Select a heading</option>
          {HEADINGS.map((heading) => (
            <option key={heading} value={heading}>
              {heading}
            </option>
          ))}
        </select>

        {RICH_TEXT_OPTIONS.map(({ id, icon, label }, index) => {
          if (id === RichTextAction.Divider)
            return (
              <span
                key={index}
                className='h-10 w-px bg-gray-300 mx-1 inline-block'
              ></span>
            );

          return (
            <button
              key={id}
              onClick={() => onAction(id)}
              disabled={disableMap[id]}
              className={
                selectionMap[id] ||
                (id === RichTextAction.Link && isLink) ||
                (id === RichTextAction.TextColor && hasTextColor)
                  ? 'bg-blue-500 text-white p-2.5 cursor-pointer border disabled:opacity-50 transition duration-100'
                  : 'bg-gray-100 p-2.5 cursor-pointer border disabled:opacity-50 transition duration-100'
              }
              aria-label={label}
            >
              {icon}
            </button>
          );
        })}
      </div>

      {showLinkEditor && (
        <LinkEditor onClose={() => setShowLinkEditor(false)} />
      )}

      {showColorPicker && (
        <ColorPicker onClose={() => setShowColorPicker(false)} />
      )}
    </div>
  );
};

export default Toolbar;
