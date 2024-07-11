import "./App.css";
import Nav from "./Navbar/nav";
import RegisterForm from "./Forms/RegisterForm";
import Home from "./Property/home";

function App() {
  return (
    <div className="App">
      <Nav />
      <RegisterForm />
      <Home />
    </div>
  );
}

export default App;
