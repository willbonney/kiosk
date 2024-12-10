import { OMDBMovieArr, GoogleBooksArr, IGDBGameArr } from "./ApiResponses";
import React from "react";

type Headers = {
  [key: string]: string;
};

type RatingSource = {
  icon: string;
  name: string;
  normalized: boolean;
};

type InterpolatableValue = {
  id?: string;
  isbn13?: string;
  url?: string;
};

export type InterpolatableObject = {
  value: InterpolatableValue;
};

export type AdditionalRequest = {
  description?: string;
  matchFieldName: string;
  url: string;
  method: string;
  headers: Headers;
  data?: any;
  requestMetadata?: Record<string, unknown>;
};

export interface MatchesParams {
  showOnly?: string;
}

export interface PublicViewParam {
  publicUid?: string;
}

export type ParsedData<T> = {
  label: string;
  value: T;
};

export type OMDBParsedData = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  type: string;
  rating: number;
};

export type GoogleBooksParsedData = {
  id: string;
  isbn13?: string;
  title: string;
  subtitle: string;
  image?: string;
  type: string;
  rating: number;
};

export type IGDBParsedData = {
  id: number;
  title: string;
  subtitle: number;
  cover: number;
  url: string;
  type: string;
  rating: number;
};

export type Media<T extends OMDBMovieArr | GoogleBooksArr | IGDBGameArr, P extends OMDBParsedData | GoogleBooksParsedData | IGDBParsedData> = {
  label: string;
  url: string;
  headers: Headers;
  method: string;
  data?: Record<string, unknown>;
  dataFormatter?: (input: string) => string;
  searchParam?: string;
  schemaParser: (response: T) => ParsedData<P>[];
  icon: React.ReactElement;
  firestoreKey: string;
  quadrant: number[];
  externalUrlFormatter: (arg1: InterpolatableObject) => string;
  additionalRequest?: AdditionalRequest;
  ratingSource: RatingSource;
  requestMetadata?: Record<string, unknown>;
};
