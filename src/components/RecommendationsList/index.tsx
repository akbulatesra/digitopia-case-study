'use client';
import {
  useGetImpactRunListQuery,
  useLazyGetImpactRunDetailQuery,
} from '@/services';
import { useEffect, useState, useMemo } from 'react';
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

const RecommendationsList = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommedation] =
    useState<ImpactRunDetailResponseModel | null>(null);
  const { data: ImpactRunListData } = useGetImpactRunListQuery();
  const [trigger, { data: RecommendationsData }] =
    useLazyGetImpactRunDetailQuery(ImpactRunListData?.[0]?.id);

  const ExpandedRecommendationsData = useMemo(() => {
    return RecommendationsData ? [...RecommendationsData] : [];
  }, [RecommendationsData]);

  const bgColor = useGenerateColorFromLength({
    length: ExpandedRecommendationsData?.length,
    minColor: 0x66ccff,
    maxColor: 0x003366,
  });

  const handleDrawerClose = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleRightPanel = (
    recommendation: ImpactRunDetailResponseModel | null
  ) => {
    setIsRightPanelOpen(true);
    setSelectedRecommedation(recommendation);
  };

  const closeRightPanel = () => {
    setIsRightPanelOpen(false);
  };

  useEffect(() => {
    if (ImpactRunListData?.[0]?.id) {
      trigger(ImpactRunListData[0].id);
    }
  }, [ImpactRunListData, trigger]);

  return (
    <StyledBox>
      {selectedRecommendation && (
        <RightSidePanel
          children={
            <RecommendationDetail
              selectedRecommendation={selectedRecommendation}
            />
          }
          isOpen={isRightPanelOpen}
          onClose={closeRightPanel}
        />
      )}
      <StyledDrawer variant="permanent" open={isDrawerOpen} anchor="left">
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {isDrawerOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {ExpandedRecommendationsData?.map((recommendation, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: 'block', marginX: 2, width: 'auto' }}
            >
              <StyledListItemButton
                key={index}
                bgColor={bgColor[index]}
                onClick={() => handleRightPanel(recommendation)}
              >
                <ListItemText
                  disableTypography
                  primary={recommendation.topicRecommendation.recommendation}
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
      </StyledDrawer>
    </StyledBox>
  );
};
export default RecommendationsList;
