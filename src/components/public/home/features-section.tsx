import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBookOpen,
  faChartLine,
  faClock,
  faCloud,
  faDownload,
  faLightbulb,
  faShieldHalved,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface Feature {
  id: number;
  icon: IconDefinition;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: faBookOpen,
    title: "Kho tài liệu đa dạng",
    description: "Tài liệu được phân loại theo ngành học, môn học và chủ đề",
  },
  {
    id: 2,
    icon: faUsers,
    title: "Cộng đồng học tập",
    description: "Kết nối và chia sẻ kiến thức với sinh viên EAUT",
  },
  {
    id: 3,
    icon: faLightbulb,
    title: "Nội dung chất lượng",
    description: "Tài liệu được kiểm duyệt và đánh giá bởi cộng đồng",
  },
  {
    id: 4,
    icon: faShieldHalved,
    title: "An toàn & Bảo mật",
    description: "Bảo vệ thông tin và quyền sở hữu trí tuệ",
  },
  {
    id: 5,
    icon: faChartLine,
    title: "Cập nhật liên tục",
    description: "Tài liệu mới được bổ sung thường xuyên",
  },
  {
    id: 6,
    icon: faCloud,
    title: "Truy cập mọi lúc",
    description: "Dễ dàng truy cập và tải tài liệu mọi nơi",
  },
  {
    id: 7,
    icon: faDownload,
    title: "Tải nhanh tài liệu",
    description:
      "Không giới hạn lượt tải và tốc độ tải tài liệu cho thành viên",
  },
  {
    id: 8,
    icon: faClock,
    title: "Lịch sử & Đánh dấu",
    description: "Dễ dàng theo dõi và quay lại các tài liệu đã xem trước đó",
  },
];

const FeaturesSection: FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 100, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: 0,
      cursor: "grab",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    },
    hover: {
      y: -15,
      scale: 1.05,
      rotate: 0,
      cursor: "grab",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    drag: {
      cursor: "grabbing",
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      zIndex: 1,
    },
  };

  const iconVariants = {
    hover: {
      rotate: [0, -15, 15, -15, 0],
      scale: [1, 1.2, 1.2, 1.2, 1],
      transition: {
        duration: 0.7,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
      },
    },
  };

  return (
    <section className="py-5">
      <Container
        className="position-relative px-0"
        style={{
          isolation: "isolate",
          zIndex: 1,
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <Row className="mb-5 text-center">
            <Col lg={8} className="mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <motion.span
                  className="badge bg-dark mb-3 px-3 py-2"
                  variants={headerVariants}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                >
                  Tính năng nổi bật
                </motion.span>
              </motion.div>
              <motion.h2
                className="display-6 fw-bold mb-4"
                variants={headerVariants}
                whileInView={{
                  textShadow: [
                    "0 0 0px rgba(0,0,0,0)",
                    "0 0 10px rgba(0,0,0,0.2)",
                    "0 0 0px rgba(0,0,0,0)",
                  ],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
              >
                Nền tảng chia sẻ tài liệu hiện đại
              </motion.h2>
              <motion.p className="text-secondary" variants={headerVariants}>
                Khám phá các tính năng giúp việc chia sẻ và tìm kiếm tài liệu
                trở nên dễ dàng hơn bao giờ hết
              </motion.p>
            </Col>
          </Row>

          <div
            className="g-4"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1rem",
              gridAutoFlow: "dense",
              alignItems: "start",
              position: "relative",
              zIndex: 2,
            }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                whileHover="hover"
                style={{
                  position: "relative",
                  gridColumn: "auto",
                }}
              >
                <motion.div
                  className="rounded-3 h-100 p-4 shadow-sm"
                  style={{
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <motion.div
                    className="d-inline-flex align-items-center justify-content-center bg-dark rounded-circle mb-3"
                    whileHover="hover"
                    variants={iconVariants}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(0,0,0,0.2)",
                        "0 0 20px 0 rgba(0,0,0,0.3)",
                        "0 0 0 0 rgba(0,0,0,0.2)",
                      ],
                    }}
                    style={{
                      width: "48px",
                      height: "48px",
                      minWidth: "48px",
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={feature.icon}
                      className="fs-5 text-white"
                      style={{
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  </motion.div>
                  <h3 className="h5 fw-bold mb-3">{feature.title}</h3>
                  <p className="text-secondary fs-6 mb-0">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
