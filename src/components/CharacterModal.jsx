import { Descriptions, Modal, Spin, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function CharacterModal({ isOpen, onClose, character }) {
  const [homeworld, setHomeworld] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (character && character.homeworld) {
      fetchHomeworld(character.homeworld);
    }
  }, [character]);

  const fetchHomeworld = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setHomeworld(response.data);
    } catch (error) {
      message.error(
        "Error occurred while fetching homeworld. Please try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!character) return null;

  return (
    <ModalStyled
      title={character.name}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Spin spinning={loading}>
        <Descriptions title="Character Info" bordered>
          <Descriptions.Item label="Height">
            {(character.height / 100).toFixed(2)} m
          </Descriptions.Item>
          <Descriptions.Item label="Mass">
            {character.mass} kg
          </Descriptions.Item>
          <Descriptions.Item label="Birth Year">
            {character.birth_year}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {character.gender}
          </Descriptions.Item>
        </Descriptions>

        {homeworld && (
          <Descriptions
            title="Homeworld Info"
            bordered
            style={{ marginTop: "20px" }}
          >
            <Descriptions.Item label="Name">{homeworld.name}</Descriptions.Item>
            <Descriptions.Item label="Rotation Period">
              {homeworld.rotation_period}
            </Descriptions.Item>
            <Descriptions.Item label="Orbital Period">
              {homeworld.orbital_period}
            </Descriptions.Item>
            <Descriptions.Item label="Diameter">
              {homeworld.diameter}
            </Descriptions.Item>
            <Descriptions.Item label="Climate">
              {homeworld.climate}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Spin>
    </ModalStyled>
  );
}

const ModalStyled = styled(Modal)`
  min-width: 50vw;

  .ant-modal-title {
    font-size: 24px;
  }
`;

export default CharacterModal;
