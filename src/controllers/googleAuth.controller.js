import axios from "axios";

export async function getGoogleToken(req, res) {
  const token = req.body.token;
  console.log(token);
  // const adminCompanyMap = await AdminCompanyMap.find();
  await axios
    .get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

  console.log(userInfo);

  res.status(200).json({
    status: "Success",
    message: "Token returned",
    data: {
      token,
    },
  });
}
// const userInfo = await axios
//   .get("https://www.googleapis.com/oauth2/v3/userinfo", {
//     headers: { Authorization: `Bearer ${token}` },
//   })
//   .then((res) => res.data);

// console.log(userInfo);
