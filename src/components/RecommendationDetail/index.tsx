import React, { FC, useMemo, useState } from 'react';
import { Box, Button, Chip, Divider, Modal, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { AddCircle } from '@mui/icons-material';
import { StyledCenterBox, StyledH3, StyledInfoBox } from '../StyledItems';
import dayjs from 'dayjs';
import { useGetDateInfo } from '@/hooks/useGetDateInfo';
import DateRangePicker from '../DateRangePicker';
import { updateRecommendationItem } from '@/redux/slices/recommendationsSlice';
import { useAppDispatch } from '@/redux/hook';
import { ImpactRunDetailResponseModel } from '@/types';

interface RecommendationProps {
  selectedRecommendation: ImpactRunDetailResponseModel | null;
  closeRightPanel: () => void;
  backgroundColor: string;
}

const RecommendationDetail: FC<RecommendationProps> = ({
  selectedRecommendation,
  closeRightPanel,
  backgroundColor,
}) => {
  const t = useTranslations('recommendationDetail');
  const [open, setOpen] = useState(false);
  const maxDate = dayjs().add(11, 'month').endOf('month');
  const [selectedStartDate, setSelectedStartDate] = useState(dayjs());
  const [selectedEndDate, setSelectedEndDate] = useState(dayjs());
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    setOpen(true);
  };
  const handleDateChange = () => {
    const monthWeekInfo = useGetDateInfo(selectedStartDate, selectedEndDate);

    const updatedRec = {
      ...selectedRecommendation,
      topicRecommendation: {
        ...selectedRecommendation?.topicRecommendation,
        ...monthWeekInfo,
        backgroundColor,
      },
    };
    dispatch(
      updateRecommendationItem(updatedRec as ImpactRunDetailResponseModel)
    );
    setOpen(false);
    closeRightPanel();
  };

  const recommendationNode = useMemo(() => {
    if (selectedRecommendation === null) return null;
    const {
      dimension,
      topic,
      recommendation,
      capex,
      opex,
      initiativeSize,
      description,
      section,
    } = selectedRecommendation.topicRecommendation;
    return (
      <Box marginX={2}>
        {open && (
          <Modal open={open} onClose={() => setOpen(false)}>
            <Box
              sx={{
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 'auto',
                width: 'fit-content',
                padding: 2,
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <DateRangePicker
                startDay={selectedStartDate}
                endDay={selectedEndDate}
                onStartDayChange={(date) =>
                  setSelectedStartDate(date as dayjs.Dayjs)
                }
                onEndDayChange={(date) =>
                  setSelectedEndDate(date as dayjs.Dayjs)
                }
                minDate={dayjs()}
                maxDate={maxDate}
                submit={handleDateChange}
              />
            </Box>
          </Modal>
        )}
        <Typography
          textAlign="center"
          variant="subtitle1"
          fontWeight="bold"
          marginBottom={0.5}
        >
          {t('recommendationDetail')}
        </Typography>
        <Divider />
        <Box my={2} display="flex" flexDirection="column" gap={4}>
          <StyledCenterBox gap={2}>
            <Chip color="primary" label={dimension} />
            <Chip color="secondary" label={topic} />
            <Chip label={section} />
          </StyledCenterBox>

          <Typography textAlign="center" variant="subtitle2" fontWeight="bold">
            {recommendation}
          </Typography>
          <Box display="flex" justifyContent="space-evenly">
            <StyledInfoBox>
              <StyledH3>APEX</StyledH3>
              {capex ? <MonetizationOnIcon /> : <HighlightOffIcon />}
            </StyledInfoBox>
            <StyledInfoBox>
              <StyledH3>OPEX</StyledH3>
              {opex ? <MonetizationOnIcon /> : <HighlightOffIcon />}
            </StyledInfoBox>
            <StyledInfoBox>
              <StyledH3>{t('size')}</StyledH3>
              <Typography>{initiativeSize}</Typography>
            </StyledInfoBox>
            <StyledInfoBox>
              <StyledH3>{t('duration')}</StyledH3>
              <Button
                variant="contained"
                startIcon={<AddCircle />}
                size="small"
                onClick={handleButtonClick}
              >
                {t('add')}
              </Button>
            </StyledInfoBox>
          </Box>
        </Box>
        <Box
          sx={{ backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
          borderRadius={4}
          padding={2}
          mt={4}
        >
          <Typography>{description}</Typography>
        </Box>
      </Box>
    );
  }, [selectedRecommendation, open, selectedEndDate, selectedStartDate]);

  return recommendationNode;
};

export default RecommendationDetail;
