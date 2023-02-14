import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Skeleton,
  SkeletonText,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { ReactElement } from "react";

export const MainLoading = (): ReactElement => {
  return (
    <Card bgColor="white" maxW="xs">
      <CardBody>
        <Skeleton boxSize="3xs" />
        <Stack mt="6" spacing="3">
          <SkeletonText mt="4" noOfLines={2} skeletonHeight="2" spacing="4" />
        </Stack>
      </CardBody>
      <Divider />
      <Flex>
        <Box p="4">
          <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" spacing="4" />
        </Box>
        <Spacer />
        <Box p="4">
          <Skeleton h="20" />
        </Box>
      </Flex>
    </Card>
  );
};
