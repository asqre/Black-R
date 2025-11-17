import React, { useState, useEffect } from "react";
import { MdSearch, MdEdit, MdDelete, MdBlock, MdCheckCircle } from "react-icons/md";
import "./AdminModules.css";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("all");

    useEffect(() => {
        // Fetch users from API
        // Mock data for now
        setUsers([
            {
                id: 1,
                name: "John Doe",
                email: "john@example.com",
                role: "customer",
                status: "active",
                joinDate: "2024-01-10",
                ordersCount: 5,
            },
            {
                id: 2,
                name: "Jane Smith",
                email: "jane@example.com",
                role: "customer",
                status: "active",
                joinDate: "2024-01-08",
                ordersCount: 12,
            },
            {
                id: 3,
                name: "Admin User",
                email: "admin@example.com",
                role: "admin",
                status: "active",
                joinDate: "2023-12-01",
                ordersCount: 0,
            },
            {
                id: 4,
                name: "Bob Johnson",
                email: "bob@example.com",
                role: "customer",
                status: "blocked",
                joinDate: "2024-01-05",
                ordersCount: 2,
            },
        ]);
    }, []);

    const handleStatusChange = (userId, newStatus) => {
        setUsers(users.map(user =>
            user.id === userId ? { ...user, status: newStatus } : user
        ));
    };

    const handleRoleChange = (userId, newRole) => {
        setUsers(users.map(user =>
            user.id === userId ? { ...user, role: newRole } : user
        ));
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter(u => u.id !== userId));
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterRole === "all" || user.role === filterRole;
        return matchesSearch && matchesFilter;
    });

    const getStatusBadge = (status) => {
        return status === "active" ? (
            <span className="badge success">Active</span>
        ) : (
            <span className="badge danger">Blocked</span>
        );
    };

    const getRoleBadge = (role) => {
        return role === "admin" ? (
            <span className="badge info">Admin</span>
        ) : (
            <span className="badge default">Customer</span>
        );
    };

    return (
        <div className="admin-module">
            <div className="module-header">
                <h1>User Management</h1>
                <p>Manage user accounts and permissions</p>
            </div>

            <div className="module-toolbar">
                <div className="search-box">
                    <MdSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-box">
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="customer">Customer</option>
                    </select>
                </div>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Orders</th>
                            <th>Join Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{getRoleBadge(user.role)}</td>
                                <td>{getStatusBadge(user.status)}</td>
                                <td>{user.ordersCount}</td>
                                <td>{user.joinDate}</td>
                                <td>
                                    <div className="action-buttons">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            className="role-select"
                                        >
                                            <option value="customer">Customer</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        {user.status === "active" ? (
                                            <button
                                                className="btn-icon warning"
                                                onClick={() => handleStatusChange(user.id, "blocked")}
                                                title="Block User"
                                            >
                                                <MdBlock />
                                            </button>
                                        ) : (
                                            <button
                                                className="btn-icon success"
                                                onClick={() => handleStatusChange(user.id, "active")}
                                                title="Unblock User"
                                            >
                                                <MdCheckCircle />
                                            </button>
                                        )}
                                        <button
                                            className="btn-icon"
                                            onClick={() => alert(`Edit user ${user.name}`)}
                                            title="Edit"
                                        >
                                            <MdEdit />
                                        </button>
                                        <button
                                            className="btn-icon danger"
                                            onClick={() => handleDeleteUser(user.id)}
                                            title="Delete"
                                        >
                                            <MdDelete />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredUsers.length === 0 && (
                <div className="empty-state">
                    <p>No users found</p>
                </div>
            )}
        </div>
    );
};

export default Users;

