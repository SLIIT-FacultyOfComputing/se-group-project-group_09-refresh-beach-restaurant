import React from 'react';

function ViewAllUsers() {
    const users = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
    ];

    return React.createElement(
        'div',
        { style: styles.container },
        React.createElement('h2', { style: styles.header }, 'All Registered Users'),
        React.createElement(
            'table',
            { style: styles.table },
            React.createElement(
                'thead',
                {},
                React.createElement(
                    'tr',
                    {},
                    React.createElement('th', { style: styles.th }, 'ID'),
                    React.createElement('th', { style: styles.th }, 'Name'),
                    React.createElement('th', { style: styles.th }, 'Email')
                )
            ),
            React.createElement(
                'tbody',
                {},
                users.map(user =>
                    React.createElement(
                        'tr',
                        { key: user.id },
                        React.createElement('td', { style: styles.td }, user.id),
                        React.createElement('td', { style: styles.td }, user.name),
                        React.createElement('td', { style: styles.td }, user.email)
                    )
                )
            )
        )
    );
}

const styles = {
    container: {
        padding: '30px',
        maxWidth: '800px',
        margin: '0 auto',
    },
    header: {
        fontSize: '24px',
        marginBottom: '20px',
        textAlign: 'center',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        backgroundColor: '#f0f0f0',
        padding: '10px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    },
    td: {
        padding: '10px',
        borderBottom: '1px solid #eee',
    },
};

export default ViewAllUsers;
