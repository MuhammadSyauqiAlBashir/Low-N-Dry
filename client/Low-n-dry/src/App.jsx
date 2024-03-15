import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from './views/Login';
import Home from './views/Home';
import MainLayout from './components/MainLayout';
import Register from "./views/Register";
import ListPrice from "./views/List-Price";


function App() {
  const router = createBrowserRouter([
    {
      element : <MainLayout />,
      loader : () => {
        if(!localStorage.accessToken){
          return redirect('/login')
        }
        return null
      },
      children : [
        {
          path : "/",
          element: <Home />
        },
        {
          path : "/list-price",
          element : <ListPrice/>
        }
      ]
    },
    {
      path: "/login",
      element: <Login />,
      loader : () => {
        if(localStorage.accessToken){
          return redirect('/')
        }
        return null
      },
    },
    {
      path: "/register",
      element: <Register />,
      loader : () => {
        if(localStorage.accessToken){
          return redirect('/')
        }
        return null
      },
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
