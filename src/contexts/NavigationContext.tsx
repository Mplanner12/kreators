"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// It's good practice to define constants like VIEW_IDS in a shared place if used across multiple files.
// For now, we'll assume 'templatesLibrary' is the default.
export const DEFAULT_ACTIVE_VIEW_ID = "templatesLibrary";

interface NavigationContextType {
  activeViewId: string;
  setActiveViewId: Dispatch<SetStateAction<string>>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [activeViewId, setActiveViewId] = useState<string>(
    DEFAULT_ACTIVE_VIEW_ID
  );

  return (
    <NavigationContext.Provider value={{ activeViewId, setActiveViewId }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
