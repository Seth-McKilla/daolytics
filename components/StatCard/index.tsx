import {
  Box,
  Text,
  Tooltip,
  useColorModeValue,
  StatArrow,
  StatHelpText,
  Stat,
} from "@chakra-ui/react";

type Props = {
  title: string;
  value: string;
  valueColor?: string;
  tooltip?: string;
};

export default function StatCard(props: Props) {
  const { title, value, valueColor, tooltip } = props;
  const bg = useColorModeValue("white", "gray.800");

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
        <Text py={4} textAlign="center" fontWeight="bold" fontSize="xl">
          Voting Power Concentration <br /> (Current Gini Coefficient)
        </Text>
      </Tooltip>
      <Box>
        <Text pt={5} textAlign="center" fontSize="lg" color={valueColor}>
          {value}
        </Text>
        <Stat>
          <StatHelpText textAlign="center" fontSize="lg" color={valueColor}>
            <StatArrow type="increase" />
            {2.3}%
          </StatHelpText>
        </Stat>
      </Box>
    </Box>
  );
}
