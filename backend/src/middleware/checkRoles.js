export default (...allowedRoles) => {
  return (req, res, next) => {
    console.log(req.roles);
    // if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    const result = req.roles.some((role) => rolesArray.includes(role));
    if (!result) return res.sendStatus(401);
    next();
  };
};