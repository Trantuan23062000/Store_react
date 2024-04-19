import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./componets/layout/home";
import Navbar from "./componets/navbar";
import Footer from "./componets/footer";
import Copy from "./componets/copy";
import Shop from "./componets/layout/shop";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1">
          <div className="flex-1 flex flex-col bg-gray-100 w-full">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/shop" element={<Shop />} />
            </Routes>
          </div>
        </div>
        <Footer />
        <Copy />
      </div>
    </Router>
  );
}

export default App;
