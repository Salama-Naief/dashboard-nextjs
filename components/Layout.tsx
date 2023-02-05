import { useState } from "react";
import CustomNavbar from "./Topbar";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import Sidebar from "./Sidebar";

interface Props {
  children: any;
}
const Layout: React.FC<Props> = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[1],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 220, md: 220, lg: 220 }}
        >
          <Sidebar />
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 50 }}>
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <CustomNavbar />
          </div>
        </Header>
      }
    >
      {/**chidlern or body of layout */}
      {children}
    </AppShell>
  );
};

export default Layout;
