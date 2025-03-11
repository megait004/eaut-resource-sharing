import type { FC } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faArrowLeft,
  faTriangleExclamation,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const NotFound: FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const numberVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="py-5 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="display-1 fw-bold text-dark"
        variants={itemVariants}
      >
        <motion.span variants={numberVariants}>4</motion.span>
        <motion.span variants={iconVariants} animate="visible" className="mx-2">
          <FontAwesomeIcon icon={faTriangleExclamation} />
        </motion.span>
        <motion.span variants={numberVariants}>4</motion.span>
      </motion.h1>

      <motion.h2
        className="fs-1 mb-4"
        variants={itemVariants}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        Không tìm thấy trang
      </motion.h2>

      <motion.div
        className="mb-4"
        variants={itemVariants}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.p
          className="fs-5 text-muted"
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FontAwesomeIcon icon={faBook} className="me-2" />
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </motion.p>
        <motion.p
          className="fs-5 text-muted"
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ để tiếp tục tìm
          kiếm tài liệu.
        </motion.p>
      </motion.div>

      <motion.div
        className="d-flex justify-content-center gap-3"
        variants={itemVariants}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            variant="outline-dark"
            onClick={() => navigate(-1)}
            className="rounded-pill fw-bold py-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Quay lại trang trước
          </Button>
        </motion.div>

        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            variant="dark"
            onClick={() => navigate("/")}
            className="rounded-pill fw-bold py-2"
          >
            <FontAwesomeIcon icon={faHouse} className="me-2" />
            Về trang chủ
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;
