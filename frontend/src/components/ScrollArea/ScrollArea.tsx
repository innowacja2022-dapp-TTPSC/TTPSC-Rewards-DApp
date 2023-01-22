import { BackgroundProps, chakra } from "@chakra-ui/react";
import * as CustomScroll from "@radix-ui/react-scroll-area";
import { ReactElement } from "react";

const Root = chakra(CustomScroll.Root);
const Viewport = chakra(CustomScroll.Viewport);
const Scrollbar = chakra(CustomScroll.Scrollbar);
const Thumb = chakra(CustomScroll.Thumb);

type Props = {
  children: ReactElement;
  thumbColor: BackgroundProps["bg"];
};

export const ScrollArea = ({ children, thumbColor }: Props): ReactElement => {
  return (
    <Root h="full" maxH="full" my="2" overflow="hidden" px="2" w="100%">
      <Viewport h="100%" w="100%">
        {children}
      </Viewport>
      <Scrollbar
        bg="dark.100"
        borderRadius="3"
        display="flex"
        my="2"
        orientation="vertical"
        position="absolute"
        right="4"
        userSelect="none"
        w="2"
      >
        <Thumb bg={thumbColor} borderRadius="3" flex={1} position="relative" />
      </Scrollbar>
    </Root>
  );
};
