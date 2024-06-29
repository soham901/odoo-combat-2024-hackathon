const INRFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

function formatINR(value: number) {
  const formattedValue = INRFormatter.format(value);
  const withSpace = formattedValue.replace("₹", "₹ ");
  return withSpace;
}

export default formatINR;
