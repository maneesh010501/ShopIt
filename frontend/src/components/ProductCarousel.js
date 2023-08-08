import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";

const ProductCarousel = ({ products }) => {
  const productsR = products.filter((product) => product.rating>= 4.6);

  return (
    <Carousel pause="hover" className="bg-dark" id="car">
      {productsR.map((product) => (
        <Carousel.Item key={product.id}>
          <Link to={`/product/${product.id}`}>
            <Image
              id="imgcar"
              className="imgcar"
              src={product.image}
              alt={product.name}
              fluid
            />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (Rs.{product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
