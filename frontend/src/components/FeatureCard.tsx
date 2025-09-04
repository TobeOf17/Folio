import React from "react";

type FeatureCardProps = {
    icon: React.ReactNode;
    title: string;
    text: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, text }) => {
    return (
        <div className="card feature-card soft">
            {icon}
            <h3 className="card-title">{title}</h3>
            <p className="card-text">{text}</p>
        </div>
    );
};

export default FeatureCard;
