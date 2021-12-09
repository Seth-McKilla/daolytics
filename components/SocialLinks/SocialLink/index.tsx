import { ReactNode } from "react";
import { useColorModeValue, chakra, VisuallyHidden } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  label: string;
  href: string;
};

export default function SocialLink(props: Props) {
  const { children, label, href } = props;

  //color = useColorModeValue("blackAlpha.100", "whiteAlpha.100");

  return (
    <chakra.button
      color={useColorModeValue("black", "gray.400")}
      rounded="full"
      boxShadow="base"
      w={8}
      h={8}
      cursor="pointer"
      as="a"
      href={href}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      // _hover={{
      //   bg,
      // }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
}
