import React from "react";
import style from "./App.module.css";
import Header from "./components/Header/Header";
import Movies from "./components/MoviesPage/Movies";
import Genres from "./components/Genres/Genres";

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [moviesData, setMoviesData] = React.useState([]);
  React.useEffect(() => {
    async function movieList() {
      const api_call = await fetch(
        `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`
      );
      const data = await api_call.json();
      console.log(data);
      setMoviesData(data.results);
    }
    movieList();
  }, []);

  const SearchMovie = async (e) => {
    e.preventDefault();
    try {
      const movieTitle = e.target.elements.movieTitle.value;
      const api_call = await fetch(
        `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=${movieTitle}`
      );
      const data = await api_call.json();
      console.log(data);
      setMoviesData(data.results);
      console.log(moviesData);
    } catch (e) {}
  };

  return (
    <div className={style.App}>
      <Header SearchMovie={SearchMovie} />
      <div className={style.main_content}>
        <div className={style.main_content_movies}>
          {moviesData &&
            moviesData.map((movie) => (
              <Movies
                key={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                release={movie.release_date}
                vote={movie.vote_average}
              />
            ))}
        </div>
        <div className={style.main_content_genres}>
          <Genres />
        </div>
      </div>
    </div>
  );
}

export default App;
