import React from "react";

const Dashboard: React.FC = () => {
    return (
        <div className="content-wrapper">
            <div className="card">
                <h2 className="page-title">Dashboard</h2>
                <p className="text-gray-600">
                    The dashboard is disabled during the auth-first phase. Once auth is wired, we’ll restore role-specific content.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
