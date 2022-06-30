import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="py-3">
        <Container>
        <h3>Welcome To Proshop</h3>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
