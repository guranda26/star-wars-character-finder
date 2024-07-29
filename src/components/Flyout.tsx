import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unselectItem } from "../slices/selectedItemsSlice";
import { RootState } from "../store";

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  const handleUnselectAll = () => {
    Object.keys(selectedItems).forEach((name) => {
      dispatch(unselectItem(name));
    });
  };

  return (
    <div className="flyout-container">
      <div className="selected-items">
        <h2>{Object.keys(selectedItems).length} item(s) selected</h2>
        <button onClick={handleUnselectAll} className="unselect-all-button">
          Unselect all
        </button>
      </div>
      <div className="flyout">
        {Object.keys(selectedItems).length === 0 && <p>No items selected.</p>}
        {Object.entries(selectedItems).map(([name, character]) => (
          <div key={name} className="flyout-item">
            <h3>{character.name}</h3>
            <p>Height: {character.height}</p>
            <p>Mass: {character.mass}</p>
            <button onClick={() => dispatch(unselectItem(name))}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flyout;
