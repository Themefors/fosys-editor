import { HEADINGS, RICH_TEXT_OPTIONS, RichTextAction } from '@/constants';
import { onToolbarAction } from '@/utils/onToolbarAction';
import { $createHeadingNode, type HeadingTagType } from '@lexical/rich-text';
import { $wrapNodes } from '@lexical/selection';
import { $getSelection, $isRangeSelection } from 'lexical';
import useToolbar from '../hooks/useToolbar';
import ColorPicker from './ColorPicker';
import LinkEditor from './LinkEditor';

const Toolbar = () => {
  const {
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
  } = useToolbar();

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
    <>
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
                onClick={() =>
                  onToolbarAction({
                    editor,
                    id,
                    setShowColorPicker,
                    setShowLinkEditor,
                  })
                }
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
    </>
  );
};

export default Toolbar;
