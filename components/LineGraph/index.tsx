import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Chakra
import {
  Tooltip as ChakraTooltip,
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Utils
import { numbersWithCommas, abbrNumber } from "../../utils/numbers";

type Props = {
  title: string;
  data: Array<{ date: string; transactions: number }>;
  color: string;
  keyX: string;
  keyY: string;
  tooltip: string;
};

export default function LineGraph(props: Props) {
  const { title, data, color, keyX, keyY, tooltip } = props;
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
      borderWidth={2}
      borderColor={useColorModeValue("#DBDBFF", "#212145")}
      rounded="lg"
      shadow="lg"
      bg={bg}
      width="100%"
      Height="100%"
    >
      <ChakraTooltip label={tooltip}>
        <Text py={4} textAlign="center" fontWeight="bold" fontSize="xl">
          {title}
        </Text>
      </ChakraTooltip>
      <ResponsiveContainer width="100%" aspect={2.5}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 30,
          }}
        >
          <defs>
            <linearGradient id={`color-${keyY}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={1} />
              <stop offset="95%" stopColor={color} stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={keyX} angle={-45} textAnchor="end" />
          <YAxis tickFormatter={(value: number) => abbrNumber(value)} />
          <Tooltip formatter={(number: number) => numbersWithCommas(number)} />
          <Area
            type="monotone"
            dataKey={keyY}
            stroke={color}
            fill={`url(#color-${keyY})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
