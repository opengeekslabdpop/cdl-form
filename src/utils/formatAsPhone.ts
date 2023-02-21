export const formatAsPhone = (
  value?: string,
  previousValue?: string
): string => {
  // return nothing if no value
  if (!value) return "";

  if (value.includes("+1")) {
    value = value.replace("+1", "");
  }

  // only allows 0-9 inputs
  const currentValue = value.replace(/[^\d+]/g, "");
  const cvLength = currentValue.length;

  if (!previousValue || value.length > previousValue.length) {
    // returns: "x", "xx", "xxx"
    if (cvLength < 4) return currentValue;

    // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
    if (cvLength < 7)
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;

    // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
      3,
      6
    )}-${currentValue.slice(6, 10)}`;
  }

  return value;
};

export const phoneToServerPhone = (phone = "") => {
  const usMinLength = 10;
  const startWithPlus = phone[0] === "+";
  const digits = phone.replace(/\D/g, "");
  const isMissingUsCode = digits[0] !== "1" || digits.length <= usMinLength;
  if (!startWithPlus && isMissingUsCode) {
    return `+1${digits}`;
  }
  return `+${digits}`;
};
