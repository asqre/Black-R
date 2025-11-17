import React, { useState, useEffect } from "react";
import { MdSearch, MdFilterList, MdEdit, MdDelete } from "react-icons/md";
import "./AdminModules.css";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    useEffect(() => {
        // Fetch orders from API
        // Mock data for now
        setOrders([
            {
                id: "ORD-001",
                customer: "John Doe",
                email: "john@example.com",
                product: "R-001 TWS",
                quantity: 1,
                amount: 1999,
                status: "delivered",
                date: "2024-01-15",
            },
            {
                id: "ORD-002",
                customer: "Jane Smith",
                email: "jane@example.com",
                product: "R-003 TWS",
                quantity: 2,
                amount: 4998,
                status: "pending",
                date: "2024-01-14",
            },
            {
                id: "ORD-003",
                customer: "Bob Johnson",
                email: "bob@example.com",
                product: "85W Dash Charger",
                quantity: 1,
                amount: 1299,
                status: "processing",
                date: "2024-01-13",
            },
            {
                id: "ORD-004",
                customer: "Alice Brown",
                email: "alice@example.com",
                product: "100W Type C Cable",
                quantity: 3,
                amount: 2397,
                status: "cancelled",
                date: "2024-01-12",
            },
        ]);
    }, []);

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.product.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "all" || order.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusBadge = (status) => {
        const statusMap = {
            delivered: { class: "success", label: "Delivered" },
            pending: { class: "warning", label: "Pending" },
            processing: { class: "info", label: "Processing" },
            cancelled: { class: "danger", label: "Cancelled" },
        };
        const statusInfo = statusMap[status] || { class: "default", label: status };
        return <span className={`badge ${statusInfo.class}`}>{statusInfo.label}</span>;
    };

    return (
        <div className="admin-module">
            <div className="module-header">
                <h1>Orders Management</h1>
                <p>Manage and track all customer orders</p>
            </div>

            <div className="module-toolbar">
                <div className="search-box">
                    <MdSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-box">
                    <MdFilterList className="filter-icon" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customer}</td>
                                <td>{order.email}</td>
                                <td>{order.product}</td>
                                <td>{order.quantity}</td>
                                <td>₹{order.amount.toLocaleString()}</td>
                                <td>{getStatusBadge(order.status)}</td>
                                <td>{order.date}</td>
                                <td>
                                    <div className="action-buttons">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className="status-select"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                        <button className="btn-icon" title="View Details">
                                            <MdEdit />
                                        </button>
                                        <button className="btn-icon danger" title="Delete">
                                            <MdDelete />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredOrders.length === 0 && (
                <div className="empty-state">
                    <p>No orders found</p>
                </div>
            )}
        </div>
    );
};

export default Orders;

