import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardList from "../card-list/card-list.component";
import NavBarHome from "../NavBarHome";
import SearchBox from "../search-box/search-box.component";

import "./Customer.css";

const Search = () => {
  const [searchField, setSearchField] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://6b2uk8oqk7.execute-api.us-west-2.amazonaws.com/prod/restaurant?name=${searchField}`;
      const response = await fetch(url);
      const data = await response.json();
      setRestaurants(data);
      console.log(data);
    };
    fetchData();
  }, [searchField]);

  useEffect(() => {
    setNotFound(restaurants.length === 0 && searchField !== "");
  }, [restaurants, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="Search Restaurant"
      />
      {notFound ? (
        <h2>Restaurant cannot be found</h2>
      ) : (
        <CardList restaurants={restaurants} className="card-grid" />
      )}
    </div>
  );
};

export function Customer() {
  return (
    <>
      <div>
        <NavBarHome />
      </div>
      <Container fluid="md">
        <Row className="justify-content-center">
          <Col>
          <h1> Let's find some food! </h1>
          <Search  />
          </Col>
        </Row>
      </Container>
    </>
  );
}
