import { Editor, Transforms, Element as SlateElement } from 'slate';

export const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
  return !!link;
};

export const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
};

export const insertImage = (editor, url) => {
  const text = { text: '' };
  const image = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
};
