import React, { FC, useMemo } from 'react';
import { Box, Button, Chip, Divider, styled, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { ImpactRunDetailResponseModel } from '@/types';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { AddCircle } from '@mui/icons-material';

interface RecommendationProps {
  selectedRecommendation: ImpactRunDetailResponseModel | null;
}

const StyledInfoBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 'fit-content',
  justifyContent: 'space-between',
}));

const StyledCenterBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
}));

const StyledH3 = styled(Typography)(() => ({
  variant: 'body1',
  fontWeight: 'bold',
}));

const RecommendationDetail: FC<RecommendationProps> = ({
  selectedRecommendation,
}) => {
  const t = useTranslations('recommendationDetail');

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
  }, [selectedRecommendation]);

  return recommendationNode;
};

export default RecommendationDetail;
