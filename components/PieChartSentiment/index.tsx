import { useState } from "react";
import {
  PieChart as RePieChart,
  Cell,
  Pie,
  ResponsiveContainer,
} from "recharts";
import { Box, Tooltip, Text, useColorModeValue } from "@chakra-ui/react";

// Components
import RenderActiveShape from "./RenderActiveShape";

type Props = {
  data: any;
  title: string;
  tooltip: string;
};

export default function PieChartSentiment(props: Props) {
  const { data, title, tooltip } = props;
  const bg = useColorModeValue("white", "gray.800");
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: undefined, index: number) => setActiveIndex(index);

  return (
    <Box
      borderWidth={2}
      borderColor={useColorModeValue("#DBDBFF", "#212145")}
      rounded="lg"
      shadow="lg"
      bg={bg}
      w="full"
      maxW="sm"
    >
      <Tooltip label={tooltip}>
        <Text py={5} fontWeight="bold" textAlign="center" fontSize="xl">
          {title}
        </Text>
      </Tooltip>
      <ResponsiveContainer width="100%" aspect={2}>
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
    </Box>
  );
}
