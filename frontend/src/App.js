import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "react-bootstrap/Container";
import HomeScreen from "./Screens/HomeScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />  
            <Route path="/cart/" element={<CartScreen />} />  
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
