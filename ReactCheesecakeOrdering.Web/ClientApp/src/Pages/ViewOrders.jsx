import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewOrders = () => {

    const [orders, setOrders] = useState([])

    useEffect(() => {

        const getOrders = async () => {
            const { data } = await axios.get('/api/cheesecake/getorders');
            setOrders(data)
        }

        getOrders();

    }, [])
    console.log(orders)

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="d-flex justify-content-center">
                <table className="table text-center shadow-lg" style={{ borderCollapse: 'separate', borderSpacing: '0px 15px', maxWidth: '80%' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'rgb(33, 37, 41)', color: 'white', borderRadius: '15px' }} >
                            <th>Name/Email</th>
                            <th>Base Flavor</th>
                            <th>Toppings</th>
                            <th>Special Requests</th>
                            <th>Quantity</th>
                            <th>Delivery Date</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(o =>
                            <tr key={o.id} style={{ backgroundColor: 'rgb(248, 249, 250)', borderRadius: '15px' }} >
                                <td>
                                    <Link to={`/orderdetails/${o.id}`}>
                                        {o.name} - {o.email}
                                    </Link>
                                </td>
                                <td>{o.base}</td>
                                <td>{o.toppings}</td>
                                <td>{o.specialRequest}</td>
                                <td>{o.quantity}</td>
                                <td>{o.deliveryDate}</td>
                                <td>${o.total}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewOrders;