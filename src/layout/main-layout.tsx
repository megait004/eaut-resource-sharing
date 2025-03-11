import type { FC } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Outlet } from "react-router";
import ScrollToTop from "@/components/common/scroll_to_top";
import { Container } from "react-bootstrap";

const MainLayout: FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 py-4">
        <Container fluid="lg">
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
