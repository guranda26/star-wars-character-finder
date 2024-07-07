import { Component } from "react";
import { Character } from "../interfaces/CharacterInterface";

interface Props {
  data: Character[];
}

class CharacterData extends Component<Props> {
  render() {
    const { data } = this.props;
    if (data.length === 0) {
      return <div className="loading-data">Loading Data...</div>;
    }

    return (
      <ul>
        {data.map((item) => (
          <li key={item.name}>
            <h2>{item.name}</h2>
            <p>Height: {item.height} cm</p>
            <p>Mass: {item.mass} kg</p>
            <p>Hair Color: {item.hair_color}</p>
            <p>Skin Color: {item.skin_color}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default CharacterData;
