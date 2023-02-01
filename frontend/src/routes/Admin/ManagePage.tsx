import {
  Center,
  Flex,
  Grid,
  GridItem,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import AwardsPanel from "./panels/AwardsPanel";
import RequestsPanel from "./panels/RequestsPanel";
import TransactionsPanel from "./panels/TransactionsPanel";
import UsersPanel from "./panels/UsersPanel";

const selectedTabStyle = { color: "blue.700", bg: "purple.200" };

const ManagePage = (): ReactElement => {
  return (
    <Flex alignItems="center" h="100vh" w="100vw">
      <Tabs orientation="vertical" variant="soft-rounded">
        <Flex
          gap={5}
          w="100vw"
        >
          <GridItem colSpan={1} h="100%" rowSpan={4} flexGrow='1'>
            <Center h="100%">
              <TabList
                alignItems="center"
                bgColor="blue.500"
                borderRadius="20px"
                padding="20px"

              >
                <Tab _selected={selectedTabStyle} color="white" fontWeight="semibold">
                  Transactions
                </Tab>
                <Tab _selected={selectedTabStyle} color="white" fontWeight="semibold">
                  Requests
                </Tab>
                <Tab _selected={selectedTabStyle} color="white" fontWeight="semibold">
                  Awards
                </Tab>
                <Tab _selected={selectedTabStyle} color="white" fontWeight="semibold">
                  Users
                </Tab>
              </TabList>
            </Center>
          </GridItem>
          <GridItem
            flexGrow='1'
            border="1px"
            borderRadius="30px"
            colSpan={3}
            marginRight="30px"
          >
            <TabPanels h='100%'>
              <TabPanel>
                <TransactionsPanel />
              </TabPanel>
              <TabPanel>
                {" "}
                <RequestsPanel />
              </TabPanel>
              <TabPanel>
                {" "}
                <AwardsPanel />
              </TabPanel>
              <TabPanel>
                {" "}
                <UsersPanel />
              </TabPanel>
            </TabPanels>
          </GridItem>
          <Spacer flexGrow="1" />
        </Flex>
      </Tabs >
    </Flex >
  );
};

export default ManagePage;
