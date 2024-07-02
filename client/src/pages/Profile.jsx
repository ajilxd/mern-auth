import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import {
  deleteUserStart,
  updateUserFailture,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailture,
  deleteUserSuccess,
  signOut,
} from "../redux/user/userSlice.js";
function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector(
    (state) => state.user.user
  );
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  // console.log(formData);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  async function handleFileUpload(image) {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailture(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailture(error));
    }
  }

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  async function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  // console.log(formData);
  async function handleSignOut() {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDelete() {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailture(data));
        return;
      }
      dispatch(deleteUserSuccess());
      localStorage.removeitem("token");
      window.location.href = "/";
    } catch (error) {
      dispatch(deleteUserFailture(error));
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={
            formData.profilePicture
              ? formData.profilePicture
              : currentUser.profilePicture
          }
          alt="profile image"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center ">
          {imageError ? (
            <span className="text-red-700">Error uploading image</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">Uploading {imagePercent}%</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : null}
        </p>

        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-1 rounded-md hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between my-3">
        <span className="text-red-700 cursor-pointer" onClick={handleDelete}>
          Delete account
        </span>
        <span className="text-blue-700 cursor-pointer" onClick={handleSignOut}>
          signout
        </span>
      </div>
      <p className="text-red-700 mt-5 text-center">
        {error && "something went wrong"}
      </p>
      <p className="text-green-700 mt-5 text-center">
        {updateSuccess && "user details updated succesfully"}
      </p>
    </div>
  );
}

export default Profile;
