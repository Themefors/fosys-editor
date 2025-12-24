import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { Check, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface LinkEditorProps {
  onClose: () => void;
}

const LinkEditor = ({ onClose }: LinkEditorProps) => {
  const [editor] = useLexicalComposerContext();
  const [linkUrl, setLinkUrl] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const node = selection.anchor.getNode();
        const parent = node.getParent();
        if ($isLinkNode(parent)) {
          setLinkUrl(parent.getURL());
          setIsEditMode(true);
        }
      }
    });
    inputRef.current?.focus();
  }, [editor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkUrl.trim()) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
    }
    onClose();
  };

  const handleRemove = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    onClose();
  };

  return (
    <div className='absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-50 min-w-75'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <input
          ref={inputRef}
          type='url'
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          placeholder='https://example.com'
          className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <div className='flex gap-2'>
          <button
            type='submit'
            className='flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700'
          >
            <Check size={16} />
            {isEditMode ? 'Update' : 'Insert'}
          </button>
          {isEditMode && (
            <button
              type='button'
              onClick={handleRemove}
              className='px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700'
            >
              Remove
            </button>
          )}
          <button
            type='button'
            onClick={onClose}
            className='ml-auto px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100'
          >
            <X size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default LinkEditor;
