import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./style.scss";
import {
  LucideChevronsLeft,
  LucideChevronsRight,
  LucideFilm,
  LucideLayoutGrid,
  LucideTableProperties,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import Button from "@components/Button";
import MovieList from "@components/MovieList";
import { IMovie } from "@components/MovieList/MovieCard/MovieCard";
import Select from "@components/Select";
import Search from "@components/Search";
import { Service } from "@service/service";
import { Layout, Type } from "@service/types";
import { setMovies } from "@store/slices/moviesSlice";

function App() {
  const dispatcher = useAppDispatch();
  const movies = useAppSelector((state) => state.movies);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentYear = new Date().getFullYear();

  //#region States
  const contentRef = useRef<HTMLDivElement>(null);
  let [initial, setInitial] = useState<boolean>(true);
  let [loading, setLoading] = useState<boolean>(false);
  let [searchText, setSearchText] = useState<string>(searchParams.get("search") || "Pokemon");
  let [type, setType] = useState<Type>((searchParams.get("type") as Type) || Type.Movie);
  let [year, setYear] = useState<string>(searchParams.get("year") || "");
  let [layout, setLayout] = useState<Layout>(Layout.Table);
  let [currentPage, setCurrentPage] = useState<number>(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page) : 1;
  });

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

        if (res.data.Response === "True") {
          dispatcher(
            setMovies(
              res.data.Search.map(
                (movie) =>
                  ({
                    id: movie.imdbID,
                    title: movie.Title,
                    poster: movie.Poster !== "N/A" ? movie.Poster : "",
                    year: movie.Year || undefined,
                  } as IMovie)
              )
            )
          );
        } else dispatcher(setMovies([]));
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
    setCurrentPage(1);
    setType(e.target.value as Type);
  }
  function handleChangeYear(e: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentPage(1);
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

  useEffect(() => {
    if (!initial) handleSearch();
  }, [currentPage, year, type]);

  useEffect(() => {
    handleSearch(searchText, true, 1);
    setInitial(false);
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>
          <LucideFilm
            size={80}
            fill="var(--text-primary-color)"
            strokeWidth={1.5}
            stroke="var(--text-secondary-color)"
          />
          Movie App
        </h1>
      </header>

      <div className="app-search">
        <Search
          value={searchText}
          loading={loading}
          onSearch={() => handleSearch(searchText, true, 1)}
          onChange={handleOnChange}
          onClear={handleClear}
        />
      </div>

      <div className="app-settings">
        <Select value={type} onChange={handleChangeType}>
          <Select.Option value={Type.Movie}>Movies</Select.Option>
          <Select.Option value={Type.Series}>Tv Series</Select.Option>
          <Select.Option value={Type.Episode}>Episodes</Select.Option>
        </Select>

        <Select value={year} onChange={handleChangeYear}>
          <Select.Option key={"all"} value={""}>
            All Years
          </Select.Option>
          {Array.from({ length: 137 }, (_e, i) => (_e = currentYear - i)).map((e) => (
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

      <div ref={contentRef} className="app-content">
        <MovieList data={movies.movies} loading={loading} />
      </div>

      <div className="app-controllers">
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
