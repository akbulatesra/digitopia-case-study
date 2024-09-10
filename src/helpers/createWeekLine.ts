import * as d3 from 'd3';

interface CreateWeekLineProps {
  selectAll: string;
  svg: d3.Selection<SVGGElement, unknown, null, undefined>;
  data: string[];
  x1: (d: string) => number;
  x2: (d: string) => number;
  y2: number;
}

export const createWeekLine = ({
  selectAll,
  svg,
  data,
  x1,
  x2,
  y2,
}: CreateWeekLineProps) => {
  svg
    .selectAll(`.${selectAll}`)
    .data(data)
    .enter()
    .append('line')
    .attr('class', selectAll)
    .attr('x1', (d) => x1(d))
    .attr('x2', (d) => x2(d))
    .attr('y1', 0)
    .attr('y2', y2)
    .attr('stroke', '#282828')
    .attr('stroke-width', 1)
    .attr('stroke-dasharray', '2,2');
};
