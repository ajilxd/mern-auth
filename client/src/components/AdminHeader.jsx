import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminSignoutSuccess } from "../redux/admin/adminSlice";

function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user.admin);
  async function signOutHandler() {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to sign out. This action cannot be undone.",
      useicon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch("/api/admin/signout");
        const data = await response.json();
        // Handle the response data as needed
        console.log(data);
        if (data.success) {
          dispatch(adminSignoutSuccess());
          navigate("/admin");
        }
      } else {
        console.log("dismissed");
      }
    });
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">Welcome, Admin</div>
        {currentUser && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={signOutHandler}
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}

export default AdminHeader;
