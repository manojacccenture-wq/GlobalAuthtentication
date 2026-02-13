const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-2">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gray-500 text-center mb-6">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
