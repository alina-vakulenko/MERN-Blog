type RoleKey = "Admin" | "Editor" | "User";

export type IUserRoles = {
  [key in RoleKey]: number;
};

const ROLES: IUserRoles = {
  Admin: 7878,
  Editor: 3434,
  User: 1111,
};

export default ROLES;
