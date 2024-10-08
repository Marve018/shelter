import "./App.css";
import Nav from "./Navbar/nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from "./Forms/RegisterForm";
import LoginForm from "./Forms/loginForm";
import PropertyList from "./Property/PropertyList";
import PropertyDetail from "./Property/PropertyDetail";
import LandingPage from "./pages/landingpage";
import UserDashboard from "./components/userdashboard";
import CreateProperty from "./Forms/CreateProperty";
import BookProperty from "./Forms/BookProperty";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from './components/authcontext';

function App() {
    return (
      <Router>
        <AuthProvider>
          <div className="App">
            <Nav />
  
            <Routes>
              <Route path="/home" element={<LandingPage />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/properties" element={<PropertyList />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/dashboard/profile"
                element={
                  <PrivateRoute>
                    <UserDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/properties/create"
                element={
                  <PrivateRoute>
                    <CreateProperty />
                  </PrivateRoute>
                }
              />
              <Route
                path="/propertey/book/:id"
                element={
                  <PrivateRoute>
                    <BookProperty />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    );
  }

export default App;
