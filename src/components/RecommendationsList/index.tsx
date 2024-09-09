'use client';
import useErrorListener from '@/hooks/useErrorListener';
import {
  useGetImpactRunListQuery,
  useLazyGetImpactRunDetailQuery,
} from '@/services';
import { useEffect, useState } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ImpactRunDetailResponseModel } from '@/types';
import RightSidePanel from '../RightSideBar';
import RecommendationDetail from '../RecommendationDetail';

const drawerWidth = 240;
const drawerHeight = 500;

const DrawerHeader = styled('div')(({ theme }) => ({
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  width: drawerWidth,
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

const RecommendationsList = () => {
  const [open, setOpen] = useState(false);
  const [openbyList, setOpenbyList] = useState(false);

  const [selectedRecommendation, setSelectedRecommedation] =
    useState<ImpactRunDetailResponseModel | null>(null);
  const { error, data: ImpactRunListData } = useGetImpactRunListQuery();
  const [trigger, { data: RecommendationsData }] =
    useLazyGetImpactRunDetailQuery(ImpactRunListData?.[0]?.id);

  const handleDrawerClose = () => {
    setOpen(!open);
  };
  const handleRightPanel = (
    recommendation: ImpactRunDetailResponseModel | null
  ) => {
    setOpenbyList(true);
    setSelectedRecommedation(recommendation);
  };
  const closeRightPanel = () => {
    setOpenbyList(false);
  };
  useEffect(() => {
    if (ImpactRunListData?.[0]?.id) {
      trigger(ImpactRunListData[0].id);
    }
  }, [ImpactRunListData, trigger]);

  useErrorListener(error);

  return (
    <Box
      display="flex"
      width={drawerWidth}
      position="relative"
      height={drawerHeight}
    >
      {selectedRecommendation && (
        <RightSidePanel
          children={
            <RecommendationDetail
              selectedRecommendation={selectedRecommendation}
            />
          }
          isOpen={openbyList}
          onClose={closeRightPanel}
        />
      )}
      <Drawer variant="permanent" open={open} anchor="left">
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {RecommendationsData?.map((recommendation, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => handleRightPanel(recommendation)}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemText
                  primary={recommendation.topicRecommendation.recommendation}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
export default RecommendationsList;
