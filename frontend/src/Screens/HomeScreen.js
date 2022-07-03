import React, {useState, useEffect} from 'react'
import {Row, Col} from "react-bootstrap";
import Product from '../components/Product';
import axios from "axios"
const HomeScreen = () => {
  const [products,setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () =>{
      const {data} = await axios.get("/api/products")
      setProducts(data);
    }

    fetchProducts();
  },[])
  // we go in swtupProxy.js and add explicit proxy when our local host converts to port 5000 from 3000 as backend is 
  // running on 5000 port no. we also install npm install http-proxy-middleware --save. to be able to define a 
  // proxy middle ware
  return (
    <>
    <h1>Latest Products</h1>
    <Row>
        {products.map(product=>(
            <Col key={product._id} sm={12} md={6} lg={4}>
            <h3>
                <Product product={product} />
            </h3>
            </Col>
        ))}
    </Row>
    </>
  )
}

export default HomeScreen;