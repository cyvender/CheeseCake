import { useState } from "react";
import axios from "axios";
import toppingNames from "../components/ToppingNames";
import LivePreview from "../components/LivePreview";

const Order = () => {

    const [order, setOrder] = useState({
        name: '',
        email: '',
        base: '',
        toppings: [],
        specialRequest: '',
        quantity: 1,
        deliveryDate: ''
    });

    const onOrderChange = (e) => {
        const copy = { ...order };
        copy[e.target.name] = e.target.value;
        setOrder(copy);
    }

    const onToppingChange = e => {
        const copy = { ...order };
        if (copy.toppings.includes(e.target.value)) {
            copy.toppings = copy.toppings.filter(t => t !== e.target.value);
        } else {
            copy.toppings.push(e.target.value);
        }
        setOrder(copy);
    }

    const onSubmitClick = async () => {
        await axios.post('/api/cheesecake/addorder', { ...order, total: total, toppings: order.toppings.join(', ')})
        const clearAll = async () => {
            setOrder({
                name: '',
                email: '',
                base: '',
                toppings: [],
                specialRequest: '',
                quantity: 1,
                deliveryDate: ''
            })
        }
        await clearAll();
    }

    const { name, email, base, toppings, specialRequest, quantity, deliveryDate } = order;
    const fieldsFilled = name === '' || email === '' || base === '' || deliveryDate === '';
    let total = base !== '' ? 49.99 * quantity + 3.95 * toppings.length * quantity : 0;

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <h1 className="text-center my-4">Cheesecake Factory Order Form</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input name='name' value={name} onChange={onOrderChange} type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input name='email' value={email} onChange={onOrderChange} type="email" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Cheesecake Base Flavor ($49.99)</label>
                        <select name='base' value={base} onChange={onOrderChange} className="form-select">
                            <option value='' >Choose...</option>
                            <option>Classic</option>
                            <option>Chocolate</option>
                            <option>Red Velvet</option>
                            <option>Brownie</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Toppings (each topping adds an additional $3.95)
                        </label>
                        {toppingNames.map((t, index) =>
                            <div key={index} className='form-check'>
                                <input checked={toppings.includes(t)} name='toppings' value={t} onChange={onToppingChange} className="form-check-input" type='checkbox' />
                                <label className="form-check-label">{t}</label>
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Special Requests</label>
                        <textarea name='specialRequest' value={specialRequest} onChange={onOrderChange} className="form-control" rows="3"></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quantity</label>
                        <input name='quantity' value={quantity} onChange={onOrderChange} type="number" className="form-control" min="1" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Delivery Date</label>
                        <input name='deliveryDate' value={deliveryDate} onChange={onOrderChange} type="date" className="form-control" />
                    </div>
                    <button disabled={fieldsFilled} onClick={onSubmitClick} type="submit" className="btn btn-primary">
                        Submit Order
                    </button>
                </div>
                <LivePreview order={order} total={total} />
            </div>
        </div>
    )
}

export default Order;