import "./App.css";
import {Routes,Route,useNavigate} from "react-router-dom"
import Doashboard from "./pages/admin-doashboard/doashboard";
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';

function App() {
  const navigate = useNavigate()
  useEffect(()=>{
      navigate('/admin-dashboard/productimage')
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className="h-screen w-full">
      <Toaster /> 
     <Routes>
      <Route path="/admin-dashboard/:category" element={<Doashboard/>}/>
     </Routes>
    </div>
  );
}

export default App;
