export const validatePassword = (password: string) => {
  if (password.length < 12) {
    return "is too short";
  }

  if (password.length > 128) {
    return "is too long";
  }

  let numberCount = 0;

  for (const char of password) {
    if (!isNaN(Number(char))) {
      numberCount++;
    }
  }

  if (numberCount < 2) {
    return "should contain at least 2 numbers";
  }

  return true;
};
