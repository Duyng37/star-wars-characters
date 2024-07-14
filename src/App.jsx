import { Col, Layout, message, Pagination, Row, Spin, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import CharacterCard from "./components/CharacterCard";
import CharacterModal from "./components/CharacterModal";
import { getColors } from "./utils";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [colorList, setColorList] = useState({});

  useEffect(() => {
    axios.get("https://swapi.dev/api/species").then((response) => {
      const colors = getColors(response.data.count);

      setColorList(colors);
    });
  }, []);

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const fetchCharacters = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?page=${page}`
      );
      setCharacters(response.data.results);
      setTotalItems(response.data.count);
    } catch (error) {
      message.error(
        "Error occurred while fetching characters. Please try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  const openModal = (character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AppWrapper>
      <AppContent>
        {loading && <Spin fullscreen />}
        <Header className="header">
          <Title
            level={2}
            style={{ color: "white", margin: 0, lineHeight: 2.4 }}
            className="star-wars-text"
          >
            Star Wars Characters
          </Title>
        </Header>
        <Content style={{ padding: "0 50px", background: "#fff" }}>
          <div className="site-layout-content">
            <Row gutter={[16, 16]}>
              {characters.map((character, index) => (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={4}
                  key={character.name + index}
                >
                  <CharacterCard
                    character={character}
                    onClick={() => openModal(character)}
                    colorList={colorList}
                  />
                </Col>
              ))}
            </Row>
            <Pagination
              current={currentPage}
              total={totalItems}
              pageSize={10}
              onChange={(page) => setCurrentPage(page)}
              style={{
                marginTop: "24px",
                textAlign: "center",
                justifyContent: "center",
              }}
              showSizeChanger={false}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Star Wars Characters ©2024 Created by Duy Nguyen
        </Footer>
        {selectedCharacter && (
          <CharacterModal
            isOpen={isModalOpen}
            onClose={closeModal}
            character={selectedCharacter}
          />
        )}
      </AppContent>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  /* width: 100vw;
  height: 100vh; */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const AppContent = styled.div`
  width: 1280px;
  height: 96%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  overflow: auto;
`;

export default App;
