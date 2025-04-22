import React, { useState } from 'react';

function AddNewUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`User "${name}" added successfully!`);
        setName('');
        setEmail('');
    };

    return React.createElement(
        'div',
        { style: styles.container },
        React.createElement('h2', { style: styles.header }, 'Add New User'),
        React.createElement(
            'form',
            { onSubmit: handleSubmit, style: styles.form },
            React.createElement('label', { style: styles.label }, 'Name:'),
            React.createElement('input', {
                type: 'text',
                value: name,
                onChange: (e) => setName(e.target.value),
                style: styles.input,
                required: true,
            }),
            React.createElement('label', { style: styles.label }, 'Email:'),
            React.createElement('input', {
                type: 'email',
                value: email,
                onChange: (e) => setEmail(e.target.value),
                style: styles.input,
                required: true,
            }),
            React.createElement(
                'button',
                { type: 'submit', style: styles.button },
                'Add User'
            )
        )
    );
}

const styles = {
    container: {
        padding: '30px',
        maxWidth: '500px',
        margin: '0 auto',
    },
    header: {
        fontSize: '24px',
        marginBottom: '20px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    button: {
        padding: '12px',
        backgroundColor: '#28a745',
        color: '#fff',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default AddNewUser;
