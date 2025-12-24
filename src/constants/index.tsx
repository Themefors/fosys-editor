import {
  Bold,
  Code,
  Highlighter,
  Italic,
  Link,
  Palette,
  RotateCcw,
  RotateCw,
  Strikethrough,
  Subscript,
  Superscript,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify,
  TextAlignStart,
  Underline,
} from 'lucide-react';

export enum RichTextAction {
  Bold = 'bold',
  Italics = 'italics',
  Underline = 'underline',
  Strikethrough = 'strikethrough',
  Superscript = 'superscript',
  Subscript = 'subscript',
  Highlight = 'highlight',
  Code = 'code',
  Link = 'link',
  TextColor = 'textColor',
  LeftAlign = 'leftAlign',
  CenterAlign = 'centerAlign',
  RightAlign = 'rightAlign',
  JustifyAlign = 'justifyAlign',
  Divider = 'divider',
  Undo = 'undo',
  Redo = 'redo',
}

const iconStyles = {
  size: 20,
};

export const RICH_TEXT_OPTIONS = [
  {
    id: RichTextAction.Bold,
    icon: <Bold {...iconStyles} />,
    label: 'Bold',
  },
  {
    id: RichTextAction.Italics,
    icon: <Italic {...iconStyles} />,
    label: 'Italics',
  },
  {
    id: RichTextAction.Underline,
    icon: <Underline {...iconStyles} />,
    label: 'Underline',
  },
  { id: RichTextAction.Divider },
  {
    id: RichTextAction.Link,
    icon: <Link {...iconStyles} />,
    label: 'Insert Link',
  },
  {
    id: RichTextAction.TextColor,
    icon: <Palette {...iconStyles} />,
    label: 'Text Color',
  },
  {
    id: RichTextAction.Highlight,
    icon: <Highlighter {...iconStyles} />,
    label: 'Highlight',
  },
  {
    id: RichTextAction.Strikethrough,
    icon: <Strikethrough {...iconStyles} />,
    label: 'Strikethrough',
  },
  {
    id: RichTextAction.Superscript,
    icon: <Superscript {...iconStyles} />,
    label: 'Superscript',
  },
  {
    id: RichTextAction.Subscript,
    icon: <Subscript {...iconStyles} />,
    label: 'Subscript',
  },
  {
    id: RichTextAction.Code,
    icon: <Code {...iconStyles} />,
    label: 'Code',
  },
  { id: RichTextAction.Divider },
  {
    id: RichTextAction.LeftAlign,
    icon: <TextAlignStart {...iconStyles} />,
    label: 'Align Left',
  },
  {
    id: RichTextAction.CenterAlign,
    icon: <TextAlignCenter {...iconStyles} />,
    label: 'Align Center',
  },
  {
    id: RichTextAction.RightAlign,
    icon: <TextAlignEnd {...iconStyles} />,
    label: 'Align Right',
  },
  {
    id: RichTextAction.JustifyAlign,
    icon: <TextAlignJustify {...iconStyles} />,
    label: 'Align Justify',
  },
  { id: RichTextAction.Divider },
  {
    id: RichTextAction.Undo,
    icon: <RotateCcw {...iconStyles} />,
    label: 'Undo',
  },
  {
    id: RichTextAction.Redo,
    icon: <RotateCw {...iconStyles} />,
    label: 'Redo',
  },
];

export const LOW_PRIORITY = 1;

export const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
