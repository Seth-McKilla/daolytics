import Link from "next/link";
import React from "react";
import { Text, Box, Image, useColorModeValue } from "@chakra-ui/react";
import daoList from "../../constants/daoList.json";
import _ from "lodash";

type Props = {
  name: string;
  ticker: string;
  imgUrl: string;
};

export default function CardDao(props: Props) {
  const { name, ticker, imgUrl } = props;

  const dao = _.find(daoList, {
    contractTicker: _.toUpper(ticker),
  });

  return (
    <Link
      href={`/${dao?.chainId}/${dao?.contractAddress}`}
      passHref
      prefetch={false}
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="256px"
        borderWidth={2}
        rounded="lg"
        shadow="lg"
        cursor="pointer"
        borderColor={useColorModeValue("#DBDBFF", "#212145")}
      >
        <Image src={imgUrl} alt={name} roundedTop="lg" />

        <Box p="6">
          <Box
            as="h6"
            fontWeight="semibold"
            fontSize="md"
            textTransform="uppercase"
            width="100%"
          >
            {`${name.replace("Token", "")}`}
          </Box>

          <Box
            color="#02E2AC"
            mt="1"
            fontWeight="semibold"
            as="samp"
            lineHeight="tight"
            isTruncated
          >
            {ticker}
          </Box>

          <Box>
            <Box as="span" color="gray.600" fontSize="sm"></Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
