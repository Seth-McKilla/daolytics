import Head from "next/head";
import daos from "../constants/daoList.json";

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

export default function Home() {
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
                      key={dao.contractAddress}
                      name={dao.contractName}
                      ticker={dao.contractTicker}
                      imgUrl={dao.logoUrl}
                    />
                  ))}
            </SimpleGrid>
          </Box>
        </Center>
      </LandingLayout>
    </div>
  );
}
