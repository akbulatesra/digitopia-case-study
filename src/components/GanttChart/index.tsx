'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { createWeekLine } from '@/helpers/createWeekLine';

interface DataPoint {
  month: string;
}
interface DataPoint2 {
  label: string;
  startMonth: string;
  endMonth: string;
}

const GanttChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current === null) return;

    // SVG boyutları
    const margin = { top: 40, right: 0, bottom: 0, left: 0 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const today = new Date();
    const currentMonth = today.toLocaleString('default', {
      month: 'short',
    });
    const dataNew: DataPoint2[] = [
      { label: 'Project A', startMonth: 'Jan', endMonth: 'Apr' },
      { label: 'Project B', startMonth: 'May', endMonth: 'Jul' },
      // Diğer veri noktaları...
    ];

    // Veriyi oluştur
    const data: DataPoint[] = [
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

    const months = data.map((d) => d.month);
    const startIndex = months.indexOf(currentMonth);

    const sortedMonths = months
      .slice(startIndex)
      .concat(months.slice(0, startIndex));
    const filteredMonths = sortedMonths.slice(0, -1); // Son ay hariç ayları alıyoruz

    // D3 ölçeklerini oluştur
    const xMonth = d3
      .scaleBand<string>()
      .domain(sortedMonths)
      .range([0, width])
      .padding(0);

    // SVG elemanını oluştur
    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Arka planı ekle
    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#C0C0C0') // Arka plan rengi
      .attr('x', 0)
      .attr('y', 0);

    // X ekseninin arka planını ekle
    const xAxisGroup = svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, 0)`);

    // X ekseninin arka planı için bir rect ekle
    xAxisGroup
      .append('rect')
      .attr('x', 0)
      .attr('y', -40) // Y ekseninin üstünde
      .attr('width', width)
      .attr('height', 40) // X ekseninin yüksekliği
      .attr('fill', '#000A11'); // X ekseninin arka plan rengi

    // X eksenini oluştur
    xAxisGroup
      .call(d3.axisTop(xMonth))
      .selectAll('.tick text')
      .style('font-size', 16);

    // X ekseninin rengini değiştir
    xAxisGroup.selectAll('path, line').style('display', 'none'); // X ekseninin rengi

    // Çeyrek sınırları yerine ayların kenarlarını gösteren boş çizgiler
    svg
      .selectAll('.month-line')
      .data(filteredMonths)
      .enter()
      .append('line')
      .attr('class', 'month-line')
      .attr('y1', 0)
      .attr('y2', height)
      .attr('x1', (d) => xMonth(d)! + xMonth.bandwidth()) // Ayların ortasına hizalama
      .attr('x2', (d) => xMonth(d)! + xMonth.bandwidth()) // Ayların ortasına hizalama
      .attr('stroke', '#9f3333') // Çizgi rengi
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

    svg
      .selectAll('.bar')
      .data(dataNew)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xMonth(d.startMonth) ?? 0)
      .attr('y', 0)
      .attr('width', (d) => {
        const start = xMonth(d.startMonth);
        const end = xMonth(d.endMonth);
        return end ? end - (start ?? 0) : 0;
      })
      .attr('height', 40) // Çubuğun yüksekliği
      .attr('fill', '#007bff')
      .attr('transform', `translate(0, ${height / 2 - 20})`);
    svg
      .selectAll('.bar-text')
      .data(dataNew)
      .enter()
      .append('text')
      .attr('class', 'bar-text')
      .attr('x', (d) => (xMonth(d.startMonth) as number) + 50 ?? 0)
      .attr('y', height / 2 + 6) // Çubuğun ortasında yazı konumlandırma
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .style('font-size', '14px')
      .text((d) => d.label);
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default GanttChart;
