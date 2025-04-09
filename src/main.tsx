import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Team from './components/Team.tsx';
import FAQ from './components/FAQ.tsx';
import EventPage from './components/EventPage.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/team",
    element: <Team/>,
  },
  {
    path: "/events",
    element: <EventPage/> 
  }
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>,
)
