import "./App.css";
import {Routes,Route} from "react-router-dom"
import Doashboard from "./pages/admin-doashboard/doashboard";
import { Toaster } from 'react-hot-toast';

function App() {
 
  return (
    <div className="h-screen w-full">
      <Toaster /> 
     <Routes>
      <Route path="/:category" element={<Doashboard/>}/>
     </Routes>
    </div>
  );
}

export default App;
