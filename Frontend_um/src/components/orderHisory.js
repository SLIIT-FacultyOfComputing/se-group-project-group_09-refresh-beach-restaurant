import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const OrderHistory = () => {
    const { userId } = useParams();

    // Example orders matching your mockup (with images, names, totals, statuses & dates)
    const exampleOrders = [
        {
            id: 101,
            item: 'STIR-FRY RICE',
            date: '2025-04-15',
            total: 1200,
            status: 'Delivered',
            image: '/images/fried-rice.jpg',
        },
        {
            id: 102,
            item: 'CHICKEN BURGER',
            date: '2025-04-10',
            total: 950,
            status: 'Canceled',
            image: '/images/burger.jpg',
        },
        {
            id: 103,
            item: 'SEAFOOD PLATTER',
            date: '2025-04-17',
            total: 2200,
            status: 'Delivered',
            image: '/images/seafood.jpg',
        },
        {
            id: 104,
            item: 'VEG NOODLES',
            date: '2025-04-17',
            total: 700,
            status: 'Pending',
            image: '/images/noodles.jpg',
        },
    ];

    const [orders] = useState(exampleOrders);
    const [filtered, setFiltered] = useState(exampleOrders);
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        let list = orders;
        if (date) list = list.filter(o => o.date === date);
        if (status) list = list.filter(o => o.status === status);
        setFiltered(list);
    }, [date, status, orders]);

    const statusColor = {
        Delivered: '#4CAF50',
        Pending:   '#FFC107',
        Canceled:  '#F44336',
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Order History</h2>

            <div style={styles.filters}>
                <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    style={styles.dateInput}
                />

                <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    style={styles.select}
                >
                    <option value="">All Statuses</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Pending">Pending</option>
                    <option value="Canceled">Canceled</option>
                </select>
            </div>

            {filtered.length === 0
                ? <p style={styles.noOrders}>No orders match your filters.</p>
                : filtered.map(order => (
                    <div key={order.id} style={styles.card}>
                        <img src={order.image} alt={order.item} style={styles.thumbnail} />

                        <div style={styles.info}>
                            <h3 style={styles.item}>{order.item}</h3>
                            <p style={styles.meta}>Order #{order.id} • {order.date}</p>
                        </div>

                        <div style={styles.right}>
              <span
                  style={{
                      ...styles.status,
                      backgroundColor: statusColor[order.status] || '#999'
                  }}
              >
                {order.status}
              </span>
                            <p style={styles.total}>Rs. {order.total}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

const styles = {
    container: {
        maxWidth: 800,
        margin: '0 auto',
        padding: 20,
        fontFamily: 'sans-serif',
    },
    heading: {
        textAlign: 'center',
        marginBottom: 20,
    },
    filters: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: 20,
    },
    dateInput: {
        padding: '8px',
        borderRadius: 5,
        border: '1px solid #ccc',
    },
    select: {
        padding: '8px',
        borderRadius: 5,
        border: '1px solid #ccc',
    },
    noOrders: {
        textAlign: 'center',
        color: '#555',
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        marginBottom: 15,
        padding: 15,
    },
    thumbnail: {
        width: 64,
        height: 64,
        borderRadius: 8,
        objectFit: 'cover',
        marginRight: 15,
    },
    info: {
        flex: 1,
    },
    item: {
        margin: 0,
        fontSize: '1rem',
        fontWeight: '600',
    },
    meta: {
        margin: '4px 0 0',
        color: '#777',
        fontSize: '0.875rem',
    },
    right: {
        textAlign: 'right',
    },
    status: {
        display: 'inline-block',
        padding: '4px 8px',
        borderRadius: 12,
        color: '#fff',
        fontSize: '0.75rem',
        marginBottom: 8,
    },
    total: {
        margin: 0,
        fontWeight: '600',
    },
};

export default OrderHistory;
