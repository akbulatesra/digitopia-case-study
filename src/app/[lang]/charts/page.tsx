import GanttChart from '@/components/GanttChart';
import RecommendationsList from '@/components/RecommendationsList';
import { Box } from '@mui/material';

const Charts = () => {
  return (
    <Box
      display="flex"
      sx={{ background: 'red' }}
      width="fit-content"
      margin="auto"
      gap={2}
    >
      <RecommendationsList />
      <GanttChart />
    </Box>
  );
};

export default Charts;
