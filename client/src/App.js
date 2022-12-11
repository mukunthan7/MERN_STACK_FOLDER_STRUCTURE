import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { login } from "./data/auth";
import Cookies from "js-cookie";

function App() {
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuth();
  }, []);

  async function fetchAuth() {
    setLoading(true);
    const res = await fetch("http://localhost:4000/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const user = await res.json();
      dispatch(login(user));
    }
    setLoading(false);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
