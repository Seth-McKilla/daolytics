import Image from "next/image";
import {
  Button,
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";

import {
  AiFillSignal,
  AiFillFilePpt,
  AiOutlineWechat,
  AiOutlineTeam,
  AiOutlineCalendar,
} from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { ChevronLeftIcon } from "@chakra-ui/icons";

// Components
import NavLink from "./NavLink";
import { SocialLinks } from "..";

type Props = {
  showLinks: boolean;
};

export default function NavSide(props: Props) {
  const { showLinks } = props;

  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const text = useColorModeValue("dark", "light");
  const bg = useColorModeValue("purple.200", "gray.800");
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
      borderColor={borderColor}
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
        pt={260}
        pr={2}
        alignItems="center"
        direction="column"
        as="nav"
        fontSize="md"
        color="gray.600"
        aria-label="Main Navigation"
      >
        {showLinks && (
          <Button
            height="45px"
            width="150px"
            borderRadius="full"
            borderWidth={2}
            colorScheme="purple"
            size="md"
            fontSize="lg"
            leftIcon={<ChevronLeftIcon />}
          >
            DAOs List
          </Button>
        )}
      </Flex>

      <SocialLinks
        githubLink="https://github.com/Seth-McKilla/daolytics"
        twitterLink="https://twitter.com/SethMcKilla"
        discordLink="https://discord.com/channels/913887015953649716/913887015953649718"
      />

      <Flex
        pt={3}
        pr={2}
        alignItems="center"
        direction="column"
        as="nav"
        fontSize="md"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <IconButton
          borderRadius="full"
          borderWidth={2}
          colorScheme="purple"
          size="md"
          fontSize="lg"
          aria-label={`Switch to ${text} mode`}
          ml={{ base: "0", md: "3" }}
          onClick={toggleColorMode}
          icon={<SwitchIcon />}
        />
      </Flex>
    </Box>
  );
}
