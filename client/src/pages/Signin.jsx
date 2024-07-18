import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signinStart,
  signinFailure,
  signinSuccess,
} from "../redux/user/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
function Signin() {
  const [formData, setFormData] = useState({});
  const formSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      try {
        dispatch(signinStart());
        const res = await fetch("/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        dispatch(signinSuccess(data));
        if (data.success == false) {
          dispatch(signinFailure(data));
          return;
        }

        navigate("/home");
      } catch (error) {
        dispatch(signinFailure(error));
        console.log(error);
      }
    },
  });
  const { loading, error } = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleChange(event) {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  }

  return (
    // <>
    //   <div className="p-4 max-w-lg mx-auto">
    //     <h1 className="text-3xl text-center font-semibold my-7">Sign in</h1>
    //     <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
    //       <input
    //         type="email"
    //         placeholder="Email"
    //         id="email"
    //         className="bg-slate-100 p-3 rounded-lg"
    //         onChange={handleChange}
    //         {...formik.getFieldProps("email")}
    //       />
    //       {formik.touched.email && formik.errors.email ? (
    //         <div className="text-red-500">{formik.errors.email}</div>
    //       ) : null}
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         id="password"
    //         className="bg-slate-100 p-3 rounded-lg"
    //         onChange={handleChange}
    //         {...formik.getFieldProps("password")}
    //       />
    //       {formik.touched.password && formik.errors.password ? (
    //         <div className="text-red-500">{formik.errors.password}</div>
    //       ) : null}
    //       <button
    //         className="bg-slate-700 p-1 rounded-lg text-white hover:opacity-90"
    //         disabled={loading}
    //       >
    //         {loading ? "Loading..." : "Sign in"}
    //       </button>
    //       <OAuth />
    //     </form>
    //     <div className="flex gap-2 mt-3">
    //       <p>Dont have an account?</p>
    //       <Link to="/signup">
    //         <span className="text-blue-500">Sign up</span>
    //       </Link>
    //     </div>
    //     <p className="text-red-500">{error ? error.message : ""}</p>
    //   </div>
    // </>
    <div>
      <button>-</button>
      <button>+</button>
    </div>
  );
}

export default Signin;
