import React, { useState } from "react";
import styled from "styled-components";
import Popup from "./Popup";

const Card = styled.div`
  width: 300px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: ${({ color }) => color};
  cursor: pointer;
  transform: perspective(1000px) rotateY(0);
  transition: transform 0.3s;

  &:hover {
    transform: perspective(1000px) rotateY(15deg);
  }
`;

const PokemonImage = styled.img`
  width: 100%;
  border-radius: 15px;
`;

const PokemonInfo = styled.div`
  text-align: center;
  margin-top: 15px;
`;

const AddButton = styled.button`
  background-color: #ffcc00;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
`;

const PokemonCard = ({ pokemon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Card color={pokemon.color} onClick={togglePopup}>
        <PokemonImage src={pokemon.image} alt={pokemon.name} />
        <PokemonInfo>
          <h2>{pokemon.name}</h2>
          <p>{pokemon.number}</p>
        </PokemonInfo>
      </Card>
      {isOpen && <Popup pokemon={pokemon} closePopup={togglePopup} />}
    </>
  );
};

export default PokemonCard;
