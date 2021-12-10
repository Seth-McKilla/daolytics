import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  useColorMode,
  Container,
  Center,
  Spacer,
} from "@chakra-ui/react";

import {
  AiFillSignal,
  AiFillFilePpt,
  AiOutlineWechat,
  AiOutlineTeam,
  AiOutlineCalendar,
} from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { ChevronLeftIcon, SettingsIcon } from "@chakra-ui/icons";

// Components
import NavLink from "./NavLink";
import { SocialLinks } from "..";
import { Text } from "recharts";

type Props = {
  showLinks: boolean;
};

export default function NavSide(props: Props) {
  const { showLinks } = props;

  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const text = useColorModeValue("dark", "light");
  const bg = useColorModeValue("#DBDBFF", "gray.800");
  const borderColor = useColorModeValue("inherit", "gray.700");

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="100vh"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={bg}
      borderColor={useColorModeValue("#DBDBFF", "#212145")}
      borderRightWidth="1px"
      w="60"
    >
      <Flex px="4" py="5" align="center">
        <Image src="/logo-full.png" alt="logo" width={225} height={225} />
      </Flex>
      {showLinks && (
        <Flex
          direction="column"
          as="nav"
          fontSize="sm"
          color="gray.600"
          aria-label="Main Navigation"
        >
          <NavLink icon={AiFillSignal}>DashBoard</NavLink>
          <NavLink icon={AiFillFilePpt}>Proposals</NavLink>
          <NavLink icon={AiOutlineWechat}>News</NavLink>
          <NavLink icon={AiOutlineTeam}>Token Holders</NavLink>
          <NavLink icon={AiOutlineCalendar}>Events</NavLink>
        </Flex>
      )}

      <Flex
        display="bottom"
        direction="row"
        as="nav"
        fontSize="md"
        color="#212145"
        aria-label="Main Navigation"
        position="absolute"
        bottom="16%"
        width="100%"
      >
        <Center>
          {showLinks && (
            <Link href="/" passHref>
              <Button
                height="45px"
                width="150px"
                borderRadius="full"
                borderWidth={2}
                borderColor="#DBDBFF"
                bg="white"
                size="md"
                fontSize="lg"
                boxShadow="md"
                leftIcon={<ChevronLeftIcon />}
              >
                DAOs List
              </Button>
            </Link>
          )}
        </Center>
      </Flex>

      <Flex
        pt={3}
        pr={2}
        alignItems="center"
        direction="row"
        as="nav"
        fontSize="md"
        color="gray.600"
        aria-label="Main Navigation"
        position="absolute"
        bottom="10%"
        width="100%"
      >
        <Container width="150">
          <IconButton
            borderRadius="full"
            bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
            color={useColorModeValue({}, "gray.400")}
            size="md"
            fontSize="lg"
            aria-label="setting"
            ml={{ base: "0", md: "3" }}
            icon={<SettingsIcon />}
            boxShadow="base"
          />

          <IconButton
            borderRadius="full"
            borderWidth={2}
            borderColor="purple.900"
            bg={useColorModeValue("blackAlpha.100", "gray.750")}
            color={useColorModeValue({}, "gray.400")}
            size="md"
            fontSize="lg"
            aria-label={`Switch to ${text} mode`}
            ml={{ base: "0", md: "3" }}
            onClick={toggleColorMode}
            icon={<SwitchIcon />}
          />
        </Container>
      </Flex>
      <Flex
        pt={3}
        alignItems="center"
        direction="column"
        as="nav"
        fontSize="md"
        color="gray.600"
        aria-label="Main Navigation"
        position="absolute"
        bottom="5%"
        width="100%"
      >
        <SocialLinks
          githubLink="https://github.com/Seth-McKilla/daolytics"
          twitterLink="https://twitter.com/daolytics0x"
          discordLink="https://discord.com/channels/913887015953649716/913887015953649718"
        />
      </Flex>

      <Flex
        pt={3}
        alignItems="center"
        direction="column"
        as="nav"
        fontSize="md"
        color="gray.600"
        aria-label="Main Navigation"
        position="fixed"
        bottom="1%"
        width="100%"
      >
        {" "}
        <Box as="footer">
          <Text color={useColorModeValue("gray.700", "white")}>
            Made with ❤ by Sabelo, Cheeto And Seth
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
