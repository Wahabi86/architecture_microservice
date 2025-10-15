import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import MyList from "./pages/mylist";
import EditProfile from "./pages/editprofile";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="app-container">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mylist" element={<MyList />} />
            <Route path="/halaman-edit" element={<EditProfile />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
