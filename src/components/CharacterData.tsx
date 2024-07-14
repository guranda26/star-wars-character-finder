import React from "react";
import { Character } from "../interfaces/CharacterInterface";

interface Props {
  data: Character[];
  loading: boolean;
  onCharacterClick: (character: Character) => void;
}

const CharacterData: React.FC<Props> = ({
  data,
  loading,
  onCharacterClick,
}) => {
  if (loading) {
    return <div className="loading-data">Loading Data...</div>;
  }

  if (data.length === 0) {
    return <div className="no-data">No data available</div>;
  }

  return (
    <ul className="carts">
      {data.map((item) => (
        <li
          key={item.name}
          onClick={() => onCharacterClick(item)}
          className="cart"
        >
          <h2>{item.name}</h2>
          <p>Height: {item.height} cm</p>
          <p>Mass: {item.mass} kg</p>
          {item.hair_color ? <p>Hair color: {item.hair_color}</p> : null}
          <p>Skin Color: {item.skin_color}</p>
        </li>
      ))}
    </ul>
  );
};

export default CharacterData;
