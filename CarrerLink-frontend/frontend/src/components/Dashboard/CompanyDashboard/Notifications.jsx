import React, { useState, useEffect, useContext } from 'react';
import { Client } from '@stomp/stompjs';
import { AuthContext } from '../../../api/AuthProvider';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!user?.id) return;

        // Fetch existing notifications
        fetch(`/api/notifications/${user.id}`)
            .then(res => res.json())
            .then(data => {
                setNotifications(data);
                setUnreadCount(data.filter(n => !n.isRead).length);
            });

        // WebSocket connection
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            onConnect: () => {
                client.subscribe(`/user/queue/notifications`, (message) => {
                    const newNotification = JSON.parse(message.body);
                    setNotifications(prev => [newNotification, ...prev]);
                    setUnreadCount(prev => prev + 1);
                });
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
        });

        client.activate();
        return () => client.deactivate();
    }, [user?.id]);

    const handleMarkAsRead = async (id) => {
        await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' });
        setNotifications(prev =>
            prev.map(n => n.id === id ? {...n, isRead: true} : n)
        );
        setUnreadCount(prev => prev - 1);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 relative hover:bg-gray-100 rounded-full"
            >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white
                        text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg
                    border border-gray-200 z-50">
                    <div className="p-4 font-semibold border-b">Notifications</div>
                    <div className="max-h-64 overflow-y-auto">
                        {notifications.map(notification => (
                            <div key={notification.id}
                                 className={`p-4 border-b hover:bg-gray-50 cursor-pointer
                                    ${!notification.isRead ? 'bg-blue-50' : ''}`}
                                 onClick={() => handleMarkAsRead(notification.id)}
                            >
                                <p className="text-sm">{notification.message}</p>
                                <time className="text-xs text-gray-500">
                                    {new Date(notification.createdAt).toLocaleString()}
                                </time>
                            </div>
                        ))}
                        {notifications.length === 0 && (
                            <p className="p-4 text-gray-500 text-sm">No notifications</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notifications;