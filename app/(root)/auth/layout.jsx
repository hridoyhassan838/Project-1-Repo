const Layout = ({ children }) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center p-4 bg-gray-50">
      {children}
    </div>
  );
};

export default Layout;