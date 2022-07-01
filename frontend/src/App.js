import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "react-bootstrap/Container";
import HomeScreen from './Screens/HomeScreen';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="py-3">
        <Container>
        <HomeScreen/>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
