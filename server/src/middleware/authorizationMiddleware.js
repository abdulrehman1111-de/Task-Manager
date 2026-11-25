export function authorizeRoles(permittedRoles) {
  return function (req, res, next) {
    const userRole = req.user.userRole;

    if (!permittedRoles.includes(userRole)){
      console.error("No permissible roles found!");
      res.status(403).json({
        message: "Access Forbidden!",
      });
      return;
    }

    next();
  };
}
