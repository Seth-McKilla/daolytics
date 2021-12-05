import {
  Button,
  Box,
  Flex,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiMenu, FiSearch } from "react-icons/fi";

type Props = {
  onOpen: () => void;
};

export default function NavTop(props: Props) {
  const { onOpen } = props;

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("inherit", "gray.700");

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      w="full"
      px="4"
      bg={bg}
      borderBottomWidth="1px"
      borderColor={borderColor}
      h="14"
    >
      <IconButton
        aria-label="Menu"
        display={{ base: "inline-flex", md: "none" }}
        onClick={onOpen}
        icon={<FiMenu />}
        size="sm"
      />
      <InputGroup w="96" display={{ base: "none", md: "flex" }}>
        <InputLeftElement color="gray.500">
          <FiSearch />
        </InputLeftElement>
        <Input placeholder="Search metrics..." />
      </InputGroup>

      <Box
        as="iframe"
        src="https://coinhippo.io?widget=price-marquee&theme=?"
        title="Price Update"
        frameBorder="0"
        width="100%"
        height="35"
      />

      <Flex align="center">
        <Button colorScheme="purple" variant="outline">
          Connect Wallet
        </Button>
      </Flex>
    </Flex>
  );
}
