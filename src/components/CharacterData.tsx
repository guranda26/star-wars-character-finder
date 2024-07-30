import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Character } from "../interfaces/CharacterInterface";
import { selectItem, unselectItem } from "../slices/selectedItemsSlice";
import { RootState } from "../store";

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
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  if (loading) {
    return <div className="loading-data">Loading Data...</div>;
  }

  if (data.length === 0) {
    return <div className="no-data">No data available</div>;
  }

  const handleCheckboxChange = (character: Character, checked: boolean) => {
    if (checked) {
      dispatch(selectItem(character));
    } else {
      dispatch(unselectItem(character.name));
    }
  };

  return (
    <ul className="carts" data-testid="character-data">
      {data.map((item) => (
        <li
          key={item.name}
          onClick={() => onCharacterClick(item)}
          className="cart"
        >
          <input
            type="checkbox"
            checked={!!selectedItems[item.name]}
            onChange={(e) => handleCheckboxChange(item, e.target.checked)}
          />
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
