import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../components/Message";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "./../actions/cartActions";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CartScreen = () => {
  // All the hooks related to url, navigation to url and getting url parameters
  const history = useNavigate();
  const location = useLocation();
  const match = useParams();

  // defining ids
  const productId = match.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1; // the reason for splitting is that ' ?qty=1 ' where we split it from " = " so that index 1 is number
  console.log(productId);

  // getting the state (updated cart)
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);
  // redux operations
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, qty, productId]);


  // removal button
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history(`/login?redirect=shipping`)
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={2}>
                  <Form.Control as='select' value={item.qty} onChange={(e)=> 
                    dispatch(addToCart(item.product,Number(e.target.value))
                    )}>
                        {[...Array(item.countInStock).keys()].map(x => (
                          <option key={x+1} value={x+1}>
                            {x+1}
                          </option>
                        ) )}  {/* Its  like getting [0,1,2,3,4]  */}
                      </Form.Control>
                  </Col>
                  <Col>
                  <Button type='button' variant="light" onClick={()=> removeFromCartHandler(item.product)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                  </Col>
                </Row>
              </ListGroup>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Subtotal ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) items </h2>
                ${cartItems.reduce((acc,item)=>acc+item.qty * item.price,0).toFixed(2)} 
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
