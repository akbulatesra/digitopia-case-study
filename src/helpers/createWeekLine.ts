import { WeekLine } from '@/types';

export const createWeekLine = ({
  selectAll,
  svg,
  data,
  y1 = 0,
  y2,
  x1,
  x2,
  lineAttr = {
    stroke: '#bd9c9c',
    strokeWidth: 2,
    dashArray: '2,2',
  },
}: WeekLine) => {
  return svg
    .selectAll(selectAll)
    .data(data)
    .enter()
    .append('line')
    .attr('class', 'week-line')
    .attr('y1', y1)
    .attr('y2', y2)
    .attr('x1', x1)
    .attr('x2', x2)
    .attr('stroke', lineAttr.stroke)
    .attr('stroke-width', lineAttr.strokeWidth)
    .attr('stroke-dasharray', lineAttr.dashArray);
};
