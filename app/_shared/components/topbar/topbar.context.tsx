'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

export type TopbarConfig = {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
};

type TopbarContextType = {
  config: TopbarConfig;
  setConfig: (config: TopbarConfig) => void;
};

export const TopbarContext = createContext<TopbarContextType>({
  config: {},
  setConfig: () => {},
});

export const useTopbar = () => useContext(TopbarContext);

export const TopbarProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<TopbarConfig>({});

  return <TopbarContext.Provider value={{ config, setConfig }}>{children}</TopbarContext.Provider>;
};
