import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errori, setErrori] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  function handleChange(event) {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setIsLoading(false);
      setErrori(false);
      if (data.success == false) {
        setErrori(true);
        return;
      }
      navigate("/signin");
      console.log("user created succesfully");
    } catch (error) {
      setIsLoading(false);
      setErrori(true);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 p-1 rounded-lg text-white hover:opacity-90"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-3">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-500">{errori && "Something went wrong"}</p>
    </div>
  );
}

export default Signup;
