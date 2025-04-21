import React, { useState } from 'react';

const EditAddress = () => {
    // Mocked default address
    const defaultAddress = {
        name: 'BSKJ Perera',
        line1: '23, abcd road',
        city: 'Colombo'
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        province: '',
        postalCode: '',
        phone: '',
        setAsDefault: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleAddAddress = () => {
        alert("Address added (mocked). You can hook this up to backend later.");
        console.log(formData);
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftSection}>
                <h4>Default Address</h4>
                <div style={styles.defaultAddress}>
                    <p><strong>{defaultAddress.name}</strong></p>
                    <p>{defaultAddress.line1}</p>
                    <p>{defaultAddress.city}</p>
                </div>
            </div>

            <div style={styles.rightSection}>
                <h3>Add a New Address</h3>
                <div style={styles.form}>
                    <input
                        style={styles.input}
                        placeholder="First name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <input
                        style={styles.input}
                        placeholder="Last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <input
                        style={styles.input}
                        placeholder="Address-line 1"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleChange}
                    />
                    <input
                        style={styles.input}
                        placeholder="Address-line 2"
                        name="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleChange}
                    />
                    <input
                        style={styles.input}
                        placeholder="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    <input
                        style={styles.input}
                        placeholder="Province"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                    />
                    <input
                        style={styles.input}
                        placeholder="Postal/Zip code"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                    />
                    <input
                        style={styles.input}
                        placeholder="Phone number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <div style={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            name="setAsDefault"
                            checked={formData.setAsDefault}
                            onChange={handleChange}
                        />
                        <label style={{ marginLeft: 8 }}>Set as default address</label>
                    </div>
                    <button style={styles.addButton} onClick={handleAddAddress}>Add Address</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 20,
        gap: '20px',
    },
    leftSection: {
        width: '45%',
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
    },
    rightSection: {
        width: '50%',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        backgroundColor: '#f9f9f9',
    },
    defaultAddress: {
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '5px',
        marginTop: '10px',
        border: '1px solid #ddd'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    checkboxContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    addButton: {
        marginTop: '10px',
        padding: '10px 0',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default EditAddress;