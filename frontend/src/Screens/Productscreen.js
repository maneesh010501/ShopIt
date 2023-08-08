import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import {
  ListGroup,
  Col,
  Row,
  Card,
  Image,
  Button,
  Form,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { cartAction } from "../store/store";

const Productscreen = ({ props }) => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product] = props.filter((product) => {
    return product.id == id;
  });

  const handleClick = () => {
    dispatch(cartAction.AddToCart({item:{ ...product, qty: qty },id:product.id}));
    navigate("/cart");
  };

  return (
    <>
      <Link to="/" className="btn btn-black my-3">
        Go Back
      </Link>

      <Row>
        <Col md={4}>
          <Image src={product.image} alt={product.name} fluid  style={{height:'350px'}}/>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                numReviews={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: Rs.{product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4} style={{marginLeft:'40px'}}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>Rs{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={handleClick}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Productscreen;
