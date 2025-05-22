import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import dayjs from "dayjs";

const OrderDetails = () => {

    const [order, setOrder] = useState({})

    const { orderId } = useParams();

    useEffect(() => {

        const getOrder = async () => {
            const { data } = await axios.get(`/api/cheesecake/getorder?orderId=${orderId}`);
            setOrder(data)
        }

        getOrder();

    }, [])

    const {name, email, base, toppings, specialRequest, quantity, deliveryDate, total } = order;

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
                <div className="card text-center shadow p-3 mb-5 bg-body rounded" style={{ width: '30rem', backgroundColor: 'rgb(248, 249, 250)' }}>
                    <div className="card-body">
                        <h3 className="card-title fw-bold">{name}</h3>
                        <p className="card-text fs-5">{email}</p>
                        <p className="card-text fs-5">{base}</p>
                        <p className="card-text fs-5">{toppings}</p>
                        <p className="card-text fs-5">{specialRequest}</p>
                        <p className="card-text fs-5">{quantity}</p>
                        <p className="card-text fs-5">{dayjs(deliveryDate).format("MM/DD/YYYY")}</p>
                        <p className="card-text fs-5">${total}</p>
                    </div>
                    <Link to='/vieworders'>
                        <button className="btn btn-primary w-100">Back to Orders</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails;

