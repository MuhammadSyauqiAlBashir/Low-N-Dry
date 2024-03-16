import { Link } from "react-router-dom"

function Home() {
return (
    <>
    <div className="flex justify-center items-center">
        <Link to={'/create-order'}>
            Create an Order
        </Link>
    </div>
    </>
)
}
export default Home