import { RichTextAction } from '@/constants';
import { $isLinkNode } from '@lexical/link';
import { $isHeadingNode } from '@lexical/rich-text';
import { $getSelection, $isRangeSelection } from 'lexical';
import type { Dispatch, SetStateAction } from 'react';

type UpdateToolbarProps = {
  setSelectionMap: Dispatch<SetStateAction<{ [id: string]: boolean }>>;
  setIsLink: Dispatch<SetStateAction<boolean>>;
  setHasTextColor: Dispatch<SetStateAction<boolean>>;
  setHeadingType: Dispatch<SetStateAction<string>>;
};

export const updateToolbar = ({
  setSelectionMap,
  setIsLink,
  setHasTextColor,
  setHeadingType,
}: UpdateToolbarProps) => {
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
