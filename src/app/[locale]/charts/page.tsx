import GanttChart from '@/components/GanttChart';
import RecommendationsList from '@/components/RecommendationsList';
import { Box } from '@mui/material';
import { unstable_setRequestLocale } from 'next-intl/server';

const Charts = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);

  return (
    <Box
      display="flex"
      sx={{ background: 'black' }}
      margin="auto"
      gap={2}
      padding={4}
      borderRadius={8}
      width="fit-content"
    >
      <RecommendationsList />
      <GanttChart />
    </Box>
  );
};

export default Charts;
