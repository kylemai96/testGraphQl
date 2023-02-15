import "./card.styles.css";
import { Card, CardGroup, ListGroup } from "react-bootstrap";

const CardComponent = ({ restaurant: { userID, Name, Cuisine, Address } }) => {
  return (
    <>
      <CardGroup className="my-1">
        <Card
          style={{ width: "18rem" }}
          className="card-container"
          key={userID}
        >
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>{Name}</Card.Title>
            <Card.Text style={{ textAlign: "center" }}>{Cuisine}</Card.Text>
            <ListGroup className="list-group-flush">
              <ListGroup.Item style={{ textAlign: "center" }}>
                {Address}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
};

export default CardComponent;
