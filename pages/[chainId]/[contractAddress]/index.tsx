import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import daoList from "../../../constants/daoList.json";
import _ from "lodash";
import { MdAttachMoney, MdPeopleAlt } from "react-icons/md";
import { AiFillBank } from "react-icons/ai";

// Chakra
import { Grid, GridItem, Box, Flex, Text, Tooltip } from "@chakra-ui/react";
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
      "contract_address": contractAddress,
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
        <Flex>
          {/* UPDATE HARD-CODED VALUES! */}
          <Box>
            <Image
              src="https://logos.covalenthq.com/tokens/0x48c3399719b582dd63eb5aadf12a40b4c3f52fa2.png"
              height={50}
              width={50}
              alt="Stakewise-logo"
            />
          </Box>
          <Text fontSize="xl">StakeWise</Text>
        </Flex>

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
              <Grid container spacing={3} maxWidth="lg">
                <Grid item xs={3}>
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
                </Grid>
                <Grid item xs={3}>
                  <StatCard
                    title={`Current Quote Rate of Asset (${dao.contractTicker})`}
                    value={`$${quoteRate}`}
                    valueColor={green[500]}
                    Icon={MdAttachMoney}
                    tooltip="The current quote rate for the DAO token."
                  />
                </Grid>
                <Grid item xs={3}>
                  <StatCard
                    title="Fully Diluted Market Capitalization"
                    value={`$${numbersWithCommas(
                      Number(tokenHolders.mkt_cap).toFixed(0)
                    )}`}
                    valueColor={green[500]}
                    Icon={AiFillBank}
                    tooltip="The market capitalization (valuation) if the max supply of a coin is in circulation. It is equal to Current Price x Max Supply."
                  />
                </Grid>
                <Grid item xs={3}>
                  <StatCard
                    title="Total Number of Members"
                    value={numbersWithCommas(tokenHolders.total_count)}
                    Icon={MdPeopleAlt}
                    tooltip="The total number of members in the DAO."
                  />
                </Grid>

                <Grid item xs={8}>
                  <LineGraph
                    title="Overall Activity"
                    data={transactionsByDate.transactions}
                    color={green[500]}
                    keyX="date"
                    keyY="transactions"
                    tooltip="The number of transactions per day for the past 250 transactions."
                  />
                </Grid>
                <Grid item xs={4}>
                  <Grid
                    component={Box}
                    container
                    sx={{ height: "100%" }}
                    elevation={10}
                  >
                    <Grid item xs={12}>
                      <Tooltip title="Shows the inequality in the distribution of power in a DAO. A value of 0 indicates perfect equality and a value of 1 indicates maximal inequality.">
                        <Text fontSize="xl">
                          Voting Power Concentration (Current Gini Coefficient)
                        </Text>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12}>
                      <Text fontSize="xl">{gini.giniIdx.toFixed(4)}</Text>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{ maxHeight: 200 }}>
                  <PieChartHolders
                    title="Top 25 Token Holders"
                    data={tokenHolders.token_holders}
                    tooltip="The top 25 token holders in the DAO."
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </DashboardLayout>
    </div>
  );
}
