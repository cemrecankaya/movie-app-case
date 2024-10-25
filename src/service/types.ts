/** Request Type. */
export enum Type {
  Movie = "movie",
  Series = "series",
  Episode = "episode",
}

/** Plot Type. */
export enum Plot {
  Short = "short",
  Full = "full",
}

/** The data type to return. */
export enum ReturnDataType {
  Json = "json",
  Xml = "xml",
}

/** Represents OMDb API Parameters. */
export interface IRequestParams {
  /** Type of result to return. */
  type?: Type;
  /** Year of release. */
  y?: string;
  /** Return short or full plot. */
  plot?: Plot;
  /** The data type to return. */
  r?: ReturnDataType;
  /** JSONP callback name. */
  callback?: string;
  /** API version (reserved for future use). */
  v?: number;
}

export interface IGetMovieByIdParams extends IRequestParams {
  /** A valid IMDb ID (e.g. tt1285016). */
  i: string;
}
export interface IGetMovieByTitleParams extends IRequestParams {
  /** Movie title to search for. */
  t: string;
}
export interface IGetMoviesBySearchParams extends Omit<IRequestParams, "plot"> {
  /** Movie title to search for. */
  s: string;
  /** Page number to return. */
  page?: number;
}
export interface IGetMoviePosterByIdParams {
  /** Movie title to search for. */
  i: string;
}

export interface IRating {
  Source: string;
  Value: string;
}

export interface ISearch {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface IGetMovieByIdorByTitleResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: IRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface IGetMoviesBySearchResponse {
  Search: ISearch[];
  totalResults: string;
  Response: string;
}
