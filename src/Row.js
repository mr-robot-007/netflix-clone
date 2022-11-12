import axios from "./axios";
import React, { useEffect, useState } from "react";
import "./Row.css";
import { useNavigate } from "react-router-dom";

import { IoPlayCircleSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setUrl } from "./features/userSlice";
import { API_KEY } from "./Request";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

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
  // console.log(movies);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map(
          (movie) =>
            // console.log(movie.id)

            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <div className="row__page">
                <img
                  onClick={() => playVideo(movie.id)}
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  key={movie.id}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
                <IoPlayCircleSharp className="row__button" size={100} />
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Row;
