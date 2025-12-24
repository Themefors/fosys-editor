import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $patchStyleText } from '@lexical/selection';
import { $getSelection, $isRangeSelection } from 'lexical';
import { useEffect, useRef } from 'react';
import { ColorPicker as ReactColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/css';

interface ColorPickerProps {
  onClose: () => void;
}

const ColorPicker = ({ onClose }: ColorPickerProps) => {
  const [editor] = useLexicalComposerContext();
  const [color, setColor] = useColor('#000000');
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const node = selection.anchor.getNode();
        const style = node.getStyle();
        if (style) {
          const colorMatch = style.match(/color:\s*([^;]+)/);
          if (colorMatch) {
            setColor((prev) => ({ ...prev, hex: colorMatch[1].trim() }));
          }
        }
      }
    });
  }, [editor, setColor]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const applyColor = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, { color: color.hex });
      }
    });
    onClose();
  };

  const removeColor = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, { color: null });
      }
    });
    onClose();
  };

  return (
    <div className='absolute top-12 left-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4'>
      <div ref={pickerRef}>
        <ReactColorPicker color={color} onChange={setColor} />
        <div className='flex gap-2 mt-4'>
          <button
            onClick={applyColor}
            className='flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
          >
            Apply
          </button>
          <button
            onClick={removeColor}
            className='flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition'
          >
            Remove
          </button>
          <button
            onClick={onClose}
            className='flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
