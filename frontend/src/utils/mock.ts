import { Requests } from "@services/PaymentRequestService";
import { Transactions } from "@services/RewardManagerService";

export const getTransactionData = (): Transactions[] => {
  const data: Transactions[] = [
    {
      address: "0x46a4fa36a08e584a26dffeac9231d839e428dfac",
      reward: "Allergro 50PLN",
      quantity: "2",
      id: 5,
    },
  ];
  for (let i = 0; i < 25; i++) {
    data.push({
      address: "0x46a4fa36a08e584a26dffeac9231d839e428dfac",
      reward: "Allergro 50PLN",
      quantity: "2",
      id: 5,
    });
  }
  return data;
};

export const getRequestList = (): Requests[] => {
  const data: Requests[] = [
    {
      address: "0x46a4fa36a08e584a26dffeac9231d839e428dfac",
      amount: 3,
      decisionMaker: "0x46a4fa36a08e584a26dffeac9231d839e428dfac",
      decisionReason: "",
      requestReason:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      status: 0,
    },
  ];

  for (let i = 0; i < 25; i++) {
    data.push({
      address: "0x46a4fa36a08e584a26dffeac9231d839e428dfac",
      amount: 3,
      decisionMaker: "0x46a4fa36a08e584a26dffeac9231d839e428dfac",
      decisionReason: "",
      requestReason: "Bo tak",
      status: 0,
    });
  }
  return data;
};
