import React, { useState, useEffect } from "react";
import { MdShoppingCart, MdInventory, MdPeople, MdAttachMoney } from "react-icons/md";
import "./AdminModules.css";

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0,
        totalRevenue: 0,
    });

    useEffect(() => {
        // Fetch dashboard stats from API
        // For now, using mock data
        setStats({
            totalOrders: 156,
            totalProducts: 45,
            totalUsers: 1234,
            totalRevenue: 245000,
        });
    }, []);

    const statCards = [
        {
            title: "Total Orders",
            value: stats.totalOrders,
            icon: MdShoppingCart,
            color: "#ea2127",
            change: "+12%",
        },
        {
            title: "Total Products",
            value: stats.totalProducts,
            icon: MdInventory,
            color: "#4CAF50",
            change: "+5%",
        },
        {
            title: "Total Users",
            value: stats.totalUsers,
            icon: MdPeople,
            color: "#2196F3",
            change: "+8%",
        },
        {
            title: "Total Revenue",
            value: `₹${stats.totalRevenue.toLocaleString()}`,
            icon: MdAttachMoney,
            color: "#FF9800",
            change: "+15%",
        },
    ];

    return (
        <div className="admin-module">
            <div className="module-header">
                <h1>Dashboard</h1>
                <p>Welcome to the admin dashboard</p>
            </div>

            <div className="stats-grid">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="stat-card">
                            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
                                <Icon style={{ color: stat.color }} />
                            </div>
                            <div className="stat-content">
                                <h3>{stat.title}</h3>
                                <p className="stat-value">{stat.value}</p>
                                <span className="stat-change positive">{stat.change}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="dashboard-content">
                <div className="dashboard-section">
                    <h2>Recent Orders</h2>
                    <div className="table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Product</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#ORD-001</td>
                                    <td>John Doe</td>
                                    <td>R-001 TWS</td>
                                    <td>₹1,999</td>
                                    <td><span className="badge success">Delivered</span></td>
                                    <td>2024-01-15</td>
                                </tr>
                                <tr>
                                    <td>#ORD-002</td>
                                    <td>Jane Smith</td>
                                    <td>R-003 TWS</td>
                                    <td>₹2,499</td>
                                    <td><span className="badge warning">Pending</span></td>
                                    <td>2024-01-14</td>
                                </tr>
                                <tr>
                                    <td>#ORD-003</td>
                                    <td>Bob Johnson</td>
                                    <td>85W Dash Charger</td>
                                    <td>₹1,299</td>
                                    <td><span className="badge info">Processing</span></td>
                                    <td>2024-01-13</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

