import useScrollTrigger from '@mui/material/useScrollTrigger';
import { ReactElement, cloneElement } from 'react';

import Themes from 'enums/themes';

type ElevationScrollProps = {
  children: ReactElement;
  theme: Themes;
};

export default function ElevationScroll({
  children,
  theme,
}: ElevationScrollProps) {
  const isDark = theme === Themes.Dark;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    sx: trigger
      ? {
          bgcolor: isDark ? 'var(--primary-dark)' : 'var(--secondary-dark)',
          borderBottom: isDark ? 'none' : '1px solid var(--header-light)',
          transitionDuration: '500ms',
          transitionProperty: 'padding-top, padding-bottom, background-color',
          transitionTimingFunction: 'ease-in-out',
        }
      : {
          pt: 1.1,
          pb: 1.1,
          bgcolor: isDark ? 'var(--header)' : 'var(--header-light)',
        },
    elevation: trigger ? 4 : 0,
  });
}
