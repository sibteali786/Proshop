import React, { useState ,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Rating from "./../components/Rating";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "./../components/Message";

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch();
  const match = useParams();
  const history = useNavigate();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  // fetching product from backend using redux
  useEffect(() => {
    dispatch(listProductDetails(match.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history(`/cart/${match.id}?qty=${qty}`)
  }
  // Accessing the required product by matching id in the url
  // const product = products.find(p=> p._id === match.id);
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image
              src={product.image}
              alt={product.name}
              style={{ width: "100%" }}
            />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.rating} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price:${product.price}</ListGroup.Item>
              <ListGroup.Item>Description:{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        $
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && 
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Qty
                    </Col>
                    <Col>
                      <Form.Control as='select' value={qty} onChange={(e)=> setQty(e.target.value)}>
                        {[...Array(product.countInStock).keys()].map(x => (
                          <option kry={x+1} value={x+1}>
                            {x+1}
                          </option>
                        ) )}  {/* Its  like getting [0,1,2,3,4]  */}
                      </Form.Control>
                    </Col>
                  </Row>
                  </ListGroup.Item>
                  }
                <ListGroup.Item>
                  <Button
                  onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
