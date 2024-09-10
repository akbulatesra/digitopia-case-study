import * as d3 from 'd3';

interface DataPoint2 {
  label: string;
  startMonth: string;
  endMonth: string;
  week: number;
}

interface CreateBarsProps {
  svg: d3.Selection<SVGGElement, unknown, null, undefined>;
  data: DataPoint2[];
  xMonth: d3.ScaleBand<string>;
  height: number;
}

export const createBars = ({ svg, data, xMonth, height }: CreateBarsProps) => {
  const barHeight = 30;
  const sortedData = data.sort((a, b) => {
    const aStart = xMonth(a.startMonth) ?? 0;
    const bStart = xMonth(b.startMonth) ?? 0;
    return aStart - bStart;
  });

  const yScale = d3
    .scaleBand()
    .domain(sortedData.map((d) => d.label))
    .range([0, height])
    .padding(0.1);

  svg
    .selectAll<SVGRectElement, DataPoint2>('.bar')
    .data(data, (d) => `${d.label}-${d.startMonth}-${d.endMonth}-${d.week}`)
    .join('rect')
    .attr('class', 'bar')
    .attr('x', (d) => {
      const startMonth = xMonth(d.startMonth);
      const weekOffset = (d.week - 1) * (xMonth.bandwidth() / 4);
      return startMonth ? startMonth + weekOffset : 0;
    })
    .attr('y', (d) => yScale(d.label) ?? 0)
    .attr('width', (d) => {
      const start = xMonth(d.startMonth);
      const end = xMonth(d.endMonth);
      return end ? end - (start ?? 0) : 0;
    })
    .attr('height', barHeight)
    .attr('fill', '#007bff');

  svg
    .selectAll<SVGTextElement, DataPoint2>('.bar-text')
    .data(data, (d) => `${d.label}-${d.startMonth}-${d.endMonth}-${d.week}`)
    .join('text')
    .attr('class', 'bar-text')
    .attr('x', (d) => {
      const startMonth = xMonth(d.startMonth);
      const weekOffset = (d.week - 1) * (xMonth.bandwidth() / 4);
      return startMonth ? startMonth + weekOffset + xMonth.bandwidth() / 2 : 0;
    })
    .attr('y', (d) => {
      const barY = yScale(d.label) ?? 0;
      return barY + barHeight / 2;
    })
    .attr('text-anchor', 'middle')
    .attr('fill', '#000')
    .style('font-size', '14px')
    .text((d) => d.label);
};
