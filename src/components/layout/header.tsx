import EAUTLogo from "@/assets/images/logo.webp";
import {
  faBars,
  faCaretDown,
  faCaretUp,
  faSearch,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import type { FC } from "react";
import { useRef, useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router";

const mockTags = [
  { id: 1, name: "Công nghệ thông tin" },
  { id: 2, name: "Kế toán" },
  { id: 3, name: "Quản trị kinh doanh" },
  { id: 4, name: "Ngôn ngữ Anh" },
  { id: 5, name: "Điện - Điện tử" },
  { id: 6, name: "Cơ khí" },
];

const Header: FC = () => {
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsHover(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setIsHover(false);
      }, 300);
    }
  };

  const handleClick = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/q?keyword=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <Navbar
      expand="lg"
      className="bg-dark navbar-dark sticky-top border-bottom border-light border-opacity-10 py-2"
    >
      <Container fluid="lg">
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4 d-flex align-items-center me-lg-4"
        >
          <img src={EAUTLogo} alt="EAUT Logo" height="40" className="me-2" />
          EAUT DocShare
        </Navbar.Brand>

        <Form
          className="d-none d-lg-flex col-lg-5 mx-auto"
          onSubmit={handleSearch}
        >
          <InputGroup>
            <Form.Control
              type="search"
              placeholder="Tìm kiếm tài liệu, khóa học..."
              className="border-light bg-dark text-light placeholder-light search-input"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="outline-light"
              className="d-flex align-items-center gap-2"
              type="submit"
            >
              <FontAwesomeIcon icon={faSearch} />
              <span>Tìm kiếm</span>
            </Button>
          </InputGroup>
        </Form>

        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`}>
          <FontAwesomeIcon icon={faBars} />
        </Navbar.Toggle>

        <Form className="d-flex d-lg-none mt-3 w-100" onSubmit={handleSearch}>
          <InputGroup>
            <Form.Control
              type="search"
              placeholder="Tìm kiếm tài liệu, khóa học..."
              className="border-light bg-dark text-light placeholder-light"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="outline-light"
              className="d-flex align-items-center gap-2"
              type="submit"
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup>
        </Form>

        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="end"
          className="bg-dark w-sm-50 w-75 text-white"
        >
          <Offcanvas.Header
            closeButton
            closeVariant="white"
            className="border-bottom border-secondary"
          >
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              EAUT DocShare
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="align-items-lg-center ms-auto gap-2">
              <NavDropdown
                title={
                  <span className="text-white">
                    Danh mục{" "}
                    <FontAwesomeIcon
                      icon={
                        (isMobile ? isOpen : isHover) ? faCaretUp : faCaretDown
                      }
                      className="ms-1"
                    />
                  </span>
                }
                id="nav-dropdown"
                className="nav-link category-dropdown"
                align="end"
                show={isMobile ? isOpen : isHover}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                menuVariant="dark"
              >
                <AnimatePresence>
                  {(isMobile ? isOpen : isHover) && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {mockTags.map((tag) => (
                        <NavDropdown.Item
                          key={tag.id}
                          as={Link}
                          to={`/danh-muc/${tag.id}`}
                          className="hover-underline"
                          onClick={() => isMobile && setIsOpen(false)}
                        >
                          {tag.name}
                        </NavDropdown.Item>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavDropdown>
              <div className="d-flex flex-lg-row flex-column gap-2">
                <Link to="/dang-nhap" className="text-decoration-none">
                  <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      variant="outline-light"
                      size="sm"
                      className="d-flex align-items-center rounded-pill justify-content-center fw-semibold w-100 gap-2 px-3 py-2"
                    >
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Đăng nhập
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/dang-ky" className="text-decoration-none">
                  <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      variant="light"
                      size="sm"
                      className="d-flex align-items-center rounded-pill justify-content-center fw-semibold w-100 gap-2 px-3 py-2"
                    >
                      <FontAwesomeIcon icon={faUserPlus} />
                      Đăng ký
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
