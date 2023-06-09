import { Card, CardGroup, ListGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import ViewReview from "../rating/ViewReview";
import AverageRating from "../rating/AverageRating";
import { useNavigate } from "react-router-dom";
import "./card.styles.css";

const CardComponent = ({
  restaurant: {
    userId,
    name,
    cuisine,
    address1,
    address2,
    city,
    state,
    zipCode,
    averageRating,
  },
}) => {
  const navigate = useNavigate();
  const [showViewReviewForm, setShowViewReviewForm] = useState(false);

  const handleShowReviewClick = (event) => {
    event.stopPropagation();
    setShowViewReviewForm(true);
  };

  const handleViewReviewFormClose = (event) => {
    // event.stopPropagation();
    setShowViewReviewForm(false);
  };

  return (
    <>
      <CardGroup className="my-1">
        <Card
          style={{ width: "18rem" }}
          className="card-container"
        >
          <Card.Body  key={userId}
          onClick={() => navigate(`/r/${userId}`)}>
            <Card.Title style={{ textAlign: "center" }}>{name}</Card.Title>
            {averageRating !== 0 ?
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AverageRating averageRating={averageRating} />
            </div>
            :
            ""
            }
            <Card.Text style={{ textAlign: "center" }}>{cuisine}</Card.Text>
            <ListGroup className="list-group-flush">
              <ListGroup.Item style={{ textAlign: "center" }}>
                {address1} {address2}, {city}, {state} {zipCode}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
          <Card.Footer className="border-0" style={{ background: "white" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="primary"
                type="submit"
                onClick={handleShowReviewClick}
              >
                View Reviews
              </Button>{" "}
            </div>
            {/* <ViewReview
              show={showViewReviewForm}
              handleClose={handleViewReviewFormClose}
              userId={userId}
              name={name}
              reviews={reviews}
            /> */}
          </Card.Footer>
        </Card>
      </CardGroup>
    </>
  );
};

export default CardComponent;
