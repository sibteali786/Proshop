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
import { addToCart } from "./../actions/cartActions";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CartScreen = () => {
  // All the hooks related to url, navigation to url and getting url parameters
  const history = useNavigate();
  const location = useLocation();
  const match = useParams();

  // defining ids
  const productId = match.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1; // the reason for splitting is that ' ?qty=1 ' where we split it from " = " so that index 1 is number


  // getting the state (updated cart)
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  // redux operations 
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId,qty));
      }
  }, [dspatch,qty,productId])
  
  return <div>Cart</div>;
};

export default CartScreen;
