import React, { useState } from 'react';

const NotificationToggle = ({ title, description, isEnabled, onToggle, highlight }) => {
    const toggleStyle = {
        padding: '15px',
        marginBottom: '15px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: highlight ? '#e6f2ff' : '#f0f0f0',
        border: highlight ? '1px solid #cce5ff' : 'none',
    };

    const textContainerStyle = {
        flex: 1,
    };

    const titleStyle = {
        fontWeight: 'bold',
        fontSize: '16px',
        margin: '0 0 5px 0',
    };

    const descriptionStyle = {
        color: '#666',
        fontSize: '14px',
        margin: 0,
    };

    const switchContainerStyle = {
        position: 'relative',
        display: 'inline-block',
        width: '60px',
        height: '30px',
    };

    const inputStyle = {
        opacity: 0,
        width: 0,
        height: 0,
    };

    const sliderStyle = {
        position: 'absolute',
        cursor: 'pointer',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isEnabled ? '#007bff' : '#ccc',
        transition: '0.4s',
        borderRadius: '34px',
    };

    const sliderBeforeStyle = {
        position: 'absolute',
        content: '""',
        height: '22px',
        width: '22px',
        left: isEnabled ? '34px' : '4px',
        bottom: '4px',
        backgroundColor: 'white',
        transition: '0.4s',
        borderRadius: '50%',
    };

    return (
        <div style={toggleStyle}>
            <div style={textContainerStyle}>
                <h3 style={titleStyle}>{title}</h3>
                <p style={descriptionStyle}>{description}</p>
            </div>
            <label style={switchContainerStyle}>
                <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={onToggle}
                    style={inputStyle}
                />
                <span style={sliderStyle}>
          <span style={sliderBeforeStyle}></span>
        </span>
            </label>
        </div>
    );
};

const NotificationPreferences = () => {
    const [expanded, setExpanded] = useState(false);
    const [preferences, setPreferences] = useState({
        orderUpdates: true,
        promotions: true,
        reservationReminders: true,
        menuUpdates: false,
        specialEvents: true
    });

    const handleToggle = (setting) => {
        setPreferences(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    const containerStyle = {
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        marginBottom: expanded ? '15px' : '0',
    };

    const titleStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        margin: 0,
    };

    const arrowStyle = {
        transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
        transition: 'transform 0.3s',
        fontSize: '18px',
    };

    const contentStyle = {
        display: expanded ? 'block' : 'none',
    };

    const descriptionStyle = {
        color: '#666',
        marginBottom: '15px',
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle} onClick={() => setExpanded(!expanded)}>
                <h2 style={titleStyle}>Notification Preferences</h2>
                <span style={arrowStyle}>▼</span>
            </div>

            <div style={contentStyle}>
                <p style={descriptionStyle}>
                    Customize which types of notifications you receive to avoid unnecessary alerts.
                </p>

                <NotificationToggle
                    title="Order Updates"
                    description="Get notified about your order status and delivery updates"
                    isEnabled={preferences.orderUpdates}
                    onToggle={() => handleToggle('orderUpdates')}
                />

                <NotificationToggle
                    title="Promotional Offers"
                    description="Receive notifications about new deals, discounts, and special offers"
                    isEnabled={preferences.promotions}
                    onToggle={() => handleToggle('promotions')}
                    highlight={true}
                />

                <NotificationToggle
                    title="Reservation Reminders"
                    description="Get reminded about your upcoming reservations"
                    isEnabled={preferences.reservationReminders}
                    onToggle={() => handleToggle('reservationReminders')}
                />

                <NotificationToggle
                    title="Menu Updates"
                    description="Be the first to know when new items are added to the menu"
                    isEnabled={preferences.menuUpdates}
                    onToggle={() => handleToggle('menuUpdates')}
                />

                <NotificationToggle
                    title="Special Events"
                    description="Receive notifications about special events and gatherings"
                    isEnabled={preferences.specialEvents}
                    onToggle={() => handleToggle('specialEvents')}
                />
            </div>
        </div>
    );
};
export default NotificationPreferences;