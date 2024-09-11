'use client';
import { useState } from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ImpactRunDetailResponseModel } from '@/types';
import RightSidePanel from '../RightSideBar';
import RecommendationDetail from '../RecommendationDetail';
import { useGenerateColorFromLength } from '@/hooks/useGenerateColorFromLength';
import {
  DrawerHeader,
  StyledBox,
  StyledDrawer,
  StyledListItemButton,
} from '../StyledItems';
import { useAppSelector } from '@/redux/hook';
import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';

const RecommendationsList = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [selectedBg, setSelectedBg] = useState('');
  const { data } = useAppSelector((state) => state.recommendations);
  const t = useTranslations('recommendations');
  const [selectedRecommendation, setSelectedRecommedation] =
    useState<ImpactRunDetailResponseModel | null>(null);

  const bgColor = useGenerateColorFromLength({
    length: data?.length,
    minColor: 0x66ccff,
    maxColor: 0x003366,
  });

  const handleDrawerClose = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleRightPanel = (
    recommendation: ImpactRunDetailResponseModel | null,
    index: number
  ) => {
    setIsRightPanelOpen(true);
    setSelectedRecommedation(recommendation);
    setSelectedBg(bgColor[index]);
  };

  const closeRightPanel = () => {
    setIsRightPanelOpen(false);
  };

  return (
    <StyledBox>
      <RightSidePanel
        children={
          <RecommendationDetail
            selectedRecommendation={selectedRecommendation}
            closeRightPanel={closeRightPanel}
            backgroundColor={selectedBg}
          />
        }
        isOpen={isRightPanelOpen}
        onClose={closeRightPanel}
      />
      <StyledDrawer variant="permanent" open={isDrawerOpen} anchor="left">
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {isDrawerOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {data?.map((recommendation, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: 'block', marginX: 2, width: 'auto' }}
            >
              <StyledListItemButton
                key={index}
                bgColor={bgColor[index]}
                onClick={() => handleRightPanel(recommendation, index)}
                disabled={!isDrawerOpen}
              >
                <ListItemText
                  disableTypography
                  primary={recommendation.topicRecommendation?.recommendation}
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                />
              </StyledListItemButton>
            </ListItem>
          ))}
        </List>
        <Button onClick={() => {}}>{t('add')}</Button>
      </StyledDrawer>
    </StyledBox>
  );
};
export default RecommendationsList;
