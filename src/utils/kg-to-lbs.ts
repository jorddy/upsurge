// 1kg (kilo) = 2.20462262 pounds (lbs)
export const convertKgToLbs = (value: number) => {
  const convertedValue = value * 2.20462262;
  return convertedValue.toFixed(2);
};
