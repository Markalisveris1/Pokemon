import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupContainer = styled.div`
  width: 400px;
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const PokemonDetails = styled.div`
  text-align: center;
`;

const PokemonType = styled.div`
  margin-top: 10px;
`;

const PokemonStats = styled.div`
  margin-top: 20px;
`;

const AddButton = styled.button`
  background-color: #ffcc00;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
`;

const Popup = ({ pokemon, closePopup }) => (
  <Overlay onClick={closePopup}>
    <PopupContainer onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={closePopup}>×</CloseButton>
      <PokemonDetails>
        <h2>{pokemon.name}</h2>
        <img src={pokemon.image} alt={pokemon.name} width="150" />
        <p>{pokemon.description}</p>
        <PokemonType>
          <strong>Type:</strong> {pokemon.types.join(", ")}
        </PokemonType>
        <PokemonStats>
          <strong>Stats:</strong>
          {/* Placez ici la représentation graphique des stats */}
        </PokemonStats>
        <AddButton>Ajouter au Pokédex</AddButton>
      </PokemonDetails>
    </PopupContainer>
  </Overlay>
);

export default Popup;
