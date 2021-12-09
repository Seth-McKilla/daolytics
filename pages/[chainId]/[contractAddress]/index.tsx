import { useState, useEffect } from "react";
import Head from "next/head";
//import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import daoList from "../../../constants/daoList.json";
import _ from "lodash";
import { MdAttachMoney, MdPeopleAlt } from "react-icons/md";
import { AiFillBank } from "react-icons/ai";

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
} from "@chakra-ui/react";
import theme from "@chakra-ui/theme";

// Layout
import { DashboardLayout } from "../../../layouts";

// Components
import {
  PieChartSentiment,
  PieChartHolders,
  StatCard,
  LineGraph,
  Loader,
  SocialLinks,
} from "../../../components";

// Utils
import { numbersWithCommas } from "../../../utils/numbers";

type Dao = {
  chainId: string;
  contractName: string;
  contractTicker: string;
  contractAddress: string;
  logoUrl: string;
};

export default function DaoDashboard() {
  const { red, green, gray } = theme.colors;
  const bg = useColorModeValue("white", "gray.800");
  const {
    query: { chainId, contractAddress },
    isReady,
  } = useRouter();

  const dao: Dao = _.find(daoList, { contractAddress });

  // API Calls
  // @ Token Holders & Market Cap
  const { data: tokenHolders } = useSWR(
    isReady &&
      `/api/v1/get-token-holders?chainId=${chainId}&contractId=${contractAddress}&ticker=${dao.contractTicker}`,
    fetcher
  );

  // @ Spot Prices
  const { data: spotPrices } = useSWR(
    isReady && `/api/v1/get-spot-prices?ticker=${dao.contractTicker}`,
    fetcher
  );
  const [quoteRate, setQuoteRate] = useState(null);
  useEffect(() => {
    if (!spotPrices) return;
    const spotPrice = _.find(spotPrices.spot_prices, {
      contract_address: contractAddress,
    });
    spotPrice && setQuoteRate(spotPrice.quote_rate);
  }, [spotPrices, contractAddress]);

  // @ Transactions
  const { data: transactionsByDate } = useSWR(
    isReady &&
      `/api/v1/get-transactions?chainId=${chainId}&contractId=${contractAddress}`,
    fetcher
  );

  // @ Sentiment Analysis
  const { data: sentiment } = useSWR(
    isReady &&
      `/api/v1/get-sentiment?keyword=${dao.contractName.replace("Token", "")}`,
    fetcher
  );

  // @ Gini Index
  const { data: gini } = useSWR(
    isReady &&
      `/api/v1/get-gini-idx?chainId=${chainId}&contractId=${contractAddress}&ticker=${dao.contractTicker}`,
    fetcher
  );

  const dataLoaded =
    !!tokenHolders &&
    !!spotPrices &&
    !!transactionsByDate &&
    !!sentiment &&
    !!gini;

  // Helper functions
  const getSentiment = (type: string) => {
    if (!sentiment) return 0;
    return Number(sentiment[type]);
  };

  return (
    <div>
      <Head>
        <title>DAOlytics</title>
        <meta name="description" content="DAO Analytics Dashboard" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DashboardLayout>
        {/* Dao's logo below  👇 */}
        <Flex>
          {/* UPDATE HARD-CODED VALUES! */}
          <Box>
            <Avatar
              src="https://logos.covalenthq.com/tokens/0x48c3399719b582dd63eb5aadf12a40b4c3f52fa2.png"
              size="xl"
              alt="Stakewise-logo"
            />
            <Text color="#9090F1" float="right" ps={2} py={8} fontSize="xl">
              SWE {}
            </Text>
            <Text float="right" ps={3} py={8} fontSize="xl">
              StakeWise {}
            </Text>
          </Box>
        </Flex>

        {/* Dao's Summary below  👇 */}
        {/* UPDATE HARD-CODED VALUES! */}

        <Box
          mt={3}
          mb={3}
          mx="auto"
          px={8}
          py={4}
          rounded="lg"
          shadow="lg"
          bg={useColorModeValue("white", "gray.800")}
          maxW="2xl"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <chakra.span
              fontSize="2xl"
              fontWeight="bold"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              Summary
            </chakra.span>
          </Flex>
          <Flex mt={1}>
            <Text
              fontSize="md"
              color={useColorModeValue("gray.700", "white")}
              fontWeight="500"
              _hover={{
                color: useColorModeValue("gray.600", "gray.200"),
              }}
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
              color={useColorModeValue("gray.700", "white")}
              fontWeight="500"
              _hover={{
                color: useColorModeValue("gray.600", "gray.200"),
              }}
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
          <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos
            enim reprehenderit nisi, accusamus delectus nihil quis facere in
            modi ratione libero!
          </chakra.p>

          <SocialLinks githubLink={""} twitterLink={""} discordLink={""} />
        </Box>

        <Grid
          h="200px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <Grid item xs={12}>
            {!dataLoaded ? (
              <Loader />
            ) : (
              <Grid container spacing={3} maxWidth="4xl">
                <Box
                  mb={3}
                  alignItems="center"
                  rounded="lg"
                  shadow="lg"
                  bg={bg}
                  maxW="4xl"
                  width="200px"
                >
                  <PieChartSentiment
                    data={[
                      {
                        name: "Positive 😊",
                        value: getSentiment("positive"),
                        color: green[500],
                      },
                      {
                        name: "Negative 😢",
                        value: getSentiment("negative"),
                        color: red[500],
                      },
                      {
                        name: "Neutral 😐",
                        value: getSentiment("neutral"),
                        color: gray[600],
                      },
                    ]}
                    title="Sentiment Analysis"
                    tooltip="Calculates the sentiment of DAO using Twitter data. Restricted to 100 tweets for current version."
                  />
                </Box>

                <Box
                  pt={2}
                  mb={3}
                  rounded="lg"
                  shadow="lg"
                  bg={bg}
                  maxW="4xl"
                  width="450px"
                  height="250px"
                >
                  <Tooltip title="Shows the inequality in the distribution of power in a DAO. A value of 0 indicates perfect equality and a value of 1 indicates maximal inequality.">
                    <Text textAlign="center" fontSize="xl">
                      Voting Power Concentration <br /> (Current Gini
                      Coefficient)
                    </Text>
                  </Tooltip>

                  <Box pt={14} ps={10} float="left">
                    <Text textAlign="center" fontSize="xl">
                      {gini.giniIdx.toFixed(4)}
                    </Text>
                    <Text color="green" textAlign="center">
                      2.3%
                    </Text>
                  </Box>
                  <Box
                    pt={7}
                    ps={15}
                    float="right"
                    width="330px"
                    height="270px"
                  >
                    <LineGraph
                      title="Overall Activity"
                      data={transactionsByDate.transactions}
                      color={green[500]}
                      keyX="date"
                      keyY="transactions"
                      tooltip="The number of transactions per day for the past 250 transactions."
                    />
                  </Box>
                </Box>

                {/* <Box
                  mb={3}
                  alignItems="center"
                  rounded="lg"
                  shadow="lg"
                  bg={bg}
                  maxW="4xl"
                  width="250px"
                  height="100px"
                >
                  <StatCard
                    title={`Current Quote Rate of Asset (${dao.contractTicker})`}
                    value={`$${quoteRate}`}
                    valueColor={green[500]}
                    Icon={MdAttachMoney}
                    tooltip="The current quote rate for the DAO token."
                  />
                </Box> */}

                {/* <Box
                  mb={3}
                  alignItems="center"
                  rounded="lg"
                  shadow="lg"
                  bg={bg}
                  maxW="4xl"
                  width="250px"
                  height="250px"
                >
                  <StatCard
                    title="Fully Diluted Market Capitalization"
                    value={`$${numbersWithCommas(
                      Number(tokenHolders.mkt_cap).toFixed(0)
                    )}`}
                    valueColor={green[500]}
                    Icon={AiFillBank}
                    tooltip="The market capitalization (valuation) if the max supply of a coin is in circulation. It is equal to Current Price x Max Supply."
                  />
                </Box> */}

                {/* <Grid item xs={3}>
                  <StatCard
                    title="Total Number of Members"
                    value={numbersWithCommas(tokenHolders.total_count)}
                    Icon={MdPeopleAlt}
                    tooltip="The total number of members in the DAO."
                  />
                </Grid> */}

                <Box
                  mb={3}
                  rounded="lg"
                  shadow="lg"
                  bg={bg}
                  maxW="4xl"
                  width="700px"
                  height="300px"
                >
                  <LineGraph
                    title="Overall Activity"
                    data={transactionsByDate.transactions}
                    color={green[500]}
                    keyX="date"
                    keyY="transactions"
                    tooltip="The number of transactions per day for the past 250 transactions."
                  />
                </Box>

                <Box
                  item
                  xs={12}
                  sx={{ maxHeight: 450 }}
                  maxWidth={550}
                  mb={3}
                  rounded="lg"
                  shadow="lg"
                  bg={bg}
                >
                  <PieChartHolders
                    title="Top 25 Token Holders"
                    data={tokenHolders.token_holders}
                    tooltip="The top 25 token holders in the DAO."
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </DashboardLayout>
    </div>
  );
}
