/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const CHARACTER_IMG_URL = 'https://rickandmortyapi.com/api/character/avatar/';
const CHARACTER_DETAILS = 'https://rickandmortyapi.com/api/character/';

function CharacterDetail() {
  const [character, setCharacter] = useState({});
  const { id } = useParams();

  const fetchCharacterDetails = useCallback(async () => {
    const res = await fetch(`${CHARACTER_DETAILS}${id}`);
    const characterDetails = await res.json();
    setCharacter(characterDetails);
  }, [id]);

  useEffect(() => {
    fetchCharacterDetails();
  }, [fetchCharacterDetails, id]);

  return (
    <div>
      <img src={`${CHARACTER_IMG_URL}${character.id}.jpeg`} alt={`${character.name}`} />
      <h3>{character.name}</h3>
      <p>
        This character is from {character?.origin?.name} and was last seen on {character?.location?.name}.<br />
        They are a {character?.gender?.toLowerCase()} {character?.species?.toLowerCase()} and are currently considered {character?.status?.toLowerCase()}.
      </p>
    </div>
  );
}

CharacterDetail.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.number,
    location: PropTypes.shape({
      name: PropTypes.string,
    }),
    origin: PropTypes.shape({
      name: PropTypes.string,
    }),
    gender: PropTypes.string,
    species: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default CharacterDetail;
