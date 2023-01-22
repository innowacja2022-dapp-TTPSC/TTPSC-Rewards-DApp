import { Transactions } from "@services/PaymentManagerService";

export const getTransactionData = (): Transactions[] => {
  const data: Transactions[] = [
    {
      address: "0x46a4fa36a08e584a26dffeac9231d839e428dfac",
      reward: "Allergro 50PLN",
      quantity: "2",
    },
  ];
  for (let i = 0; i < 25; i++) {
    data.push({
      address: "0x46a4fa36a08e584a26dffeac9231d839e428dfac",
      reward: "Allergro 50PLN",
      quantity: "2",
    });
  }
  return data;
};
