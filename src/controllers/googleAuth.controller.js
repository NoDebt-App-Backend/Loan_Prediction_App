// import axios from "axios"

// const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
//           headers: { Authorization: `Bearer ${token}` } })
//         .then((res) => res.data);


//   console.log(userInfo);

export const getGoogleToken = (req, res) => {
    const token = req.body.token;
    // const adminCompanyMap = await AdminCompanyMap.find();
    res.status(200).json({
      status: "Success",
      message: "Token returned",
      data: {
        token
      },
    });
    if (error) throw new InternalServerError("Internal Server Error");
  }