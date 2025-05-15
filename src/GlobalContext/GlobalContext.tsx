import { createContext, useState } from "react";

type GlobalContextType = {
  selectedId: number | null;
  setSelectedId: (id: number) => void;
};

const GlobalContext = createContext<GlobalContextType>({
  selectedId: null,
  setSelectedId: () => {},
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <GlobalContext.Provider value={{ selectedId, setSelectedId }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
