import { useEffect, useState, useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase.js";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(false);
  //   console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/admin/edit/${id}`);
        const data = await res.json();
        // console.log(data);
        setEmail(data.email);
        setUserName(data.username);
        // setPassword(data.password);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const dataObject = {
        email: email,
        password: password,
        username: username,
        id: id,
      };
      //   console.log(dataObject);
      const res = await fetch(`/api/admin/update/${formData._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObject),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(true);
      }
      setStatus(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <img
          src={formData.profilePicture}
          alt="profile image"
          className="h-24 w-24 self-center  rounded-full object-cover"
        />

        <input
          defaultValue={formData.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          defaultValue={formData.email}
          type="email"
          id="email"
          placeholder="email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-1 rounded-md hover:opacity-90 disabled:opacity-80"
        >
          update
        </button>
      </form>
      <div className="flex justify-between my-3">
        <button></button>
      </div>
      <p className="text-red-700 mt-5 text-center">
        {error && "something went wrong"}
      </p>
      <p className="text-green-700 mt-5 text-center">
        {status && "user details updated succesfully"}
      </p>
    </div>
  );
}

export default Profile;
