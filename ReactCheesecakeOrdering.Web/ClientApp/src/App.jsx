import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './Pages/Home';
import Order from './Pages/Order';
import ViewOrders from './Pages/ViewOrders'
import OrderDetails from './Pages/OrderDetails';

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/order' element={<Order />} />
                <Route path='/vieworders' element={<ViewOrders />} />
                <Route path='/OrderDetails/:orderId' element={<OrderDetails/>} />
            </Routes>
        </Layout>
    );
}

export default App;