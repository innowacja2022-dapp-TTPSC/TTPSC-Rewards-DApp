import {
  Center,
  Flex,
  Grid,
  GridItem,
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
    <>
      <Flex alignItems="center" h="100vh" w="100vw">
        <Tabs orientation="vertical" variant="soft-rounded">
          <Grid
            gap={5}
            templateColumns="repeat(4, 1fr)"
            templateRows="repeat(1, 1fr)"
            w="100vw"
          >
            <GridItem colSpan={1} h="100%" rowSpan={4}>
              <Center h="100%">
                <TabList
                  alignItems="center"
                  bgGradient="linear(to-r, #923086 0.18%, #D03A8C 100%)"
                  borderRadius="20px"
                  padding="20px"
                >
                  <Tab _selected={selectedTabStyle} color="white">
                    <b>Transactions</b>
                  </Tab>
                  <Tab _selected={selectedTabStyle} color="white">
                    <b>Requests</b>
                  </Tab>
                  <Tab _selected={selectedTabStyle} color="white">
                    <b>Awards</b>
                  </Tab>
                  <Tab _selected={selectedTabStyle} color="white">
                    <b>Users</b>
                  </Tab>
                </TabList>
              </Center>
            </GridItem>
            <GridItem
              border="1px"
              borderRadius="30px"
              colSpan={3}
              marginRight="30px"
            >
              <TabPanels>
                <TabPanel style={{ minHeight: "500px" }}>
                  {" "}
                  <TransactionsPanel />
                </TabPanel>
                <TabPanel style={{ minHeight: "500px" }}>
                  {" "}
                  <RequestsPanel />
                </TabPanel>
                <TabPanel style={{ minHeight: "500px" }}>
                  {" "}
                  <AwardsPanel />
                </TabPanel>
                <TabPanel style={{ minHeight: "500px" }}>
                  {" "}
                  <UsersPanel />
                </TabPanel>
              </TabPanels>
            </GridItem>
          </Grid>
        </Tabs>
      </Flex>
    </>
  );
};

export default ManagePage;
