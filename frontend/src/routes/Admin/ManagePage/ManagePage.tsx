import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { AddAward } from "./AwardsPanel/AddAward/AddAward";
import AwardsPanel from "./AwardsPanel/AwardsPanel";
import RequestsPanel from "./RequestsPanel/RequestsPanel";
import TransactionsPanel from "./TransactionsPanel/TransactionsPanel";
import UsersPanel from "./UsersPanel/UsersPanel";

const selectedTabStyle = { color: "white" };

export const ManagePage = (): ReactElement => {
  return (
    <Flex
      alignItems="center"
      h="calc(100% - 80px)"
      justifyContent="center"
      px="10"
      py="32"
    >
      <Tabs
        alignItems="center"
        gap="10"
        h="full"
        orientation="vertical"
        variant="soft-rounded"
        w="full"
      >
        <Flex gap="5" h="fit-content">
          <TabList
            alignItems="center"
            bgColor="purple.500"
            borderRadius="2xl"
            gap="2"
            px="8"
            py="5"
          >
            <Tab
              _selected={selectedTabStyle}
              color="gray.300"
              fontSize="2xl"
              fontWeight="semibold"
            >
              Transactions
            </Tab>
            <Tab
              _selected={selectedTabStyle}
              color="gray.300"
              fontSize="2xl"
              fontWeight="semibold"
            >
              Requests
            </Tab>
            <Tab
              _selected={selectedTabStyle}
              color="gray.300"
              fontSize="2xl"
              fontWeight="semibold"
            >
              Awards
            </Tab>
            <Tab
              _selected={selectedTabStyle}
              color="gray.300"
              fontSize="2xl"
              fontWeight="semibold"
            >
              Users
            </Tab>
          </TabList>
        </Flex>
        <Flex h="full" w="full">
          <TabPanels
            borderColor="purple.500"
            borderRadius="xl"
            borderWidth="medium"
            h="full"
          >
            <TabPanel h="full" maxH="full">
              <TransactionsPanel />
            </TabPanel>
            <TabPanel h="full" maxH="full">
              <RequestsPanel />
            </TabPanel>
            <TabPanel h="full" maxH="full">
              <AwardsPanel />
              <AddAward />
            </TabPanel>
            <TabPanel h="full" maxH="full">
              <UsersPanel />
            </TabPanel>
          </TabPanels>
        </Flex>
      </Tabs>
    </Flex>
  );
};
