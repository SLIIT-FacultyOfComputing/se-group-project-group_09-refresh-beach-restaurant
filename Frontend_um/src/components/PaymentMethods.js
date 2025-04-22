import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import mastercardLogo from '../assets/images/mastercard.png'; // Add your image files to assets folder
import visaLogo from '../assets/images/visa.png';

function PaymentMethods() {

    const { userId } = useParams();

    const [savedCards, setSavedCards] = useState([
        { id: 1, type: 'MasterCard', number: '**** **** **** 1234', expiry: 'MM/YY', logo: mastercardLogo },
        { id: 2, type: 'Visa', number: '**** **** **** 1234', expiry: 'MM/YY', logo: visaLogo },
    ]);

    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleRemove = (id) => {
        setSavedCards(savedCards.filter(card => card.id !== id));
    };

    const handleSave = (e) => {
        e.preventDefault();
        alert('Payment method saved successfully!');
        // Clear form after save
        setCardName('');
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Payment Method</h2>

            <div>
                <h4>Saved cards</h4>
                {savedCards.map(card => (
                    <div key={card.id} style={styles.cardBox}>
                        <img src={card.logo} alt={card.type} style={styles.cardLogo} />
                        <div style={styles.cardInfo}>
                            <span>{card.number}</span>
                            <span>{card.expiry}</span>
                        </div>
                        <button style={styles.removeBtn} onClick={() => handleRemove(card.id)}>
                            remove card
                        </button>
                    </div>
                ))}
            </div>

            <div>
                <h4>Add new card</h4>
                <form onSubmit={handleSave} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Card number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Expiry Date(MM/YY)"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="CVV"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <button type="submit" style={styles.saveBtn}>
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        fontFamily: 'sans-serif',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    cardBox: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
    },
    cardLogo: {
        width: '50px',
        marginRight: '15px',
    },
    cardInfo: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    removeBtn: {
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '10px',
        padding: '5px 10px',
        color: '#FFFFFF',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    form: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    input: {
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid #ccc',
        fontSize: '14px',
    },
    saveBtn: {
        marginTop: '10px',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '10px',
        padding: '10px',
        color: '#FFFFFF',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '16px',
        boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)',
    },
};

export default PaymentMethods;
