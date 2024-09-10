import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Direction = 'up' | 'down' | 'between' | 'only';

const useResponsive = (breakpoint: Breakpoint, direction: Direction = 'up') => {
  const theme = useTheme();

  const mediaQuery = (breakpoint: Breakpoint, direction: Direction) => {
    switch (direction) {
      case 'up':
        return theme.breakpoints.up(breakpoint);
      case 'down':
        return theme.breakpoints.down(breakpoint);
      case 'between':
        return theme.breakpoints.between('xs', breakpoint);
      case 'only':
        return theme.breakpoints.only(breakpoint);
      default:
        return theme.breakpoints.up(breakpoint);
    }
  };

  const matches = useMediaQuery(mediaQuery(breakpoint, direction));

  return matches;
};

export default useResponsive;
