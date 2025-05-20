import React, { useState } from 'react';

function UpdateDeleteUsers() {
    const [users, setUsers] = useState([
        { id: 1, name: 'Alice Johnson' },
        { id: 2, name: 'Bob Smith' },
    ]);

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
        alert(`User with ID ${id} deleted.`);
    };

    const handleUpdate = (id) => {
        const newName = prompt('Enter new name:');
        if (newName) {
            setUsers(users.map(user => user.id === id ? { ...user, name: newName } : user));
        }
    };

    return React.createElement(
        'div',
        { style: styles.container },
        React.createElement('h2', { style: styles.header }, 'Update / Delete Users'),
        ...users.map(user =>
            React.createElement(
                'div',
                { key: user.id, style: styles.userCard },
                React.createElement('span', {}, `ID: ${user.id} | Name: ${user.name}`),
                React.createElement(
                    'div',
                    {},
                    React.createElement('button', {
                        style: styles.updateButton,
                        onClick: () => handleUpdate(user.id)
                    }, 'Update'),
                    React.createElement('button', {
                        style: styles.deleteButton,
                        onClick: () => handleDelete(user.id)
                    }, 'Delete')
                )
            )
        )
    );
}

const styles = {
    container: {
        padding: '30px',
        maxWidth: '600px',
        margin: '0 auto',
    },
    header: {
        fontSize: '24px',
        marginBottom: '20px',
        textAlign: 'center',
    },
    userCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginBottom: '10px',
        boxShadow: '0px 2px 6px rgba(0,0,0,0.05)',
    },
    updateButton: {
        marginRight: '10px',
        padding: '8px 12px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    deleteButton: {
        padding: '8px 12px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default UpdateDeleteUsers;
