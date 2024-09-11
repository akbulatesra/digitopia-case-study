'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { createWeekLine } from '@/helpers/createWeekLine';
import { createBars } from '@/helpers/createBars';
import { useAppSelector } from '@/redux/hook';

interface DataPoint {
  month: string;
}

interface DataPoint2 {
  label: string;
  startMonth: string;
  endMonth: string;
  week: number;
  background: string;
}

const GanttChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { data } = useAppSelector((state) => state.recommendations);

  useEffect(() => {
    if (svgRef.current === null) return;

    const margin = { top: 40, right: 0, bottom: 0, left: 0 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const today = new Date();
    const currentMonth = today.toLocaleString('default', {
      month: 'short',
    });
    const dataNew: DataPoint2[] = data
      .filter((item) => item.topicRecommendation.endMonth)
      .map((item) => ({
        label: item.topicRecommendation.recommendation || '',
        startMonth: item.topicRecommendation.startMonth || '',
        endMonth: item.topicRecommendation.endMonth || '',
        week: item.topicRecommendation.startWeek || 0,
        background: item.topicRecommendation.backgroundColor || 'blue',
      }));

    const MonthData: DataPoint[] = [
      { month: 'Jan' },
      { month: 'Feb' },
      { month: 'Mar' },
      { month: 'Apr' },
      { month: 'May' },
      { month: 'Jun' },
      { month: 'Jul' },
      { month: 'Aug' },
      { month: 'Sep' },
      { month: 'Oct' },
      { month: 'Nov' },
      { month: 'Dec' },
    ];

    const months = MonthData.map((d) => d.month);
    const startIndex = months.indexOf(currentMonth);

    const sortedMonths = months
      .slice(startIndex)
      .concat(months.slice(0, startIndex));
    const filteredMonths = sortedMonths.slice(0, -1);

    const xMonth = d3
      .scaleBand<string>()
      .domain(sortedMonths)
      .range([0, width])
      .padding(0);

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#ffffff')
      .attr('x', 0)
      .attr('y', 0);

    const xAxisGroup = svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, 0)`);

    xAxisGroup
      .append('rect')
      .attr('x', 0)
      .attr('y', -40)
      .attr('width', width)
      .attr('height', 40)
      .attr('fill', '#afafaf');

    xAxisGroup
      .call(d3.axisTop(xMonth))
      .selectAll('.tick text')
      .style('font-size', 16)
      .style('color', 'black');

    xAxisGroup.selectAll('path, line').style('display', 'none');

    svg
      .selectAll('.month-line')
      .data(filteredMonths)
      .enter()
      .append('line')
      .attr('class', 'month-line')
      .attr('y1', 0)
      .attr('y2', height)
      .attr('x1', (d) => xMonth(d)! + xMonth.bandwidth())
      .attr('x2', (d) => xMonth(d)! + xMonth.bandwidth())
      .attr('stroke', '#282828')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '2,2');

    const line1 = {
      selectAll: 'week-line1',
      svg,
      data: sortedMonths,
      y2: height,
      x1: (d: string) => xMonth(d)! + xMonth.bandwidth() / 4,
      x2: (d: string) => xMonth(d)! + xMonth.bandwidth() / 4,
    };
    const line2 = {
      selectAll: 'week-line2',
      svg,
      data: sortedMonths,
      y2: height,
      x1: (d: string) => xMonth(d)! + (xMonth.bandwidth() * 2) / 4,
      x2: (d: string) => xMonth(d)! + (xMonth.bandwidth() * 2) / 4,
    };
    const line3 = {
      selectAll: 'week-line3',
      svg,
      data: sortedMonths,
      y2: height,
      x1: (d: string) => xMonth(d)! + (xMonth.bandwidth() * 3) / 4,
      x2: (d: string) => xMonth(d)! + (xMonth.bandwidth() * 3) / 4,
    };

    createWeekLine(line1);
    createWeekLine(line2);
    createWeekLine(line3);

    createBars({
      svg,
      data: dataNew,
      xMonth,
      height,
    });
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default GanttChart;
