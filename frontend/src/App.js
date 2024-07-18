import "./App.css";
import Nav from "./Navbar/nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from "./Forms/RegisterForm";
import LoginForm from "./Forms/loginForm";

import PropertyList from "./Property/PropertyList";
import PropertyDetail from "./Property/PropertyDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />

        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
