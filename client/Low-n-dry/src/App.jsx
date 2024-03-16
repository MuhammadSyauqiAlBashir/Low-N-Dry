import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";
import MainLayout from "./components/MainLayout";
import Register from "./views/Register";
import ListPrice from "./views/List-Price";
import Profile from "./views/Profile";
import MyOrder from "./views/My-Order";
import CreateOrder from "./views/Create-Order";

function App() {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      loader: () => {
        if (!localStorage.accessToken) {
          return redirect("/login");
        }
        return null;
      },
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/price-list",
          element: <ListPrice />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/my-order",
          element: <MyOrder />,
        },
        {
          path: "/create-order",
          element: <CreateOrder />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      loader: () => {
        if (localStorage.accessToken) {
          return redirect("/");
        }
        return null;
      },
    },
    {
      path: "/register",
      element: <Register />,
      loader: () => {
        if (localStorage.accessToken) {
          return redirect("/");
        }
        return null;
      },
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
