import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import About from "./pages/About";
import AdminLogin from "./pages/admin/AdminLogin";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/admin/Dashboard";
import EditUser from "./pages/admin/EditUser";
import CreateUser from "./pages/admin/CreateUser";
import HeaderRoute from "./components/HeaderRoute";
import AdminHeaderRoute from "./components/AdminHeaderRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HeaderRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/signin" element={<Signin />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<HeaderRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>

        <Route path="/admin" element={<AdminLogin />} />
        <Route element={<AdminPrivateRoute />}>
          <Route element={<AdminHeaderRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/edit/:id" element={<EditUser />} />
            <Route path="/admin/createuser" element={<CreateUser />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
