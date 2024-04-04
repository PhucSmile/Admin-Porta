/* eslint-disable no-duplicate-case */
import { Link } from './Elements/Link';
import { Image } from './Elements/Image';
import { Video } from './Elements/Video';

export const Element = (props) => {
  const { attributes, children, element } = props;

  const style = { textAlign: element.align };

  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );

    case 'unorderedList':
      return <ul {...attributes}>{children}</ul>;

    case 'list-item':
      return <li {...attributes}>{children}</li>;

    case 'link': {
      return <Link {...props} />;
    }

    case 'image': {
      return <Image {...props} />;
    }

    case 'video': {
      return <Video {...props} />;
    }

    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};
