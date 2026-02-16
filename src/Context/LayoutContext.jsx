import { createContext, useContext, useState } from "react";

const LayoutContext = createContext(null);

export const LayoutProvider = ({ children }) => {
  const [layout, setLayout] = useState({
    header: true,
    sidebar: true,
    footer: false,
    theme: "light",
  });

  const toggleSidebar = () =>
    setLayout(prev => ({ ...prev, sidebar: !prev.sidebar }));

  const setLayoutVisibility = (config) =>
    setLayout(prev => ({ ...prev, ...config }));

  return (
    <LayoutContext.Provider
      value={{ layout, toggleSidebar, setLayoutVisibility }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used inside LayoutProvider");
  }
  return context;
};
