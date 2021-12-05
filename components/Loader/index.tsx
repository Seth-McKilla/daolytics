// Chakra
import { Box, Spinner, Text } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Box
      style={{
        display: "flex",
        width: "100%",
        height: "65vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Spinner size="xl" />
      <Text fontSize="lg">Fetching analytics...</Text>
    </Box>
  );
}
