import { getSession } from "next-auth/react";
import { getAccessToken } from "lib/spotify";

const handler = async (req, res) => {
  const {
    token: { accessToken },
  } = await getSession({ req });
  const access_token = await getAccessToken(accessToken);
  return res.status(200).json({ access_token });
};

export default handler;
