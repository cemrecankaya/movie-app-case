import MovieList from "components/MovieList";
import { IMovie } from "components/MovieList/MovieCard/MovieCard";
import Search from "components/Search";
import { parse, set } from "date-fns";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Service from "service";
import { Layout, Type } from "service/types";
import "./style.css";
import { useAppDispatch, useAppSelector } from "store/hooks";
import Select from "components/Select/Select";
import { LucideChevronsLeft, LucideChevronsRight, LucideLayoutGrid, LucideTableProperties } from "lucide-react";
import Button from "components/Button";
import { setMovies } from "store/slices/moviesSlice";

function App() {
  const dispatcher = useAppDispatch();
  const movies = useAppSelector((state) => state.movies);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentYear = new Date().getFullYear();

  //#region States
  let [loading, setLoading] = useState<boolean>(false);
  let [searchText, setSearchText] = useState<string>("");
  let [type, setType] = useState<Type>(Type.Movie);
  let [year, setYear] = useState<string>("");
  let [layout, setLayout] = useState<Layout>(Layout.Table);
  let [currentPage, setCurrentPage] = useState<number>(1);
  //#endregion

  //#region Handlers
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }
  function handleSearch(_searchText: string = searchText, _loading: boolean = true, _page: number = currentPage) {
    setLoading(_loading);
    setCurrentPage(_page);

    Service.getMoviesBySearch({ s: _searchText, type, y: year, page: _page })
      .then((res) => {
        setParam("search", _searchText);
        setParam("type", type);
        setParam("year", year);
        setParam("page", _page.toString());

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
    handleSearch("", false, 1);
  }
  function handleChangeType(e: React.ChangeEvent<HTMLSelectElement>) {
    setType(e.target.value as Type);
  }
  function handleChangeYear(e: React.ChangeEvent<HTMLSelectElement>) {
    setYear(e.target.value);
  }
  function handleChangeLayout() {
    setLayout(layout === Layout.Grid ? Layout.Table : Layout.Grid);
  }
  function handleBackPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function handleNextPage() {
    if (currentPage < 100) {
      setCurrentPage(currentPage + 1);
    }
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

  // useEffect(() => {
  //   handleSearch();
  // }, [searchText, currentPage, year, type]);

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

      <div className="search">
        <Search
          value={searchText}
          loading={loading}
          onChange={handleOnChange}
          onSearch={() => handleSearch(searchText, true, 1)}
          onClear={handleClear}
        />
      </div>

      <div className="settings">
        <Select value={type} onChange={handleChangeType}>
          <Select.Option value={Type.Movie}>Movies</Select.Option>
          <Select.Option value={Type.Series}>Tv Series</Select.Option>
          <Select.Option value={Type.Episode}>Episodes</Select.Option>
        </Select>

        <Select value={year} onChange={handleChangeYear}>
          <Select.Option key={"all"} value={""}>
            All Years
          </Select.Option>
          {Array.from({ length: 137 }, (e, i) => (e = currentYear - i)).map((e) => (
            <Select.Option key={e} value={e}>
              {e}
            </Select.Option>
          ))}
        </Select>

        <Button tabIndex={0} title="Change Grid" onClick={handleChangeLayout}>
          {layout === Layout.Grid ? (
            <LucideTableProperties style={{ rotate: "180deg" }} size={26} />
          ) : (
            <LucideLayoutGrid size={26} />
          )}
        </Button>
      </div>

      <div className="content">
        <MovieList data={movies.movies} />
      </div>

      <div className="controllers">
        <Button tabIndex={0} title="Previous Page" disabled={currentPage <= 1 || loading} onClick={handleBackPage}>
          <LucideChevronsLeft size={26} />
        </Button>

        <Button tabIndex={0} title="Current Page" isStatic={true} onClick={handleBackPage}>
          {currentPage}
        </Button>

        <Button tabIndex={0} title="Next Page" disabled={currentPage >= 100 || loading} onClick={handleNextPage}>
          <LucideChevronsRight size={26} />
        </Button>
      </div>
    </div>
  );
}

export default App;
