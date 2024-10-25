import React, { memo } from "react";
import MovieCard from "./MovieCard";
import { IMovie } from "./MovieCard/MovieCard";
import { useNavigate } from "react-router-dom";
import "./style.css";

export type IMovieListProps = {
  data: IMovie[];
};

function MovieList({ data }: IMovieListProps) {
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
      {data.length ? (
        data.map((movie) => <MovieCard movie={movie} key={movie.id} onClick={handleClick(movie.id)} />)
      ) : (
        <div className="empty-list">Sorry, No data found.</div>
      )}
    </div>
  );
}

export default memo(MovieList);
