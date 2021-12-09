import { useEffect, useState } from "react";

import { GenreResponseProps } from "../interfaces/genre.response.props";

import { Button } from "./Button";

import { api } from '../services/api';

import '../styles/sidebar.scss';

type Genre = {
  onClick: (id: number) => void;
}

export function SideBar(props: Genre) {
  // Complete aqui
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });

    props.onClick(selectedGenreId);
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
    props.onClick(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  );
}