const FeatureCard = ({ icon, title, text }) => (
  <div className="bg-white border-2 border-border rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
    <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-3 text-brand">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-text-secondary">{text}</p>
  </div>
);

export default FeatureCard;