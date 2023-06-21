import axios from "axios";
import AdminGoogle from "../model/adminGoogle.model.js";

export async function getGoogleToken(req, res) {
//   const token = req.body.token;

//   const response = await axios.get(
//     "https://www.googleapis.com/oauth2/v3/userinfo",
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

  const admin = new AdminGoogle(req.body);

//   admin.provider = response.data.provider;
//   admin.email = response.data.email;
//   admin.googleId = response.data.id;
//   admin.firstName = response.data.givenName;
//   admin.lastName = response.data.familyName;
//   admin.imageUrl = response.data.picture;

  const { createdAt } = admin;

  await admin.save();

  res.status(200).json({
    status: "Success",
    message: "Account registered successfully",
    data: {
      admin: admin,
      createdAt,
    },
  });
}

// loan.creditScore = response.data.creditScore;

// const userInfo = await axios
//   .get("https://www.googleapis.com/oauth2/v3/userinfo", {
//     headers: { Authorization: `Bearer ${token}` },
//   })
//   .then((res) => res.data);

// console.log(userInfo);

// await axios
// .get("https://www.googleapis.com/oauth2/v3/userinfo", {
//   headers: { Authorization: `Bearer ${token}` },
// })
// .then((res) => res.data);

// console.log(userInfo);
