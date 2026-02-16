import { Routes, Route, Navigate } from "react-router-dom";
import UserHome from "../pages/user/UserHome";

export default function UserApp() {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
