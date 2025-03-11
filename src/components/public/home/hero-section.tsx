import HeroImage from "@/assets/images/hero-image.webp";
import { faArrowRotateRight, faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import type { FC } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const HeroSection: FC = () => {
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.03,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    hover: {
      transition: {
        duration: 0.2,
        yoyo: Infinity,
      },
    },
  };

  return (
    <section className="overflow-hidden py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-lg-0 mb-5 px-0">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={titleVariants}
            >
              <motion.span
                className="badge bg-dark d-inline-block mb-3 px-3 py-2 text-white"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.1 }}
              >
                Nền tảng chia sẻ tài liệu
              </motion.span>
              <motion.h1 className="display-4 display-sm-3 fw-bolder mb-sm-4 mb-3">
                <motion.div className="d-inline-flex flex-wrap">
                  {"Kho tài liệu".split("").map((char, index) => (
                    <motion.span
                      key={`title-${char}-${index}`}
                      variants={letterVariants}
                      style={{
                        display: "inline-block",
                        marginRight: char === " " ? "0.15em" : "0.005em",
                        whiteSpace: "pre",
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.div>{" "}
                <motion.span
                  className="border-bottom border-dark position-relative d-inline-block border-3"
                  whileHover={{
                    textShadow: "0 0 8px rgb(0,0,0,0.2)",
                  }}
                >
                  {"ĐỈNH CAO".split("").map((char, index) => (
                    <motion.span
                      key={`highlight-${char}-${index}`}
                      variants={letterVariants}
                      style={{
                        display: "inline-block",
                        marginRight: char === " " ? "0.15em" : "0.005em",
                        whiteSpace: "pre",
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.h1>
              <motion.p
                className="lead text-secondary mb-sm-5 fs-6 mb-4"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 50,
                }}
              >
                Nền tảng chia sẻ tài liệu học tập dành cho sinh viên{" "}
                <span className="fw-bold text-dark">
                  Đại học Công nghệ Đông Á
                </span>{" "}
                với đa dạng ngành học.{" "}
                <motion.a
                  href="/dang-nhap"
                  className="border-bottom border-dark text-dark text-decoration-none"
                  style={{ cursor: "pointer" }}
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 8px rgba(0,0,0,0.2)",
                  }}
                >
                  Tham gia ngay
                </motion.a>{" "}
                để truy cập kho tài liệu chất lượng!
              </motion.p>
              <motion.div className="d-flex gap-3">
                <motion.div
                  whileHover="hover"
                  variants={buttonVariants}
                  className="w-sm-auto w-50"
                >
                  <Button
                    size="lg"
                    variant="dark"
                    className="fs-6 w-100 px-4 py-3"
                  >
                    Xem tài liệu
                  </Button>
                </motion.div>
                <motion.div
                  whileHover="hover"
                  variants={buttonVariants}
                  className="w-sm-auto w-50"
                >
                  <Button
                    size="lg"
                    variant="outline-dark"
                    className="fs-6 w-100 px-4 py-3"
                  >
                    Chia sẻ tài liệu
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start mt-sm-5 gap-sm-4 mt-4 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.div className="d-flex align-items-center gap-2">
                  <FontAwesomeIcon icon={faGift} className="text-dark fs-5" />
                  <span className="text-dark fw-bold">Miễn phí</span>
                </motion.div>
                <div className="vr d-none d-sm-block"></div>
                <motion.div className="d-flex align-items-center gap-2">
                  <FontAwesomeIcon
                    icon={faArrowRotateRight}
                    className="text-dark fs-5"
                  />
                  <span className="text-dark">
                    <span className="fw-bold">Cập nhật</span> thường xuyên
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </Col>
          <Col lg={6}>
            <motion.div
              className="position-relative"
              whileHover={{ rotate: -10 }}
            >
              <motion.img
                src={HeroImage}
                alt="EAUT DocShare Illustration"
                className="img-fluid"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.05 }}
              />
              <motion.div
                className="position-absolute rounded-3 d-none d-lg-block bg-white p-3 shadow"
                style={{
                  top: "20%",
                  right: "5%",
                  zIndex: 1,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className="d-flex align-items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="bg-dark rounded-circle"
                    style={{ width: 8, height: 8 }}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <span className="text-dark">
                    <span className="fw-bold">Đa dạng</span> ngành học
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
