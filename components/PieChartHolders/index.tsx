import { useState } from "react";
import {
  PieChart as RePieChart,
  Cell,
  Pie,
  ResponsiveContainer,
} from "recharts";
import { Box, Tooltip, Text } from "@chakra-ui/react";
import theme from "@chakra-ui/theme";

// Components
import RenderActiveShape from "./RenderActiveShape";

type Props = {
  data: any;
  title: string;
  tooltip: string;
};

const getColorShades = () => {
  const { red, blue, green, purple, pink } = theme.colors;

  const colorList = [red, blue, green, purple, pink];
  const colorShades: string[] = [];

  colorList.forEach((color) => {
    colorShades.push(
      color[100],
      color[300],
      color[500],
      color[700],
      color[900]
    );
  });

  return colorShades;
};

export default function PieChartHolders(props: Props) {
  const { data, title, tooltip } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const COLORS = getColorShades();

  const topHolders = data.map(
    (item: { address: string; balance: number }, index: number) => {
      return {
        address: item.address,
        value: Number(item.balance),
        fill: COLORS[index],
      };
    }
  );

  const onPieEnter = (_: undefined, index: number) => setActiveIndex(index);

  return (
    <Box>
      <Tooltip label={tooltip}>
        <Text textAlign="center" fontWeight="bold" fontSize="md">
          {title}
        </Text>
      </Tooltip>
      <ResponsiveContainer width="100%" aspect={2}>
        <RePieChart>
          <Pie
            style={{ zIndex: 10 }}
            activeIndex={activeIndex}
            activeShape={RenderActiveShape}
            data={topHolders}
            cx="50%"
            cy="50%"
            innerRadius={20}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {topHolders.map(({ fill }: { fill: string }, index: number) => (
              <Cell key={`cell-${index}`} fill={fill} />
            ))}
          </Pie>
        </RePieChart>
      </ResponsiveContainer>
    </Box>
  );
}
