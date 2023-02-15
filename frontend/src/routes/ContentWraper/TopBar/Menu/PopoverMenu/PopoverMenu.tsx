import { CheckIcon, CloseIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import jazzicon from "jazzicon-ts";
import { ReactElement, useEffect, useRef } from "react";

type Props = {
  balance: string;
  disconnectFunction: () => void;
  walletAddress: string;
};

export const commonButtonWidth = "300px";

export const PopoverMenu = ({
  disconnectFunction,
  walletAddress,
  balance,
}: Props): ReactElement => {
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = avatarRef.current;
    if (element && walletAddress) {
      const seed = walletAddress.slice(2, 10);
      const icon = jazzicon(40, parseInt(seed, 16));
      if (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      element.appendChild(icon);
    }
  }, [walletAddress, avatarRef]);

  const { onCopy, hasCopied } = useClipboard(walletAddress);

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          _hover={{ bgColor: "purple.400" }}
          bgColor="purple.500"
          borderRadius="2xl"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          maxW="40"
          textColor="white"
        >
          <Text overflow="hidden" textOverflow="ellipsis">
            {walletAddress}
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        bgColor="purple.500"
        border="none"
        borderRadius="2xl"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        maxWidth={commonButtonWidth}
        mr="10"
        textColor="white"
      >
        <PopoverHeader>
          <Flex alignItems="center" gap="2" h="10" w="full">
            {avatarRef && <Flex alignItems="center" ref={avatarRef} />}

            <Box overflow="hidden">
              <Text
                fontSize="md"
                fontWeight="semibold"
                noOfLines={1}
                textOverflow="ellipsis"
              >
                {walletAddress}
              </Text>
            </Box>
            <Flex gap="2">
              <Button bg="pink.700" onClick={onCopy} p="2">
                {hasCopied ? <CheckIcon /> : <CopyIcon />}
              </Button>
              <Button bg="pink.700" onClick={() => disconnectFunction()} p="2">
                <CloseIcon />
              </Button>
            </Flex>
          </Flex>
        </PopoverHeader>
        <PopoverBody textAlign="center">
          <Text fontSize="2xl" fontWeight="semibold">
            TTPSC Balance
          </Text>
          {/* TODO: Set correct TTPSC Account balance */}
          <Text fontSize="20px" fontWeight="bold">
            {balance}
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverMenu;
