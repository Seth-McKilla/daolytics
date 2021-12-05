import { ComponentType } from "react";
import { Box, Text, Tooltip } from "@chakra-ui/react";

type Props = {
  title: string;
  value: string;
  valueColor?: string;
  Icon: ComponentType;
  tooltip?: string;
};

export default function StatCard(props: Props) {
  const { title, value, valueColor, Icon, tooltip } = props;

  return (
    <Box>
      <Icon />
      <Box>
        <Tooltip label={tooltip}>
          <Text fontSize="md">{title}</Text>
        </Tooltip>
      </Box>
      <Box>
        <Text fontSize="lg" color={valueColor}>
          {value}
        </Text>
      </Box>
    </Box>
  );
}
