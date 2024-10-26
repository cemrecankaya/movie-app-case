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
      <img className="movie-poster" loading="lazy" title={movie.title} src={movie.poster} alt={movie.id} />
      <div className="movie-information">
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className="movie-id">
            ID: <b>{movie.id.toUpperCase()}</b>
          </div>
          <div className="movie-year">
            Year: <b>{movie.year ? format(movie.year, "yyyy") : "-"}</b>
          </div>
        </div>
        <div className="movie-title">{movie.title}</div>
      </div>
    </div>
  );
}
