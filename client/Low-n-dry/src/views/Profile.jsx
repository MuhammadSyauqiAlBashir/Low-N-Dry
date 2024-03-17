import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../constant";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import useNotif from "../hooks/useNotif";
import { useDispatch, useSelector } from "react-redux";
import { resetProfile, updateProfile } from "../redux/profile";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { data } = useProfile();
  let notif = useNotif();
  let Notif = notif.data;
  const [currentImage, setCurrentImage] = useState(null);
  const HandleImageChange = (event) => {
    const image = event.target.files[0];
    setCurrentImage(image);
  };
  const handleChangePicture = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("photo", currentImage);
      const { data } = await axios({
        method: "patch",
        url: `${BASE_URL}updatePhoto`,
        headers: {
          Authorization: `Bearer ` + localStorage.accessToken,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      setCurrentImage(null);
      if (!data) throw (error.response.data.message = "Please input file");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
    } finally {
      dispatch(resetProfile());
    }
  };
  return (
    <>
      <div className="p-6 flex flex-col justify-center items-center">
        <div className="flex flex-row">
          <img
            src={data.profilePicture}
            alt="image"
            className="w-20 h-20 rounded-full border-2 border-black"
          />
          <div className="ml-4">
            <p>{data.email}</p>
            <p>{data.address}</p>
            <div>
              <form onSubmit={handleChangePicture}>
                <input onChange={HandleImageChange} type="file" />
                <button className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white rounded-md mt-3">
                  Change Profile Picture
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="space-y-2 mt-6">
          {Notif.map((item, index) => {
            return (
              <div
                key={index}
                className="block p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.detail}
                </h5>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Profile;
