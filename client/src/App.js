import { AppRoutes } from './routes/route';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const routes=AppRoutes();
const router = createBrowserRouter(routes);


function App() {
  return<RouterProvider router={router} />
}

export default App;
