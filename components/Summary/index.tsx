// Chakra
import {
  Grid,
  GridItem,
  Box,
  Flex,
  Text,
  Tooltip,
  Avatar,
  useColorModeValue,
  Link,
  chakra,
  Image,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";

import { SocialLinks } from "..";

export default function Summary() {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <div>
      <Box
        borderWidth={2}
        borderColor={useColorModeValue("#DBDBFF", "#212145")}
        mx="auto"
        width="2lg"
        px={3}
        py={3}
        rounded="lg"
        shadow="lg"
        bg={bg}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Text
            pt={2}
            fontSize="xl"
            fontWeight="bold"
            // color={useColorModeValue("gray.600", "gray.400")}
          >
            Summary
          </Text>
        </Flex>
        <Flex mt={1}>
          <Text
            fontSize="md"
            // color={useColorModeValue("gray.700", "white")}
            fontWeight="500"
            // _hover={{
            //   color: useColorModeValue("gray.600", "gray.200"),
            // }}
          >
            Blockchain:
          </Text>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg"
            boxSize="1.5rem"
            borderRadius="full"
            mr="1.5px"
            alt="Ethereum-logo"
          />
          <Text
            fontSize="md"
            // color={useColorModeValue("gray.700", "white")}
            fontWeight="500"
            // _hover={{
            //   color: useColorModeValue("gray.600", "gray.200"),
            // }}
          >
            Ethereum {}
          </Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mt={2}>
          <StatGroup>
            <Stat>
              <StatLabel textDecor="underline" fontSize="md">
                Members
              </StatLabel>
              <Box>
                <StatHelpText float="right">
                  <StatArrow type="increase" />
                  2.6%
                </StatHelpText>
                <StatNumber pr={14} fontSize="md">
                  1.533
                </StatNumber>
              </Box>
            </Stat>
          </StatGroup>

          <StatGroup>
            <Stat>
              <StatLabel textDecor="underline" fontSize="md">
                Price
              </StatLabel>
              <Box>
                <StatHelpText float="right">
                  <StatArrow type="decrease" />
                  1.7%
                </StatHelpText>
                <StatNumber pr={14} fontSize="md">
                  $18.375
                </StatNumber>
              </Box>
            </Stat>
          </StatGroup>

          <StatGroup>
            <Stat>
              <StatLabel textDecor="underline" fontSize="md">
                Assets Under Mgmt
              </StatLabel>
              <Box>
                <StatHelpText float="right">
                  <StatArrow type="increase" />
                  3.5%
                </StatHelpText>
                <StatNumber pr={10} fontSize="md">
                  200.7M
                </StatNumber>
              </Box>
            </Stat>
          </StatGroup>
        </Flex>
        <chakra.p mt={2}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
          expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos
          enim reprehenderit nisi, accusamus delectus nihil quis facere in modi
          ratione libero!
        </chakra.p>

        <SocialLinks githubLink={""} twitterLink={""} discordLink={""} />
      </Box>
    </div>
  );
}
