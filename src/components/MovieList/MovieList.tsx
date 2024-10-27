import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import { IMovie } from "./MovieCard/MovieCard";
import "./style.scss";

export type IMovieListProps = {
  data: IMovie[];
  loading?: boolean;
};

function MovieList({ data, loading }: IMovieListProps) {
  const navigate = useNavigate();

  function handleClick(id: string) {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (id) {
        navigate(`/movies?id=${id}`);
      }
    };
  }

  return (
    <div className="movie-list">
      {loading ? (
        Array.from({ length: 10 }, (e, i) => (e = i)).map((_e) => <MovieCard key={_e} skeleton />)
      ) : data.length ? (
        data.map((movie) => <MovieCard movie={movie} key={movie.id} onClick={handleClick(movie.id)} />)
      ) : (
        <div className="movie-list-empty">Sorry, No data found.</div>
      )}
    </div>
  );
}

export default memo(MovieList);
