export const Video = ({ attributes, children, element }) => {
  return (
    <div
      {...attributes}
      className="element-video"
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <div
        contentEditable={false}
        style={{ width: element.width, height: element.height }}
      >
        <div className="video-wrapper">
          <iframe
            src={`${element.url}`}
            frameBorder="0"
            title={element.url}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
      {children}
    </div>
  );
};
