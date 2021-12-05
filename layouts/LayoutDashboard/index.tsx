import { useState, ReactNode } from "react";
import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useColorModeValue,
} from "@chakra-ui/react";

// Components
import { NavSide, NavTop } from "../../components";

export default function LayoutDashboard({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const bg = useColorModeValue("gray.50", "gray.700");

  return (
    <Box as="section" bg={bg} minH="100vh">
      <NavSide />
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <NavSide />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <NavTop onOpen={() => setIsOpen(true)} />

        <Box as="main" p="4">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
