import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../src/pages/Home";
import Todo from "../src/pages/Todo";
const router = createBrowserRouter([
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/todo",
        element: <Todo />,
      },
      {
        path: "*",
        element: <div>404 - Sahifa topilmadi</div>,
      },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
