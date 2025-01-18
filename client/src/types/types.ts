//This script defines all the necessary types 

import { ObjectId } from 'mongodb';

export type userType = {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export type snackbarType = {
  open: boolean,
  vertical: string,
  horizontal: string,
  message: string
}


export type TrendingVideoType = {
  poster_path: string,
  media_type: string,
  title?: string,
  original_name?: string,
  adult?: boolean,
  id?: number,
  release_date?: string,
  first_air_date?: string,
}

export type VideoType = {
  poster_path: string,
  media_type: string,
  title?: string,
  name?: string,
  adult?: boolean,
  id?: number,
  _id?: number,
  videoId?: number,
  release_date?: string,
  first_air_date?: string,
  original_title?: string,
}

type genresType = {
  name?: string;
  id?: number;
}

export type VideoDetailsType = {
  poster_path: string,
  runtime: string,
  title?: string,
  name?: string,
  original_language?: string,
  release_date?: string,
  first_air_date?: string,
  last_air_date?: string,
  original_title?: string,
  status?: string,
  genres?: genresType[],
  overview?: string,
  casts?: genresType[],
  homepage?: string,
  imdb_id?: string
}

export type bookmarkVideoType = {
  videoId: VideoType,
  _id: ObjectId
}