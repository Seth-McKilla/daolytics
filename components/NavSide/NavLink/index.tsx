import { ReactNode } from "react";

// Chakra
import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";

type Props = {
  icon: any;
  children: ReactNode;
};

export default function NavLink(props: Props) {
  const { icon, children, ...rest } = props;

  const bg = useColorModeValue("gray.100", "gray.900");

  const color = useColorModeValue("inherit", "gray.400");
  const hoverColor = useColorModeValue("gray.900", "gray.500");

  return (
    <Flex
      align="center"
      px="4"
      pl="4"
      py="3"
      cursor="pointer"
      color={color}
      _hover={{
        bg: bg,
        color: hoverColor,
      }}
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      {...rest}
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="4"
          _groupHover={{
            color: hoverColor,
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
}
