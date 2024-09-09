import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/admin/bookings');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error('Fetch bookings error:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/admin/users');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Fetch users error:', error);
            }
        };

        fetchBookings();
        fetchUsers();
    }, []);

    const handleDeleteBooking = async (bookingId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/admin/bookings/${bookingId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Network response was not ok');
            setBookings(bookings.filter(booking => booking.id !== bookingId));
        } catch (error) {
            console.error('Delete booking error:', error);
        }
    };

    const handleUpdateBooking = async (bookingId, updatedData) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/admin/bookings/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setBookings(bookings.map(booking => booking.id === bookingId ? { ...booking, ...data } : booking));
        } catch (error) {
            console.error('Update booking error:', error);
        }
    };

    const handleAddBooking = async (newBooking) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/admin/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBooking),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setBookings([...bookings, data]);
        } catch (error) {
            console.error('Add booking error:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Bookings</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {bookings.map(booking => (
                        <div key={booking.id} className="bg-white p-4 rounded-lg shadow-md">
                            <div className="text-lg font-semibold">ID: {booking.id}</div>
                            <div>Status: {booking.status}</div>
                            <button 
                                onClick={() => handleDeleteBooking(booking.id)} 
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                            {/* Implement update form here */}
                        </div>
                    ))}
                </div>
            </section>
            
            <section>
                <h2 className="text-2xl font-semibold mb-2">Users</h2>
                <div className="mb-4">
                    <p className="text-lg">Total Users: {users.length}</p>
                    <button 
                        onClick={() => setShowUsers(!showUsers)}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {showUsers ? 'Hide Users' : 'Show Users'}
                    </button>
                </div>
                {showUsers && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {users.map(user => (
                            <div key={user.id} className="bg-white p-4 rounded-lg shadow-md">
                                <div className="text-lg font-semibold">Username: {user.username}</div>
                                <div>Email: {user.email}</div>
                                <div>Phone Number: {user.phone_number} </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            
            {/* Implement add booking form here */}
        </div>
    );
};

export default AdminDashboard;
