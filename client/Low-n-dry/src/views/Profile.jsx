import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../constant";
import Swal from "sweetalert2";

function Profile() {
  const [data, setData] = useState({});
  async function FetchProfile() {
    try {
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}profile`,
        headers: {
          Authorization: `Bearer ` + localStorage.accessToken,
        },
      });
      setData(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.message,
        icon: error,
        timer: 1000,
        showConfirmButton: false,
      });
    }
  }
  useEffect(() => {
    FetchProfile();
  }, []);
    const HandleImageChange = (event) => {
    const image = event.target.files[0];
    setCurrentImage(image);
  };
  const HandlePatchImage = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("photo", currentImage);
      const { data } = await axios({
        method: "patch",
        url: `${BASE_URL}cuisine/${idPatch}`,
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
      FetchData();
      setLoading(false);
    }
  };
  const [Notif, setNotif] = useState([]);
  async function FetchNotif() {
    try {
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}listNotif`,
        headers: {
          Authorization: `Bearer ` + localStorage.accessToken,
        },
      });
      setNotif(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    FetchNotif();
  }, []);
  
  return (
    <>
      <div className="p-6 flex flex-col justify-center items-center">
        <div className="flex flex-row">
          <img
            src={data.profilePicture}
            alt="image"
            className="w-20 h-20 rounded-full border-2 border-black"
          />
          <div className="ml-4 mt-4">
            <p>{data.email}</p>
            <p>{data.address}</p>
            <button>Change Profile Picture</button>
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
