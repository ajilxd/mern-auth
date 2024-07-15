import { useState } from "react";
function CreateUser() {
  const [formData, setFormData] = useState({});
  const [errori, setErrori] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);
  function handleChange(event) {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setIsLoading(false);
      if (data.success == false) {
        setErrori(true);
        return;
      }

      setErrori(false);
      setStatus(true);
    } catch (error) {
      setIsLoading(false);
      setErrori(true);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Add user</h1>
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
          className="bg-green-600 p-1 rounded-lg text-white hover:opacity-90"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "create user"}
        </button>
      </form>
      <p className="text-green-700">
        {status && !errori && "user created succesfully"}
      </p>
      <p className="text-red-500">{errori && "Something went wrong"}</p>
    </div>
  );
}

export default CreateUser;
