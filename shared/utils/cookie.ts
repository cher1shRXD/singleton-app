export const getCookieValue = (
  cookieString: string,
  key: string,
): string | undefined => {
  if (!cookieString) return undefined;
  const cookies = cookieString.split(";").map((c) => c.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith(key + "=")) {
      return cookie.substring(key.length + 1);
    }
  }
  return undefined;
};
