import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/home";
import MyList from "./pages/mylist";
import EditProfile from "./pages/editprofile";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Rent from "./pages/rent";

function App() {
  const location = useLocation();
  const hideNavAndFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="app-container">
      {!hideNavAndFooter && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/home" element={<Home />} />
          <Route path="/mylist" element={<MyList />} />
          <Route path="/halaman-edit" element={<EditProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rent" element={<Rent />} />
        </Routes>
      </main>

      {!hideNavAndFooter && <Footer />}
    </div>
  );
}

export default App;
