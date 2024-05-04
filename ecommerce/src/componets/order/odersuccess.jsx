import React from 'react';
import { FaRegSmileWink } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { selectUser } from "../../redux/auth/reducers/authReducer";
import { useSelector } from 'react-redux';

const Odersuccess = () => {
    const user = useSelector(selectUser);
    return (
        <div className="container flex flex-col justify-center items-center font-bold text-center mt-6 mx-auto p-6 px-12 h-64 py-26 bg-gradient-to-br to-green-100 rounded-lg shadow-lg">
            <div className='text-green-700 text-3xl font-semibold mb-4 animate-pulse'>
          Thanks  {user !== "" && user && (user.username)} order has been placed successfully!
            </div>
            <div className="animate-bounce">
                <FaRegSmileWink size={96} color='red'/>
            </div>
            <div className='mt-6'>
                <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-white font-semibold rounded-xl transition duration-300 animate-bounce">
                    <Link to="/shop">Back to shop</Link> 
                </button>
            </div>
        </div>
    );
}

export default Odersuccess;
