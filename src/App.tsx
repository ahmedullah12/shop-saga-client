import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster/>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
