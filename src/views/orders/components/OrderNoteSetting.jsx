import { useGeneralSettingNote } from 'api/generalSettingApi';
import escapeHtml from 'escape-html';
import { Text } from 'slate';
import _ from 'lodash';

const serialize = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }

    if (node.code) {
      string = `<code>${string}</code>`;
    }

    if (node.italic) {
      string = `<em>${string}</em>`;
    }

    if (node.underline) {
      string = `<u>${string}</u>`;
    }

    if (node.fontSize) {
      string = `<span style="font-size: ${node.fontSize}">${string}</span>`;
    }

    if (node.color) {
      string = `<span style="color: ${node.color}">${string}</span>`;
    }

    return string;
  }

  const children = node.children.map((n) => serialize(n)).join('');

  const style = node.align ? `"text-align: ${node.align}"` : '';

  switch (node.type) {
    case 'quote': {
      return `<blockquote style=${style}><p>${children}</p></blockquote>`;
    }

    case 'paragraph': {
      return `<p style=${style}>${children}</p>`;
    }

    case 'link': {
      return `<a href="${escapeHtml(
        node.url,
      )}" target="_blank">${children}</a>`;
    }

    case 'image': {
      return `<img src=${escapeHtml(node.url)} style=
      "max-width: ${node.width}; height: ${
        node.height
      }; display: block; margin-left: auto; margin-right: auto;" alt=${
        node.alt
      } />`;
    }

    case 'unorderedList': {
      return `<ul style=${style}>${children}</ul>`;
    }

    case 'list-item': {
      return `<li>${children}</li>`;
    }

    default: {
      return children;
    }
  }
};

export const OrderNoteSetting = ({ noteSetting }) => {
  const { data = [], isLoading } = useGeneralSettingNote({
    options: { enabled: _.isNil(noteSetting) },
  });

  if (isLoading) {
    return null;
  }

  const convertedData = !_.isNil(noteSetting)
    ? noteSetting
      ? JSON.parse(noteSetting)
      : []
    : data;

  const x = serialize({ children: convertedData });

  return (
    <div dangerouslySetInnerHTML={{ __html: x }} style={{ margin: '30px 0' }} />
  );
};
