import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unselectItem, unselectAllItems } from "../slices/selectedItemsSlice";
import { RootState } from "../store";

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  const handleUnselectAll = () => {
    Object.keys(selectedItems).forEach(() => {
      dispatch(unselectAllItems());
    });
  };

  const handleDownload = () => {
    const headers = ["Name", "Description", "Details URL"]; // Modify headers as needed
    const rows = Object.values(selectedItems).map((item) => [
      item.name,
      item.height || "",
      item.mass || "",
      item.hair_color || "",
      item.skin_color || "",
      item.eye_color || "",
      item.birth_year || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${Object.keys(selectedItems).length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flyout-container">
      <div className="selected-items">
        <h2>{Object.keys(selectedItems).length} item(s) selected</h2>
        <button
          onClick={handleUnselectAll}
          className="unselect-all-button"
          data-testid="unselect-all-button"
        >
          Unselect all
        </button>
        <button
          onClick={handleDownload}
          className="download-button"
          data-testid="download-button"
        >
          Download
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
