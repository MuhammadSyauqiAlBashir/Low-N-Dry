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
      <img src={data.profilePicture} alt="image" />
      {Notif.map((item, index) => {
        return (
          <div
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.detail}
            </h5>
          </div>
        );
      })}
    </>
  );
}

export default Profile;
