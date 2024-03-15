import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    function handleLogout() {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
return (
    <>
    <button onClick={handleLogout}>Logout</button>
    </>
)
}
export default Navbar