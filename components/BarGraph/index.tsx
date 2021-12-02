import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mui
import { Text } from "@chakra-ui/react";

// Utils
import { numbersWithCommas, abbrNumber } from "../../utils/numbers";

type Props = {
  title: string;
  data: {}[]; // Make this more explicit
  color: string;
  keyBar: string;
};

export default function BarGraph(props: Props) {
  const { title, data, color, keyBar } = props;

  return (
    <div>
      <Text variant="h5" gutterBottom m={1} align="center">
        {title}
      </Text>
      <ResponsiveContainer width="100%" aspect={1.5}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(label) => `$${abbrNumber(label)}`} />
          <Tooltip
            formatter={(number: number) => `$${numbersWithCommas(number)}`}
          />
          <Bar dataKey={keyBar} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
