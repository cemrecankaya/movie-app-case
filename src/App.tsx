import MovieList from "components/MovieList";
import { IMovie } from "components/MovieList/MovieCard/MovieCard";
import Search from "components/Search";
import { parse } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Service from "service";
import { Type } from "service/types";
import "./style.css";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setMovies } from "./store/moviesSlice";
import Select from "components/Select/Select";

function App() {
  const dispatcher = useAppDispatch();
  const movies = useAppSelector((state) => state.movies);
  const [searchParams, setSearchParams] = useSearchParams();

  //#region States
  const navigate = useNavigate();
  let [loading, setLoading] = useState<boolean>(false);
  let [searchText, setSearchText] = useState<string>("");
  let [type, setType] = useState<Type>(Type.Movie);
  let [year, setYear] = useState<string>(new Date().getFullYear().toString());
  // let [movies, setMovies2] = useState<IMovie[]>([]);
  // let [movies, setMovies] = useState<IMovie[]>([
  //   {
  //     id: "tt0265208",
  //     title: "The Girl Next Door",
  //     poster: "https://m.media-amazon.com/images/M/MV5BMTQ0ODIyMzE1N15BMl5BanBnXkFtZTcwODEwODczMw@@._V1_SX300.jpg",
  //     year: new Date("2003-12-31T22:00:00.000Z"),
  //   },
  //   {
  //     id: "tt13405778",
  //     title: "Insidious: The Red Door",
  //     poster:
  //       "https://m.media-amazon.com/images/M/MV5BMGExMzQ2NWYtMjk2My00YzczLTk0MGQtYzliNDU3ZjU1NDU1XkEyXkFqcGc@._V1_SX300.jpg",
  //     year: new Date("2022-12-31T21:00:00.000Z"),
  //   },
  //   {
  //     id: "tt1273678",
  //     title: "The Spy Next Door",
  //     poster: "https://m.media-amazon.com/images/M/MV5BMTI5MjEzMjM4N15BMl5BanBnXkFtZTcwODc0ODEwMw@@._V1_SX300.jpg",
  //     year: new Date("2009-12-31T22:00:00.000Z"),
  //   },
  //   {
  //     id: "tt3181822",
  //     title: "The Boy Next Door",
  //     poster: "https://m.media-amazon.com/images/M/MV5BMTgxNTEyMTYzOV5BMl5BanBnXkFtZTgwNzQ4OTg5MjE@._V1_SX300.jpg",
  //     year: new Date("2014-12-31T22:00:00.000Z"),
  //   },
  //   {
  //     id: "tt0119472",
  //     title: "Knockin' on Heaven's Door",
  //     poster:
  //       "https://m.media-amazon.com/images/M/MV5BMDZlMDM2YjEtOWMxMC00OGMwLTgxNGEtZmM5ZTEwMTg1MDc0XkEyXkFqcGc@._V1_SX300.jpg",
  //     year: new Date("1996-12-31T22:00:00.000Z"),
  //   },
  //   {
  //     id: "tt12987894",
  //     title: "American Murder: The Family Next Door",
  //     poster:
  //       "https://m.media-amazon.com/images/M/MV5BNDM3OTlhM2EtNjQ3Ni00MmM1LTgzZDgtMGYxNGM4NjdmNDgxXkEyXkFqcGc@._V1_SX300.jpg",
  //     year: new Date("2019-12-31T21:00:00.000Z"),
  //   },
  //   {
  //     id: "tt0830558",
  //     title: "The Girl Next Door",
  //     poster: "https://m.media-amazon.com/images/M/MV5BMTUwMDcyNjE1MF5BMl5BanBnXkFtZTcwOTA1Njg0MQ@@._V1_SX300.jpg",
  //     year: new Date("2006-12-31T22:00:00.000Z"),
  //   },
  //   {
  //     id: "tt0312109",
  //     title: "Codename: Kids Next Door",
  //     poster:
  //       "https://m.media-amazon.com/images/M/MV5BMTdkNmY4ZGMtZTk3YS00OWUxLTlmNTktZTAxNTg1MWM2YmM2XkEyXkFqcGc@._V1_SX300.jpg",
  //     year: undefined,
  //   },
  //   {
  //     id: "tt3702652",
  //     title: "The Other Side of the Door",
  //     poster: "https://m.media-amazon.com/images/M/MV5BMjE2MTk4NzkzOF5BMl5BanBnXkFtZTgwNjk3OTAyODE@._V1_SX300.jpg",
  //     year: new Date("2015-12-31T22:00:00.000Z"),
  //   },
  //   {
  //     id: "tt0348593",
  //     title: "The Door in the Floor",
  //     poster: "https://m.media-amazon.com/images/M/MV5BMTYyNTIxODA1M15BMl5BanBnXkFtZTYwMzY1NjY3._V1_SX300.jpg",
  //     year: new Date("2003-12-31T22:00:00.000Z"),
  //   },
  // ]);
  //#endregion

  //#region Handlers
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }
  function handleSearch(_searchText: string = searchText, _loading: boolean = true) {
    setLoading(_loading);

    Service.getMoviesBySearch({ s: _searchText, type, y: "" })
      .then((res) => {
        setParam("search", _searchText);

        if (res.data.hasOwnProperty("Search")) {
          dispatcher(
            setMovies(
              res.data.Search.map(
                (movie) =>
                  ({
                    id: movie.imdbID,
                    title: movie.Title,
                    poster: movie.Poster,
                    year: movie.Year ? parse(movie.Year, "yyyy", new Date()) : undefined,
                  } as IMovie)
              )
            )
          );
        } else setMovies([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function handleClear() {
    setSearchText("");
    handleSearch("");
  }
  //#endregion

  //#region Helpers
  function setParam(paramKey: string, paramValue: string) {
    if (paramValue === "") {
      searchParams.delete(paramKey);
    } else {
      searchParams.set(paramKey, paramValue);
    }
    setSearchParams(searchParams);
  }
  //#endregion

  useEffect(() => {
    let urlSearchText = searchParams.get("search");
    setSearchText(urlSearchText || "Pokemon");
    handleSearch(urlSearchText || "Pokemon");
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Movie App</h1>
      </header>

      <div className="search-area">
        <Search
          value={searchText}
          loading={loading}
          onChange={handleOnChange}
          onSearch={handleSearch}
          onClear={handleClear}
        />
        <div className="settings"></div>
      </div>

      <div className="content">
        <MovieList data={movies.movies} />
      </div>
    </div>
  );
}

export default App;
