import React from "react";
import "./style.css";
import { format } from "date-fns";

export interface IMovie {
  id: string;
  title: string;
  year?: Date;
  poster: string;
}

export interface IMovieCardProps {
  movie: IMovie;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function MovieCard({ onClick, movie }: IMovieCardProps) {
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    onClick?.(e);
  }

  return (
    <div className="movie-card" onClick={handleClick}>
      <div className="movie-card-header">{movie.title} </div>
      <img className="movie-poster" src={movie.poster} alt={movie.id} />
      <div className="movie-card-information">
        <div className="movie-card-title">
          {movie.title}&nbsp;
          {movie.year && format(movie.year, "(yyyy)")}
        </div>
      </div>
    </div>
  );
}
