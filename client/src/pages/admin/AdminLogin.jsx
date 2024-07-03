import { useState } from "react";

function AdminLogin() {
  const [formData, setFormData] = useState();

  async function handleSubmit() {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  }
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Admin Login</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        <button className="bg-slate-700 p-1 rounded-lg text-white hover:opacity-90">
          sign in
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
