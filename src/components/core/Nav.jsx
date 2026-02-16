import { useContext } from "react";
import AuthContext from "../../services/auth.context";

import UserNav from "./UserNav";
import AdminNav from "./AdminNav";

export default function Nav() {
  const { role } = useContext(AuthContext);

  if (!role) return null;

  return role === "ADMIN" ? <AdminNav /> : <UserNav />;
}
