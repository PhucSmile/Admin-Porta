import {
  Editor,
  Transforms,
  Path,
  Range,
  Element as SlateElement,
} from 'slate';

export const createLinkNode = (url, text) => ({
  type: 'link',
  url,
  children: [{ text }],
});

export const insertLink = (editor, url) => {
  if (!url) {
    return;
  }

  const { selection } = editor;
  const link = createLinkNode(url, 'Link');

  if (!!selection) {
    const [parent, parentPath] = Editor.parent(editor, selection.focus?.path);

    if (parent.type === 'link') {
      removeLink(editor);
    }

    if (editor.isVoid(parent)) {
      Transforms.insertNodes(
        editor,
        { type: 'paragraph', children: [link] },
        {
          at: Path.next(parentPath),
          select: true,
        },
      );
    } else if (Range.isCollapsed(selection)) {
      Transforms.insertNodes(editor, link, { select: true });
    } else {
      Transforms.wrapNodes(editor, link, { split: true });
    }
  } else {
    Transforms.insertNodes(editor, { type: 'paragraph', children: [link] });
  }
};

export const removeLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
};
