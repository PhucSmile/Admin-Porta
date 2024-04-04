export const Image = ({ attributes, children, element }) => {
  return (
    <div {...attributes}>
      {children}
      <div contentEditable={false} style={{ position: 'relative' }}>
        <img
          src={element.url}
          style={{
            display: 'block',
            maxWidth: element.width,
            height: element.height,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          alt={element.alt}
        />
        {/* <Button
          active
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          className={css`
            display: ${selected && focused ? 'inline' : 'none'};
            position: absolute;
            top: 0.5em;
            left: 0.5em;
            background-color: white;
          `}
        >
          <Icon>delete</Icon>
        </Button> */}
      </div>
    </div>
  );
};
