import React from 'react';
import Drawer from '../drawer';
import Mainshop from '../mainshop';

const Shop = () => {
    return (
        <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
            <Drawer/>
            <Mainshop/>
        </div>
    );
}

export default Shop;
