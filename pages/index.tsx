import Head from "next/head";
import daoList from "../constants/daoList.json";

// Chakra
import {
  Box,
  Center,
  SimpleGrid,
  useColorModeValue,
  Heading,
  Divider,
} from "@chakra-ui/react";

// Layout
import { LandingLayout } from "../layouts";

// Components
import { DaoCard } from "../components";

type Dao = {
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  contract_address: string;
  supports_erc: boolean;
  logo_url: string;
  quote_rate: number;
  rank: number;
};

type Props = {
  daos: Dao[];
};

export default function Home(props: Props) {
  const { daos } = props;

  return (
    <div>
      <Head>
        <title>Covalent DAO Dashboard</title>
        <meta name="description" content="DAO Analytics Dashboard" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LandingLayout>
        <Center>
          <Box>
            <Box>
              <Heading
                color={useColorModeValue("gray.700", "white")}
                as="h1"
                size="2xl"
                py={10}
              >
                DAO List
                <Divider
                  borderColor={useColorModeValue("black", "white")}
                  borderWidth={2}
                />
              </Heading>
            </Box>
            <SimpleGrid columns={[1, null, 4]} spacing={5}>
              {daos.length === 0
                ? "Error fetching DAOs"
                : daos.map((dao) => (
                    <DaoCard
                      key={dao.contract_name}
                      name={dao.contract_name}
                      ticker={dao.contract_ticker_symbol}
                      price={dao.quote_rate}
                      imgUrl={dao.logo_url}
                    />
                  ))}
            </SimpleGrid>
          </Box>
        </Center>
      </LandingLayout>
    </div>
  );
}

export async function getServerSideProps() {
  const daoNames: string[] = [];
  const daoTickers: string[] = [];
  daoList.map(({ contractName, contractTicker }) => {
    daoNames.push(contractName);
    daoTickers.push(contractTicker);
  });

  let daos = [];

  const res = await fetch(
    `https://api.covalenthq.com/v1/pricing/tickers/?tickers=${daoTickers.toString()}&key=${
      process.env.COVALENT_API_KEY
    }`
  );
  const { data } = await res.json();

  if (!data) return { props: {} };

  // Remove duplicate tickers
  daos = data.items.filter(({ contract_name }: { contract_name: string }) =>
    daoNames.includes(contract_name)
  );

  return { props: { daos } };
}
