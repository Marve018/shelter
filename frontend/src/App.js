import "./App.css";
import Nav from "./Navbar/nav";
import RegisterForm from "./Forms/RegisterForm";
import Home from "./Property/home";
import properties from "./data";

function App() {
  const house = properties.map((item) => {
    return <Home item={item} key={item.id} />;
  });
  return (
    <div className="App">
      <Nav />
      <RegisterForm />
      {house}
    </div>
  );
}

export default App;
