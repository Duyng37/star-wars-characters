import { Card } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const { Meta } = Card;

function CharacterCard({ character, onClick, colorList }) {
  const [speciesType, setSpeciesType] = React.useState(null);

  useEffect(() => {
    const characterSpecies = character.species[0];

    if (characterSpecies && characterSpecies.length) {
      const match = characterSpecies.match(/\/(\d+)\/?$/);
      if (match) {
        const value = match[1];
        setSpeciesType(value);
      }
    } else {
      setSpeciesType(null);
    }
  }, [character.species]);

  return (
    <CardStyled
      hoverable
      style={{
        width: "100%",
        borderColor: speciesType ? colorList[speciesType] : "#000",
      }}
      cover={
        <img
          alt={character.name}
          src={`https://picsum.photos/200/300?random=${character.name}`}
        />
      }
      onClick={onClick}
    >
      <Meta title={character.name} />
    </CardStyled>
  );
}

const CardStyled = styled(Card)`
  .ant-card-body {
    padding: 24px 12px;
  }
`;

export default CharacterCard;
