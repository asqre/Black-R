import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
    MdDashboard, 
    MdShoppingCart, 
    MdInventory, 
    MdCategory,
    MdPeople,
    MdLogout,
    MdMenu,
    MdClose
} from "react-icons/md";
import "./AdminLayout.css";

const AdminLayout = () => {
    // Start with sidebar closed on mobile, open on desktop
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
    const navigate = useNavigate();
    const location = useLocation();


    // Close sidebar on mobile when clicking overlay
    const handleOverlayClick = () => {
        if (window.innerWidth <= 768) {
            setSidebarOpen(false);
        }
    };

    // Close sidebar on mobile when navigating
    const handleNavClick = () => {
        if (window.innerWidth <= 768) {
            setSidebarOpen(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        navigate('/login');
    };

    const menuItems = [
        { path: '/admin/dashboard', icon: MdDashboard, label: 'Dashboard' },
        { path: '/admin/orders', icon: MdShoppingCart, label: 'Orders' },
        { path: '/admin/products', icon: MdInventory, label: 'Products' },
        { path: '/admin/categories', icon: MdCategory, label: 'Categories' },
        { path: '/admin/users', icon: MdPeople, label: 'User Management' },
    ];

    // Track mobile state
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Update mobile state on resize
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (mobile) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="admin-layout">
            {/* Mobile Overlay - Only show on mobile when sidebar is open */}
            {isMobile && sidebarOpen && (
                <div 
                    className="sidebar-overlay active"
                    onClick={handleOverlayClick}
                />
            )}

            {/* Sidebar */}
            <div className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <h2>Admin Panel</h2>
                    <button 
                        className="sidebar-toggle"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? <MdClose /> : <MdMenu />}
                    </button>
                </div>
                <nav className="sidebar-nav">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-item ${isActive ? 'active' : ''}`}
                                onClick={handleNavClick}
                            >
                                <Icon className="nav-icon" />
                                {sidebarOpen && <span className="nav-label">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <MdLogout className="nav-icon" />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="admin-main">
                {/* Mobile Menu Button - Show on mobile when sidebar is closed */}
                {isMobile && !sidebarOpen && (
                    <button 
                        className="mobile-menu-btn"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open menu"
                    >
                        <MdMenu />
                    </button>
                )}
                <div className="admin-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;

