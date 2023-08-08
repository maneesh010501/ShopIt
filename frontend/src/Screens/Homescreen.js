import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Products from "../components/Products";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = ({ products }) => {
  return (
    <>
      <Meta />

      <Container fluid>
        <ProductCarousel products={products} />
      </Container>

      <h1>Latest Products</h1>

      <>
        <Row>
          {products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <Products product={product} />
            </Col>
          ))}
        </Row>
        <Paginate pages={1} page={1} />
      </>
    </>
  );
};

export default HomeScreen;
