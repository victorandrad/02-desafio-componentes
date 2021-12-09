import { useState, useEffect } from 'react';

import { ContentHeaderTitle } from './ContentHeaderTitle';
import { MovieCard } from "./MovieCard";

import '../styles/content.scss';

import { MovieProps } from "../interfaces/movie.props";
import { GenreResponseProps } from "../interfaces/genre.response.props";

import { api } from '../services/api';

type Movies = {
  genreId: number;
}
export function Content(props: Movies) {
  // Complete aqui
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${props.genreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${props.genreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [props.genreId]);

  return (
    <div className="container">
      <ContentHeaderTitle title={selectedGenre.title} />

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  );
}