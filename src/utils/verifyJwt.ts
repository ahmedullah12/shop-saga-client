import { jwtDecode } from "jwt-decode";

const verifyJwt = (token: string) => {
  const decoded = jwtDecode(token);
  return decoded;
};

export default verifyJwt;


