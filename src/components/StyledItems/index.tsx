import {
  Box,
  styled,
  Typography,
  Theme,
  CSSObject,
  ListItemButton,
  Drawer,
  TextField,
  ListItemIcon,
} from '@mui/material';

interface StyledListItemButtonProps {
  bgColor?: string; // Arka plan rengi için opsiyonel prop
}

export const StyledInfoBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 'fit-content',
  justifyContent: 'space-between',
}));

export const StyledCenterBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
}));

export const StyledH3 = styled(Typography)(() => ({
  variant: 'body1',
  fontWeight: 'bold',
}));

export const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'bgColor',
})<StyledListItemButtonProps>(({ bgColor, theme }) => {
  const isDarkBackground = (bgColor: string) => {
    const [r, g, b] = bgColor.match(/\d+/g)?.map(Number) || [0, 0, 0];
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance < 128;
  };

  const textColor = bgColor && isDarkBackground(bgColor) ? 'white' : 'black';

  return {
    backgroundColor: bgColor || 'red',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius * 4,
    minWidth: 40,
    padding: theme.spacing(1),
    color: textColor,
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
    },
  };
});

const drawerWidth = 240;
const drawerHeight = 500;

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  top: 'auto',
  bottom: 'auto',
  right: 0,
  left: 'auto',
  height: drawerHeight,
  position: 'absolute',
  fontSize: 14,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  top: 'auto',
  bottom: 'auto',
  right: 0,
  left: 'auto',
  height: drawerHeight,
  position: 'absolute',
});

export const StyledBox = styled(Box)(({ theme }) => ({
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  height: drawerHeight,
  display: 'flex',
  position: 'relative',
}));
export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  width: `calc(${theme.spacing(7)} + 1px)`,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',

  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));
export const StyledLoginFormTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: 'inherit',
  },
  '& .MuiInputLabel-root': {
    color: 'inherit',
  },
  '& .MuiInputLabel-root.Mui-error': {
    color: 'inherit',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'inherit',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'white',
  },
  '& .MuiFormHelperText-root': {
    color: '#f44336',
    textAlign: 'end',
    fontWeight: 'bold',
  },
  '& .MuiInput-underline.Mui-error:before': {
    borderBottomColor: '#f44336',
  },
  '& .MuiInput-underline.Mui-error:after': {
    borderBottomColor: '#f44336',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: '#747578',
  },
  '& .MuiInputBase-root:after': {
    borderBottomColor: '#747578',
  },
});

export const StyledIcon = styled(ListItemIcon)({
  minWidth: 40,
});
