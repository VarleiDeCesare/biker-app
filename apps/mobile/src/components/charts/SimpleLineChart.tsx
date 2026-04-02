import { View } from 'react-native';
import Svg, { Path, Line, Text as SvgText } from 'react-native-svg';
import { colors } from '@/theme';

interface DataPoint {
  x: number | string;
  y: number;
}

interface SimpleLineChartProps {
  data: DataPoint[];
  width: number;
  height: number;
  color?: string;
  filled?: boolean;
}

export const SimpleLineChart = ({
  data,
  width,
  height,
  color = colors.primary,
  filled = false,
}: SimpleLineChartProps) => {
  const paddingLeft = 32;
  const paddingRight = 8;
  const paddingTop = 8;
  const paddingBottom = 20;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const yValues = data.map((d) => d.y);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  const yRange = maxY - minY || 1;

  const toX = (i: number) => paddingLeft + (i / (data.length - 1)) * chartWidth;
  const toY = (y: number) => paddingTop + chartHeight - ((y - minY) / yRange) * chartHeight;

  const linePath = data.reduce((acc, point, i) => {
    const x = toX(i);
    const y = toY(point.y);
    if (i === 0) return `M ${x} ${y}`;
    const prevX = toX(i - 1);
    const prevY = toY(data[i - 1].y);
    const cpX = (prevX + x) / 2;
    return `${acc} C ${cpX} ${prevY} ${cpX} ${y} ${x} ${y}`;
  }, '');

  const baseY = paddingTop + chartHeight;
  const areaPath = `${linePath} L ${toX(data.length - 1)} ${baseY} L ${toX(0)} ${baseY} Z`;

  // Y axis labels (min and max)
  const yLabels = [
    { value: maxY, y: paddingTop },
    { value: Math.round((maxY + minY) / 2), y: paddingTop + chartHeight / 2 },
    { value: minY, y: paddingTop + chartHeight },
  ];

  return (
    <View>
      <Svg width={width} height={height}>
        {/* Grid lines */}
        {yLabels.map((label) => (
          <Line
            key={label.value}
            x1={paddingLeft}
            y1={label.y}
            x2={width - paddingRight}
            y2={label.y}
            stroke="#2A2A2A"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        ))}
        {/* Y axis labels */}
        {yLabels.map((label) => (
          <SvgText
            key={`lbl-${label.value}`}
            x={paddingLeft - 4}
            y={label.y + 4}
            fontSize={9}
            fill={colors.mutedForeground}
            textAnchor="end"
          >
            {label.value}
          </SvgText>
        ))}
        {/* Area fill */}
        {filled && (
          <Path d={areaPath} fill={color} fillOpacity={0.1} stroke="none" />
        )}
        {/* Line */}
        <Path d={linePath} stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
      </Svg>
    </View>
  );
};
