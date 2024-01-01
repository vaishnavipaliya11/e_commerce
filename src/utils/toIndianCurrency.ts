export const toIndianCurrency = (num: number) => {
  const curr = num.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
  return curr;
};
