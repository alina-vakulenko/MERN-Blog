import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const authHeader =
    req.headers.authorization || req.headers.Authorization || "";

  if (!authHeader?.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.UserData_id;
    req.roles = decoded.UserData.roles;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};
