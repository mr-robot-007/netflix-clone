import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests, { API_KEY } from "./Request";
import "./Banner.css";
import { setUrl } from "./features/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Banner() {
  const [movie, setMovie] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  const getUrl = async (id) => {
    const request = await axios.get(`/movie/${id}/videos?api_key=${API_KEY}`);
    console.log("h1 ", request.data.results[0]?.key);
    return `${request.data.results[0]?.key}`;
  };

  const playVideo = async (id) => {
    const url = await getUrl(id);
    console.log(url);
    // window.location.replace(url)
    dispatch(setUrl({ url: url }));
    navigate("/player");
  };


  // console.log(movie);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.title ||movie?.name || movie?.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button" onClick={()=> {playVideo(movie.id)}}>Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(
          movie?.overview,
            150
          )}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
