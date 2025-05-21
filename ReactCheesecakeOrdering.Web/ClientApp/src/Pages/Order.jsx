import { useState, useEffect } from "react";
import axios from "axios";

const toppingNames = [
    'Chocolate Chips',
    'Caramel Drizzle',
    'Whipped Cream',
    'Pecans',
    'Almonds',
    'Toasted Coconut',
    'Graham Cracker Crumble',
    'Cookie Dough',
    'Mint Chocolate Chips',
    'Caramelized Bananas',
    'Rainbow Sprinkles',
    'Powdered Sugar',
    'White Chocolate Shavings',
    'Peanut Butter Drizzle',
    'Dark Chocolate Drizzle'
]
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
    const [total, setTotal] = useState(0);

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

    useEffect(() => {
        if (order.base !== '') {
            setTotal((49.99 + (3.95 * order.toppings.length)) * quantity);
        }
        else {
            setTotal(0)
        }
        console.log(order.base)
    }, [order.toppings.length, order.base, order.quantity])

    const convertToString = () => {
        let toppingString = '';
        order.toppings.forEach((t, index) => {
            toppingString += ` ${t}`;
            if(index !== order.toppings.length - 1) {
                toppingString += ','
            }
        });

        return toppingString;
    }

    const onSubmitClick = async () => {
        await axios.post('/api/cheesecake/addorder', { ...order, total: total, toppings: convertToString() })
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
                                {/*  */}
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
                        {/*  */}
                        Submit Order
                    </button>
                </div>

                <div className="col-md-6 position-sticky" style={{ top: '2rem' }}>
                    <h2 className="mb-4">Live Preview</h2>
                    <div className="card" style={{ width: '18rem' }}>
                        <img src="/cheesecake.jpg" className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">Your Custom Cheesecake</h5>
                            <p className="card-text">{name} {email}</p>
                            <p className="card-text">Base: {base}</p>
                            <p className="card-text">Toppings:
                                {toppings.map((t, index) => ` ${t}${(index === toppings.length - 1) ? "" : ","}`)}
                            </p>
                            <p className="card-text">Special Requests: {specialRequest} </p>
                            <p className="card-text">Quantity: {quantity}</p>
                            <p className="card-text">Delivery Date: {deliveryDate}</p>
                            <p className="card-text fw-bold">Total: ${total.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;