import { useState } from "react";
import {
  PieChart as RePieChart,
  Cell,
  Pie,
  ResponsiveContainer,
} from "recharts";
import { Box, Tooltip, Text } from "@chakra-ui/react";

// Components
import RenderActiveShape from "./RenderActiveShape";

type Props = {
  data: any;
  title: string;
  tooltip: string;
};

export default function PieChartSentiment(props: Props) {
  const { data, title, tooltip } = props;

  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: undefined, index: number) => setActiveIndex(index);

  return (
    <Box>
      <ResponsiveContainer width="100%" aspect={1}>
        <RePieChart>
          <Pie
            style={{ zIndex: 10 }}
            activeIndex={activeIndex}
            activeShape={RenderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map(({ color }: { color: string }, index: number) => (
              <Cell key={`cell-${index}`} fill={color} />
            ))}
          </Pie>
        </RePieChart>
      </ResponsiveContainer>
      <Tooltip label={tooltip}>
        <Text textAlign="center" fontSize="md">
          {title}
        </Text>
      </Tooltip>
    </Box>
  );
}
