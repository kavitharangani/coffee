import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Payment from "./pages/payment";
import Contact from "./components/contact";
import Navbar from "./components/navbar";
import About from "./components/about";
import Delivery from "./components/delivery";
import AdminDashboard from "./pages/adminPanel";
import StockManagement from "./pages/item";
import Menu from "./components/menuCategories";
import UserForm from "./pages/user";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  // Hide Navbar on Login and Register pages
  const showNavbar = location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />\
        <Route path="/about" element={<About />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/AdminPanel" element={<AdminDashboard />} />
        <Route path="/items" element={<StockManagement/>} />
        <Route path="/user" element={<UserForm />} />
      </Routes>
    </>
  );
}

export default App;