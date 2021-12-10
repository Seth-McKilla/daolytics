import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import daoList from "../../../constants/daoList.json";
import _ from "lodash";

// Chakra
import {
  Box,
  Flex,
  Text,
  Avatar,
  useColorModeValue,
  SimpleGrid,
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
  Summary,
} from "../../../components";

// Utils
import { numbersWithCommas } from "../../../utils/numbers";

export default function DaoDashboard() {
  const { red, green, gray } = theme.colors;
  const bg = useColorModeValue("white", "gray.800");
  const {
    query: { chainId, contractAddress },
    isReady,
  } = useRouter();

  const dao: any = _.find(daoList, { contractAddress });

  // API Calls
  // @ Token Holders & Market Cap
  const { data: tokenHolders } = useSWR(
    isReady &&
      `/api/v1/get-token-holders?chainId=${chainId}&contractId=${contractAddress}`,
    fetcher
  );

  // @ Spot Prices
  const { data: spotPrices } = useSWR(
    isReady &&
      `/api/v1/get-spot-prices?chainId=${chainId}&contractId=${contractAddress}`,
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
      `/api/v1/get-gini-idx?chainId=${chainId}&contractId=${contractAddress}`,
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

          {!dataLoaded ? (
            <Loader />
          ) : (
            <Box>
              <Avatar
                src="https://logos.covalenthq.com/tokens/0x48c3399719b582dd63eb5aadf12a40b4c3f52fa2.png"
                size="xl"
                alt="Stakewise-logo"
              />
              <Text
                fontWeight="bold"
                color="#9090F1"
                float="right"
                ps={2}
                py={8}
                fontSize="xl"
              >
                {dao.contractTicker}
              </Text>
              <Text fontWeight="bold" float="right" ps={3} py={8} fontSize="xl">
                {dao.contractName}
              </Text>
            </Box>
          )}
        </Flex>

        {/* Dao's Summary below  👇 */}
        {/* UPDATE HARD-CODED VALUES! */}
        {/* <SimpleGrid columns={[1, null, 1]} spacing={4}> */}
        {!dataLoaded ? (
          <Loader />
        ) : (
          <SimpleGrid columns={[1, null, 3]} spacing={4} pt={8}>
            <Summary />

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

            {/* <Tooltip title="Shows the inequality in the distribution of power in a DAO. A value of 0 indicates perfect equality and a value of 1 indicates maximal inequality.">
              <Text>
                Voting Power Concentration <br /> (Current Gini Coefficient)
              </Text>
            </Tooltip> */}

            {/* <Box pt={2} ps={2} float="left">
              <Text textAlign="center" fontSize="xl">
                {gini.giniIdx.toFixed(4)}
              </Text>
              <Text color="green" textAlign="center">
                2.3%
              </Text>
            </Box> */}
            <StatCard
              title="Voting Power Concentration (Current Gini Coefficient)"
              value={gini.giniIdx.toFixed(4)}
            />
          </SimpleGrid>
        )}

        {!dataLoaded ? (
          <Loader />
        ) : (
          <SimpleGrid columns={[1, null, 2]} spacing="2rem" pt={10}>
            <LineGraph
              title="Overall Activity"
              data={transactionsByDate.transactions}
              color={green[500]}
              keyX="date"
              keyY="transactions"
              tooltip="The number of transactions per day for the past 250 transactions."
            />

            <PieChartHolders
              title="Top 25 Token Holders"
              data={tokenHolders.token_holders}
              tooltip="The top 25 token holders in the DAO."
            />
          </SimpleGrid>
        )}
      </DashboardLayout>
    </div>
  );
}
