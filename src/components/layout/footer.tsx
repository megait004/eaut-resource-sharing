import { FC } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router";
import EAUTLogo from "@/assets/images/logo.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebookF,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

const Footer: FC = () => {
  return (
    <footer className="bg-dark text-light border-top border-light border-opacity-10 mt-auto py-5">
      <Container fluid="lg">
        <Row className="gy-4">
          <Col lg={4}>
            <Link
              to="/"
              className="d-flex align-items-center text-decoration-none mb-3"
            >
              <img
                src={EAUTLogo}
                alt="EAUT Logo"
                height="40"
                className="me-2"
              />
              <span className="text-light fw-bold fs-4">EAUT DocShare</span>
            </Link>
            <p className="text-white-50 mb-3">
              Nền tảng chia sẻ tài liệu học tập dành cho sinh viên Đại học Công
              nghệ Đông Á
            </p>
            <div className="d-flex gap-3">
              <a
                href="https://github.com/megait004/eaut-resource-sharing"
                className="text-light fs-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://www.facebook.com/giapzech"
                className="text-light fs-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="https://t.me/Giapzech"
                className="text-light fs-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTelegram} />
              </a>
            </div>
          </Col>

          <Col lg={4}>
            <h5 className="fw-bold mb-3 text-white">Danh mục</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/danh-muc/1"
                  className="text-white-50 text-decoration-none hover-underline"
                >
                  Công nghệ thông tin
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/danh-muc/2"
                  className="text-white-50 text-decoration-none hover-underline"
                >
                  Kế toán
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/danh-muc/3"
                  className="text-white-50 text-decoration-none hover-underline"
                >
                  Quản trị kinh doanh
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/danh-muc/4"
                  className="text-white-50 text-decoration-none hover-underline"
                >
                  Ngôn ngữ Anh
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/danh-muc/5"
                  className="text-white-50 text-decoration-none hover-underline"
                >
                  Điện - Điện tử
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/danh-muc/6"
                  className="text-white-50 text-decoration-none hover-underline"
                >
                  Cơ khí
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={4}>
            <h5 className="fw-bold mb-3 text-white">Thông tin liên hệ</h5>
            <ul className="list-unstyled">
              <li className="text-white-50 mb-2">
                <span className="fw-semibold">Địa chỉ:</span>
                <br />
                Toà nhà Đại học Công nghệ Đông Á, P. Trịnh Văn Bô, Xuân Phương,
                Nam Từ Liêm, Hà Nội
              </li>
              <li className="mb-2">
                <span className="fw-semibold text-white-50">Điện thoại:</span>
                <br />
                <a
                  href="tel:+84528286001"
                  className="text-white-50 text-decoration-none hover-underline d-lg-none"
                >
                  (+84) 528 286 001
                </a>
                <a
                  href="https://zalo.me/0528286001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white-50 text-decoration-none hover-underline d-none d-lg-inline-block"
                >
                  Zalo: 0528 286 001
                </a>
              </li>
              <li className="mb-2">
                <span className="fw-semibold text-white-50">Email:</span>
                <br />
                <a
                  href="mailto:giapfc123@gmail.com"
                  className="text-white-50 text-decoration-none hover-underline d-lg-none"
                >
                  giapfc123@gmail.com
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=giapfc123@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white-50 text-decoration-none hover-underline d-none d-lg-inline-block"
                >
                  giapfc123@gmail.com
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <div className="text-white-50 border-top border-secondary mt-4 pt-4 text-center">
          <small>© {new Date().getFullYear()} EAUT DocShare.</small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
