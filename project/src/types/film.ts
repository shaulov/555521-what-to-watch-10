export type Film = {
  id: string,
  name: string,
  poster: string,
  background: string,
  genre: string[],
  releaseDate: string,
  runTime: number,
  rating: number,
  ratingsNumber: number,
  description: string[],
  director: string[],
  starring: string[],
  video: string,
}

export type SingleReview = {
  id: string,
  author: string,
  reviewDate: Date,
  rating: number,
  content: string,
}

export type FilmReview = {
  filmId: string,
  review: SingleReview[],
}
