import MainLayout from "@/layout/main-layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/public/home";
import Login from "@/pages/public/login";
import Register from "@/pages/public/register";
import SearchResults from "@/pages/public/search-results";
import type { FC } from "react";
import { Route, Routes } from "react-router";
import { ToastProvider } from "@/components/common/toast";

const App: FC = () => {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="q" element={<SearchResults />} />
          <Route path="dang-nhap" element={<Login />} />
          <Route path="dang-ky" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
};

export default App;
