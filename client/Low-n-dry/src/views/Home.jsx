import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-1  justify-center items-center h-full w-full bg-[url('/images.jpg')] bg-cover">
        <Link
          to={"/create-order"}
          className="font-bold bg-red-900 justify-center items-center border border-red-500 hover:bg-red-400 px-4 py-2 text-xl text-dark rounded-md mt-3"
        >
          Create an Order
        </Link>
    </div>
  );
}
export default Home;
