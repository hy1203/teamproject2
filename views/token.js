export default function getTokenFromCookie() {
  // get access and refresh token from cookie
  const cookies = document.cookie.split(";");
  const access = cookies
    .find((cookie) => cookie.includes("access"))
    .split("=")[1];
  const refresh = cookies
    .find((cookie) => cookie.includes("refresh"))
    .split("=")[1];
  return { access, refresh };
}
