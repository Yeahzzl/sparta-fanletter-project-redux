import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainPage from "../Pages/MainPage";
import DetailPage from "../Pages/DetailPage";
import Layout from "../components/Layout";
import ProfilePage from "../Pages/ProfilePage";
import LoginPage from "../Pages/LoginPage";
import { useSelector } from "react-redux";

const Router = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return (
    <BrowserRouter>
      <Routes>
        {isLogin ? (
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
