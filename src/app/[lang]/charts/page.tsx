import GanttChart from '@/components/GanttChart';
import RecommendationsList from '@/components/RecommendationsList';
import { Box } from '@mui/material';

const Charts = () => {
  return (
    <Box display="flex">
      <RecommendationsList />
      <GanttChart />
    </Box>
  );
};

export default Charts;
