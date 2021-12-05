import Link from "next/link";

// Chakra
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

// Utils
import { numbersWithCommas } from "../../utils/numbers";

type Props = {
  title: String;
  rows: { address: string; balance: number; total_supply: number }[];
};

const BasicTable = (props: Props) => {
  const { title, rows } = props;
  const { total_supply } = rows[0];

  const style = {
    header: {
      fontSize: 20,
      fontWeight: 600,
    },
    cell: {
      fontSize: 18,
    },
  };

  return (
    <Box elevation={10} style={{ height: "100%" }}>
      <Text fontSize="h5" align="center">
        {title}
      </Text>
      <Table>
        <Thead>
          <Tr>
            <Th sx={style.header}>Address</Th>
            <Th align="right" sx={style.header}>
              Balance
            </Th>
            <Th align="right" sx={style.header}>
              Percentage
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows.map(({ address, balance }) => (
            <Tr
              key={address}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <Td component="th" scope="row" sx={style.cell}>
                <Link href={`https://etherscan.io/address/${address}`} passHref>
                  <a>{address}</a>
                </Link>
              </Td>
              <Td align="right" sx={style.cell}>
                {numbersWithCommas(Math.floor(balance * Math.pow(10, -18)))}
              </Td>
              <Td align="right" sx={style.cell}>
                {`${Number((balance / total_supply) * 100).toFixed(2)}%`}{" "}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default BasicTable;
