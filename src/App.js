import React from "react";
import style from "./App.module.css";
import Header from "./components/Header/Header";
import Movies from "./components/MoviesPage/Movies";
import Genres from "./components/Genres/Genres";

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [page, setPage] = React.useState(1);
  const [moviesData, setMoviesData] = React.useState([]);
  const [sear, setSear] = React.useState(false);
  const [movieTitle, setMovieTitle] = React.useState();
  const [totalPages, setTotalPages] = React.useState();

  const handleLoad = (e) => {
    let element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      setPage((prev) => prev + 1);
    }
  };

  React.useEffect(() => {
    async function movieList() {
      if (sear) {
        const api_call = await fetch(
          `https://api.themoviedb.org/3/search/movie?&api_key=${process.env.REACT_APP_API_KEY}&query=${movieTitle}&page=${page}`
        );
        const data = await api_call.json();
        console.log(data);
        setMoviesData((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } else {
        const api_call = await fetch(
          `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        );
        const data = await api_call.json();
        console.log(data);
        setMoviesData((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      }
    }
    movieList();
  }, [page, sear]);

  const changeMovie = (e) => {
    setMovieTitle(e.target.value);
  };

  const SearchMovie = async (e) => {
    e.preventDefault();
    try {
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
      <Header
        SearchMovie={SearchMovie}
        setSear={setSear}
        changeMovie={changeMovie}
      />
      <div className={style.main_content}>
        <div className={style.main_content_movies}>
          {moviesData &&
            moviesData.map((movie, index) => (
              <Movies
                key={index}
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
      {page < totalPages ? (
        <div className={style.load_more_wrapper}>
          <button onClick={handleLoad}>Load more</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
