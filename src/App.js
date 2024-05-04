import './App.css';
import Header from './Components/Header';
import Job_page from './pages/Job_Page/index';
import Error_Page from './pages/Error_Page/Error_Page';
import { createBrowserRouter ,Outlet} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <Job_page/>
    </div>
  );
}
export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error_Page />,
    children:[
      {
        path:"/restaurant/:id",
        // element:<Job/>
      }
    ]
  },
]);

export default App;
