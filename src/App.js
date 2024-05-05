import './App.css';
import Job_page from './pages/Job_Page/index';
import Error_Page from './pages/Error_Page/Error_Page';
import { createBrowserRouter ,Outlet} from 'react-router-dom';

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Job_page/>,
    errorElement: <Error_Page />,
  },
]);

