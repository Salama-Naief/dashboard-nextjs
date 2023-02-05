import React, { useRef, useState } from "react";

import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft, BsChevronDown } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { SiShopware } from "react-icons/si";

import {
  ActionIcon,
  Avatar,
  Button,
  ButtonStylesParams,
  Divider,
  Drawer,
  Flex,
  Group,
  Image,
  Menu,
  NumberInput,
  NumberInputHandlers,
  ScrollArea,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";

import avatar from "../utils/data/avatar.jpg";

import { cartData, chatData, userProfileData } from "../utils/data/dummy";

interface ButtonProps {
  item: any;
}
const CartItems: React.FC<ButtonProps> = ({ item }) => {
  const [value, setValue] = useState(0);
  const handlers = useRef<NumberInputHandlers>();
  return (
    <Flex gap="sm" align={"center"}>
      <Image
        radius="sm"
        width={80}
        height={80}
        src={item.image.src}
        alt={item.name}
      />
      <div>
        <Title order={5}>{item.name}</Title>
        <Text my={"xs"}>{item.category}</Text>
        <Flex align={"center"} gap="sm">
          <Text>{item.price}</Text>
          <Group spacing={5}>
            <ActionIcon
              size={32}
              variant="default"
              onClick={() => handlers.current.decrement()}
            >
              –
            </ActionIcon>

            <NumberInput
              hideControls
              value={value}
              onChange={(val) => setValue(val)}
              handlersRef={handlers}
              max={100}
              min={0}
              step={1}
              styles={{ input: { width: 56, textAlign: "center" } }}
            />

            <ActionIcon
              size={32}
              variant="default"
              onClick={() => handlers.current.increment()}
            >
              +
            </ActionIcon>
          </Group>
        </Flex>
      </div>
    </Flex>
  );
};

// main function of navbar
function Navbar() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const color = "#00000";
  const leftSideBar = true;
  const customFun = (type: string) => {};

  return (
    <Flex
      p={{ base: "md", md: "lg" }}
      justify="space-between"
      className="w-full z-10"
    >
      <Link href="/">
        <Flex gap="xs" align="center">
          <div className="text-xl md:text-2xl">
            <SiShopware />
          </div>
          <span className="font-bold text-lg md:text-2xl">Shoppy</span>
        </Flex>
      </Link>
      <Flex gap={{ base: "sm", sm: "md", md: "lg" }} align="center">
        {/**cart */}
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="Shopping Cart"
          padding="xl"
          size="xl"
          position="right"
        >
          <ScrollArea
            p="md"
            style={{ height: "100%" }}
            offsetScrollbars
            scrollbarSize={8}
          >
            {cartData.map((item, index) => (
              <div key={index}>
                <CartItems item={item} />
                <Divider my={"sm"} />
              </div>
            ))}
            <div>
              <Flex align={"center"} justify="space-between" my={"sm"}>
                <Text fz={"lg"} fw={700}>
                  Sub Total
                </Text>
                <Text fz={"md"}>$899</Text>
              </Flex>
              <Flex align={"center"} justify="space-between" my={"sm"}>
                <Text fz={"lg"} fw={700}>
                  Total
                </Text>
                <Text fz={"md"}>$899</Text>
              </Flex>
            </div>
            <button className="w-full p-3 rounded-md bg-cyan-500 text-white  text-lg hover:shadow-md active:scale-95 transition-all duration-200">
              Place Order
            </button>
          </ScrollArea>
        </Drawer>

        <Group position="center">
          <Tooltip label="Cart">
            <ActionIcon onClick={() => setOpened(true)}>
              <FiShoppingCart size={20} />
            </ActionIcon>
          </Tooltip>
        </Group>

        {/**chat */}
        <Menu withArrow arrowPosition="center">
          <Menu.Target>
            <Tooltip label="Chat">
              <div className="relative">
                <ActionIcon>
                  <BsChatLeft size={20} />
                </ActionIcon>
                <div
                  className={`absolute top-0 right-0 rounded-full w-2 h-2 bg-cyan-500`}
                ></div>
              </div>
            </Tooltip>
          </Menu.Target>
          <Menu.Dropdown p={"sm"}>
            <Title order={4} p="lg">
              Messages
            </Title>
            {chatData?.map((item, index) => (
              <div key={index}>
                <Menu.Item>
                  <Flex align={"center"} gap="md">
                    <Avatar
                      radius="xl"
                      src={item.image.src}
                      alt={item.message}
                    />
                    <div>
                      <Title order={6}>{item.message}</Title>
                      <Text color={"gray.6"}>{item.desc}</Text>
                      <Text fz="xs" color={"gray.5"}>
                        {item.time}
                      </Text>
                    </div>
                  </Flex>
                </Menu.Item>
                <Divider my="xs" />
              </div>
            ))}
            <Menu.Item color="cyan.6">
              <Link href={"/dashboard/messages"}>
                <Title order={5}>See all messages</Title>
              </Link>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        {/**notification menu */}

        <Menu withArrow>
          <Tooltip label="Notifications">
            <Menu.Target>
              <div className="relative">
                <ActionIcon>
                  <RiNotification3Line size={20} />
                </ActionIcon>
                <div
                  className={`absolute top-0 right-0 rounded-full w-2 h-2 bg-green-500`}
                ></div>
              </div>
            </Menu.Target>
          </Tooltip>
          <Menu.Dropdown p={"sm"}>
            <Title order={4} p="lg">
              Notifications
            </Title>
            {chatData?.map((item, index) => (
              <>
                <Menu.Item key={index}>
                  <Flex align={"center"} gap="md">
                    <Avatar
                      radius="xl"
                      src={item.image.src}
                      alt={item.message}
                    />
                    <div>
                      <Title order={6}>{item.message}</Title>
                      <Text color={"gray.6"}>{item.desc}</Text>
                    </div>
                  </Flex>
                </Menu.Item>
                <Divider my="xs" />
              </>
            ))}
            <Menu.Item color="cyan.6">
              <Link href={"/dashboard/messages"}>
                <Title order={5}>See all notifications</Title>
              </Link>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        {/**user image profile */}
        <Menu withArrow>
          <Menu.Target>
            <Tooltip label="Profile">
              <Flex align="center" gap="xs" style={{ cursor: "pointer" }}>
                <Image
                  radius="xl"
                  width={28}
                  height={28}
                  src={avatar.src}
                  alt="Random unsplash image"
                />
                <Flex
                  className="md:flex hidden "
                  sx={(theme) => ({
                    color:
                      theme.colorScheme === "dark"
                        ? theme.colors.gray[6]
                        : theme.colors.gray[5],
                  })}
                >
                  <Text>Hi,</Text>
                  <Text fz="md" fw={650}>
                    Michael
                  </Text>
                </Flex>
                <BsChevronDown size={12} />
              </Flex>
            </Tooltip>
          </Menu.Target>
          <Menu.Dropdown p={"md"}>
            <Title order={4}>Profile</Title>

            <Flex gap={"sm"} align="center" my={"md"}>
              <Avatar src={avatar.src} alt="profile" radius={"xl"} size="lg" />
              <div>
                <Title order={5}>Michael Roberts</Title>
                <Text fz={"md"} color="gray.6">
                  Administrator
                </Text>
                <Text fz={"sm"} color={"gray.6"}>
                  info@shop.com
                </Text>
              </div>
            </Flex>
            <Divider />
            {userProfileData.map((item, index) => (
              <div key={index}>
                <Menu.Item py={"md"}>
                  <Flex align={"center"} gap="sm">
                    <div
                      className="p-2.5 rounded text-xl"
                      style={{
                        backgroundColor: item.iconBg,
                        color: item.iconColor,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <Title order={6}>{item.title}</Title>
                      <Text color={"gray.6"}>{item.desc}</Text>
                    </div>
                  </Flex>
                </Menu.Item>
                <Divider />
              </div>
            ))}
            <Menu.Item color="cyan.6" py={"sm"}>
              <Title align="center" order={5}>
                Logout
              </Title>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </Flex>
  );
}

export default Navbar;
