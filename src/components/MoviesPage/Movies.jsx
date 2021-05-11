import React from "react";
import style from "./Movies.module.css";
import SingleMovie from "../SingleMovie/SingleMovie";
import noImage from "../../img/no-image.jpeg";

export default function Movies({ poster, title, vote, release }) {
  const IMG_API = "https://image.tmdb.org/t/p/w1280";
  const imageUrl = IMG_API + poster;
  return (
    <div className={style.movie}>
      {!poster ? <img src={noImage} alt="" /> : <img src={imageUrl} alt="" />}

      <div className={style.movie_info}>
        <div className={style.movie_info_wrapper}>
          <div className={style.movie_info_top}>
            <h3>{title}</h3>
            <h5>{vote}/10</h5>
          </div>
          <div className={style.movie_info_bottom}>
            <p>Release date: {release}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
