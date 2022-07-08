import React, {useState, useEffect} from 'react'
import {Row, Col} from "react-bootstrap";
import Product from '../components/Product';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { listProducts } from './../actions/productActions';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state=>state.productList);
  const {loading,error, products} = productList;
  useEffect(() => {
    dispatch(listProducts())
  },[dispatch])
  // we go in swtupProxy.js and add explicit proxy when our local host converts to port 5000 from 3000 as backend is 
  // running on 5000 port no. we also install npm install http-proxy-middleware --save. to be able to define a 
  // proxy middle ware
  
  return (
    <>
    <h1>Latest Products</h1>
    {loading ? <h2>Loading...</h2> :  error ? <h3>{error}</h3> : (<Row>
      
      {products.map(product=>(
          <Col key={product._id} sm={12} md={6} lg={4}>
          <h3>
              <Product product={product} />
          </h3>
          </Col>
      ))}
  </Row>)}
    
    </>
  )
}

export default HomeScreen;