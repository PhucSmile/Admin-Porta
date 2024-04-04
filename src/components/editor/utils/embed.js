import { Transforms } from 'slate';
import { createParagraphNode } from './paragraph';

export const createImageNode = ({
  url,
  width,
  height,
  alt = 'EditorImage',
}) => ({
  type: 'image',
  url,
  width,
  height,
  alt,
  children: [{ text: '' }],
});

export const createVideoNode = ({ url, width, height }) => ({
  type: 'video',
  url,
  width,
  height,
  children: [{ text: '' }],
});

/**
 *
 * @param {*} editor
 * @param {*} embedData: {url, width, height, alt?}
 * @param {*} format: image | video
 */
export const insertEmbed = (editor, embedData, format) => {
  const { url, width, height } = embedData;

  // TODO: Validate url with format
  if (!url) {
    return;
  }

  console.log('Runn');

  embedData.width = width ? `${width}px` : '100%';
  embedData.height = height ? `${height}px` : 'auto';

  const embed =
    format === 'image'
      ? createImageNode(embedData)
      : format === 'video'
      ? createVideoNode(embedData)
      : null;

  if (embed) {
    Transforms.insertNodes(editor, embed, { select: true });
    Transforms.insertNodes(editor, createParagraphNode(''), {
      mode: 'highest',
    });
  }
};
