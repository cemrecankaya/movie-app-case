import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Service } from "@service/service";
import "./style.scss";
import { clearMovieDetail, setMovieDetail } from "@store/slices/movieDetailSlice";
import { format } from "date-fns";
import Button from "@components/Button";
import { LucideChevronLeft } from "lucide-react";
import PosterNotFound from "@assets/poster-not-found-1.png";

function Movies() {
  const dispatcher = useAppDispatch();
  const movie = useAppSelector((state) => state.movieDetail.movie);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  function getDetail(id: string) {
    setLoading(true);

    Service.getMovieByIdorByTitle({ i: id })
      .then((res) => {
        dispatcher(setMovieDetail(res.data));
      })
      .catch((_err) => {
        navigate(-1);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleBack() {
    navigate(-1);
  }
  useEffect(() => {
    let id = searchParams.get("id");
    if (id) getDetail(id);
    else navigate(-1);
    return () => {
      dispatcher(clearMovieDetail());
    };
  }, []);

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-controllers">
        <Button onClick={handleBack}>
          <span
            style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center", marginRight: "10px" }}
          >
            <LucideChevronLeft size={25} />
            Back
          </span>
        </Button>
      </div>

      <div className="movie-detail-header">
        {loading ? (
          <>
            <div className="skeleton" style={{ width: "80%", height: "100px" }} />
            <div className="skeleton" style={{ width: "20%", height: "100px" }} />
          </>
        ) : (
          <>
            <h1>{movie?.Title}</h1>
            <div className="movie-ratings">
              <label htmlFor="ratings">IMDB Ratings</label>
              <span id="ratings">
                {movie?.imdbRating}&nbsp; <span>/10</span>
              </span>
            </div>
          </>
        )}
      </div>

      <div className="movie-detail-content">
        {loading ? (
          <div
            className="skeleton"
            style={{ maxWidth: "300px", width: "100%", aspectRatio: "2/3", height: "fit-content" }}
          />
        ) : movie?.Poster !== "N/A" && movie?.Poster ? (
          <img className="movie-detail-poster" src={movie?.Poster} alt={movie?.Poster} />
        ) : (
          <img className="movie-detail-poster" src={PosterNotFound} alt={movie?.Poster} />
        )}
        <div className="movie-detail-information">
          {loading ? (
            <div className="skeleton" style={{ width: "100%", height: "60px" }} />
          ) : (
            <div className="section">
              <span className="value">{movie?.Plot || "-"}</span>
            </div>
          )}
          <div className="divider" />

          {loading ? (
            <div className="skeleton" style={{ width: "100%", height: "30px" }} />
          ) : (
            <div className="section">
              <label htmlFor="director">Director:</label>
              <span id="director" className="value">
                {movie?.Director || "-"}
              </span>
            </div>
          )}

          {loading ? (
            <div className="skeleton" style={{ width: "100%", height: "30px" }} />
          ) : (
            <div className="section">
              <label htmlFor="writer">Writer:</label>
              <span id="writer" className="value">
                {movie?.Writer || "-"}
              </span>
            </div>
          )}

          {loading ? (
            <div className="skeleton" style={{ width: "100%", height: "30px" }} />
          ) : (
            <div className="section">
              <label htmlFor="actors">Stars:</label>
              <span id="actors" className="value">
                {movie?.Actors || "-"}
              </span>
            </div>
          )}

          <div className="row">
            {loading ? (
              <div className="skeleton" style={{ width: "100%", height: "30px" }} />
            ) : (
              <div className="section">
                <label htmlFor="awards">Type:</label>
                <span id="awards" style={{ textTransform: "capitalize" }} className="value">
                  {movie?.Type || "-"}
                </span>
              </div>
            )}

            {loading ? (
              <div className="skeleton" style={{ width: "100%", height: "30px" }} />
            ) : (
              <div className="section">
                <label htmlFor="genre">Genre:</label>
                <span id="genre" className="value">
                  {movie?.Genre || "-"}
                </span>
              </div>
            )}
          </div>

          <div className="row">
            {loading ? (
              <div className="skeleton" style={{ width: "100%", height: "30px" }} />
            ) : (
              <div className="section">
                <label htmlFor="release">Release date:</label>
                <span id="release" className="value">
                  {movie?.Released ? format(new Date(movie.Released), "dd MMMM yyyy") : "-"}
                </span>
              </div>
            )}

            {loading ? (
              <div className="skeleton" style={{ width: "100%", height: "30px" }} />
            ) : (
              <div className="section">
                <label htmlFor="runtime">Runtime:</label>
                <span id="runtime" className="value">
                  {movie?.Runtime || "-"}
                </span>
              </div>
            )}
          </div>

          <div className="row">
            {loading ? (
              <div className="skeleton" style={{ width: "100%", height: "30px" }} />
            ) : (
              <div className="section">
                <label htmlFor="country">Country:</label>
                <span id="country" className="value">
                  {movie?.Country || "-"}
                </span>
              </div>
            )}

            {loading ? (
              <div className="skeleton" style={{ width: "100%", height: "30px" }} />
            ) : (
              <div className="section">
                <label htmlFor="language">Language:</label>
                <span id="language" className="value">
                  {movie?.Language || "-"}
                </span>
              </div>
            )}
          </div>

          {loading ? (
            <div className="skeleton" style={{ width: "100%", height: "30px" }} />
          ) : (
            <div className="section">
              <label htmlFor="boxoffice">BoxOffice:</label>
              <span id="boxoffice" className="value">
                {movie?.BoxOffice || "-"}
              </span>
            </div>
          )}
          {loading ? (
            <div className="skeleton" style={{ width: "100%", height: "30px" }} />
          ) : (
            <div className="section">
              <label htmlFor="rated">Certificate:</label>
              <span id="rated" style={{ textTransform: "capitalize" }} className="value">
                {movie?.Rated || "-"}
              </span>
            </div>
          )}

          {loading ? (
            <div className="skeleton" style={{ width: "100%", height: "30px" }} />
          ) : (
            <div className="section">
              <label htmlFor="awards">Awards:</label>
              <span id="awards" className="value">
                {movie?.Awards || "-"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Movies;
