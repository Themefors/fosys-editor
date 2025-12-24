import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode } from '@lexical/rich-text';
import type { EditorThemeClasses } from 'lexical';
import { useRef } from 'react';
import Toolbar from './Toolbar';

const theme: EditorThemeClasses = {
  text: {
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: 'underline line-through',
    code: 'bg-gray-200 py-px px-1 border border-gray-200',
  },
  link: 'text-blue-600 underline cursor-pointer hover:text-blue-800 relative group',
};

const initialConfig = {
  namespace: 'FosysEditor',
  theme,
  onError: () => {},
  nodes: [HeadingNode, CodeNode, CodeHighlightNode, LinkNode, AutoLinkNode],
};

const RichTextEditor = () => {
  const TextEditorRef = useRef(null);

  return (
    <div className='p-10'>
      <LexicalComposer initialConfig={initialConfig}>
        <Toolbar />
        {/* Textarea */}
        <div className='relative' ref={TextEditorRef}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable className='bg-gray-50 border border-gray-200 min-h-40 rounded-sm p-4 focus:outline-0' />
            }
            placeholder={
              <span className='absolute top-4 left-4 text-gray-300 pointer-events-none'>
                Some placeholder text...
              </span>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <LinkPlugin />
        <ClickableLinkPlugin />
      </LexicalComposer>
    </div>
  );
};

export default RichTextEditor;
