import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import MyList from "./pages/mylist";
import EditProfile from "./pages/editprofile";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mylist" element={<MyList />} />
          <Route path="/halaman-edit" element={<EditProfile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
