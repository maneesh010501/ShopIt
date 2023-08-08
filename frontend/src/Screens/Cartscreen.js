import React, { useEffect } from "react";

import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { cartAction } from "../store/store";

const CartScreen = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector((state) => state.cart.cart);
  const Price = useSelector((state) => state.cart.Price);
  const navigate = useNavigate();

  useEffect(() => {
    CalPrice();
  }, [cartItems]);
  const removeFromCartHandler = (e) => {
    dispatch(cartAction.RemoveFromCart(e));
  };
  const CalPrice = () => {
    dispatch(cartAction.MakePrice());
    dispatch(cartAction.CalculatePrice());
  };
  const handleCheckout = () => {
    if (isLoggedIn) {
      navigate("/shipping");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Link to="/" className="btn btn-black my-3">
        Go Back
      </Link>
      <Row>
        <Col md={8}>
          <h1>Cart</h1>
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>{item.name}</Col>
                  <Col md={2}>₹{item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => {
                        dispatch(
                          cartAction.ChangeQty({
                            id: item.id,
                            qty: e.target.value,
                          })
                        );

                        CalPrice();
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Subtotal items</h2>
                Rs.{Price}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  onClick={handleCheckout}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
