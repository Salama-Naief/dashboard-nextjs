import {
  Box,
  Button,
  Flex,
  ScrollArea,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import { links } from "../utils/data/dummy";
function Sidebar() {
  const theme = useMantineTheme();
  return (
    <ScrollArea
      p="md"
      style={{ height: "100%" }}
      offsetScrollbars
      scrollbarSize={8}
    >
      {links.map((link, index) => (
        <div key={index} className="my-4">
          <Text
            fz={17}
            color="gray.7"
            sx={(theme) => ({
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.gray[7]
                  : theme.colors.gray[5],
            })}
          >
            {link.title}
          </Text>

          {link.links.map((linkItem, index) => (
            <Link
              key={index}
              href={
                linkItem.name === "ecommerce"
                  ? "/dashboard"
                  : `/dashboard/${linkItem.name}`
              }
            >
              <Flex
                sx={(theme) => ({
                  textAlign: "center",
                  borderRadius: theme.radius.md,
                  cursor: "pointer",
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[1]
                      : theme.colors.dark[5],
                  "&:hover": {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[5]
                        : theme.colors.gray[1],
                  },
                })}
                gap="xs"
                align="center"
                px={"sm"}
                py={7}
              >
                {linkItem.icon}
                <Text tt={"capitalize"} fw={500}>
                  {linkItem.name}
                </Text>
              </Flex>
            </Link>
          ))}
        </div>
      ))}
    </ScrollArea>
  );
}

export default Sidebar;
