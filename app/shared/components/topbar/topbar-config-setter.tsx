'use client';

import { useEffect } from 'react';

import { TopbarConfig, useTopbar } from './topbar.context';

export function TopbarConfigSetter({ config }: { config: TopbarConfig }) {
  const { setConfig } = useTopbar();

  useEffect(() => {
    setConfig(config);
  }, [config, setConfig]);

  return null;
}
