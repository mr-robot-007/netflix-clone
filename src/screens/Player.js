import React from "react";
import { useSelector } from "react-redux";
import { selectUrl } from "../features/userSlice";
import ReactPlayer from "react-player";
import "./Player.css";
import { useNavigate } from "react-router-dom";

function Player() {
  const url = useSelector(selectUrl);
  const navigate = useNavigate();

  console.log(`https://www.youtube.com/watch?v=${url.url}`);
  // // console.log("this url ",url.url);
  // const opts = {
  //     height: '390',
  //     width: '640',
  //     playerVars: {
  //       // https://developers.google.com/youtube/player_parameters
  //       autoplay: 1,
  //     },

  //   };
  const config = {
    
    height: "720px",
    width: "640px",
    youtube: {
      playerVars: { rel : 0, autoplay: 1 },
    },
  };
  return (
    <div className="player">
      <div className="back">
        <button className="player__button" onClick={()=> navigate("/")} >&#8592; Go Back</button>
      </div> 
      {/* <video src={"https://www.youtube.com/watch?v=n19hk6HdF7k"} autoPlay loop controls muted /> */}

      {/* <iframe title="Movie" 
        src="https://www.youtube.com/embed/n19hk6HdF7k?autoplay=0" 
      ></iframe> */}

      <ReactPlayer
        className="player__video"
        url={`https://www.youtube.com/watch?v=${url.url}`}
        autoplay={1}
        controls={true}
        config={config}
      />
    </div>
  );
}

export default Player;
