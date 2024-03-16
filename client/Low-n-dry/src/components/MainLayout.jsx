import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-16 flex flex-col min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
