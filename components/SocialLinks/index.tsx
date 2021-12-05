import { Flex, Stack } from "@chakra-ui/react";

import { FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";

import SocialLink from "./SocialLink";

type Props = {
  githubLink: string;
  twitterLink: string;
  discordLink: string;
};

export default function SocialLinks(props: Props) {
  const { githubLink, twitterLink, discordLink } = props;

  return (
    <Flex
      pt={10}
      alignItems="center"
      direction="column"
      as="nav"
      fontSize="md"
      color="gray.600"
      aria-label="Main Navigation"
    >
      <Stack direction="row" spacing={6}>
        <SocialLink label="Twitter" href={twitterLink}>
          <FaTwitter />
        </SocialLink>
        <SocialLink label="Discord" href={discordLink}>
          <FaDiscord />
        </SocialLink>
        <SocialLink label="Github" href={githubLink}>
          <FaGithub />
        </SocialLink>
      </Stack>
    </Flex>
  );
}
