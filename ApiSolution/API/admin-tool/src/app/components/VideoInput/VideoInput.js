import React,{useState} from "react";

export default function VideoInput(props) {
  const { width, height } = props;
  const [oldVideo, setOldVideo] = useState(new Blob(
    [""],
    {"type" : "video\/mp4"}))

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    var value = new Blob(
      [""],
      {"type" : "video\/mp4"});
    if(file!=undefined){
      setOldVideo(file);
      value = file;
    } else {
      value = oldVideo;
    }
    const url = URL.createObjectURL(value);
    props.file(value);
    setSource(url);
  };
  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
    <div className="VideoInput">
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4,"
      />
      <a style={{"width":"200px"}} className="style-input-video"  onClick={handleChoose}>
      <i className="fas fa-file-upload" />
        Tải video</a>
      {!source}
      {source && (
        <video
          className="VideoInput_video"
          width="100%"
          height={height}
          controls
          src={source}
        />
      )}
      {/* <div className="VideoInput_footer">{source || "Chưa có video"}</div> */}
    </div>
  );
}
