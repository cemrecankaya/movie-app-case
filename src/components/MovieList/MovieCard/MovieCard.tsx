import React from "react";
import "./style.scss";
import PosterNotFound from "@assets/poster-not-found-1.png";

export interface IMovie {
  id: string;
  title: string;
  year?: string;
  poster: string;
}

export interface IMovieCardProps {
  movie?: IMovie;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  skeleton?: boolean;
}

export default function MovieCard({ onClick, movie, skeleton }: IMovieCardProps) {
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    onClick?.(e);
  }

  return (
    <div className={`movie-card ${skeleton ? "skeleton" : ""}`} onClick={handleClick}>
      {skeleton ? (
        <div className="skeleton-wrapper">
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div className="skeleton-id" />
            <div className="skeleton-year" />
          </div>
          <div className="skeleton-title" />
        </div>
      ) : (
        <>
          <img
            className="movie-poster"
            loading="lazy"
            title={movie?.title || ""}
            src={movie?.poster || PosterNotFound}
            alt={movie?.id || ""}
          />
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
                ID: <b>{movie?.id.toUpperCase() || "-"}</b>
              </div>
              <div className="movie-year">
                Year: <b>{movie?.year || "-"}</b>
              </div>
            </div>
            <div className="movie-title">{movie?.title || "-"}</div>
          </div>
        </>
      )}
    </div>
  );
}
