import {
  faClock,
  faDownload,
  faExclamationCircle,
  faFile,
  faShareNodes,
  faUser,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";

interface User {
  id: number;
  full_name: string;
  email: string;
  role: "teacher" | "student";
}

interface Document {
  id: number;
  title: string;
  content?: string;
  downloadLink: string;
  uploadedBy: number;
  createdAt: string;
  user: User;
  likesCount: number;
  isLiked: boolean;
  tags: Array<{
    id: number;
    name: string;
  }>;
}
const fetchMockDocuments = async (): Promise<Document[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: 1,
      title: "Giáo trình Lập trình Web Frontend",
      content:
        "Tài liệu học tập về React, TypeScript và các công nghệ frontend hiện đại. Bao gồm các bài tập thực hành và dự án mẫu.",
      downloadLink: "/documents/frontend-dev.pdf",
      uploadedBy: 1,
      createdAt: "2024-03-15T10:30:00Z",
      user: {
        id: 1,
        full_name: "ThS. Nguyễn Văn A",
        email: "teacher@eaut.edu.vn",
        role: "teacher",
      },
      likesCount: 45,
      isLiked: true,
      tags: [
        { id: 1, name: "React" },
        { id: 2, name: "TypeScript" },
        { id: 3, name: "Frontend" },
      ],
    },
    {
      id: 2,
      title: "Bài giảng Cơ sở dữ liệu",
      content:
        "Tổng hợp lý thuyết và bài tập về SQL, thiết kế CSDL quan hệ, và tối ưu hoá truy vấn.",
      downloadLink: "/documents/database.pdf",
      uploadedBy: 2,
      createdAt: "2024-03-14T15:45:00Z",
      user: {
        id: 2,
        full_name: "ThS. Nguyễn Thị B",
        email: "teacher@eaut.edu.vn",
        role: "teacher",
      },
      likesCount: 30,
      isLiked: false,
      tags: [
        { id: 4, name: "SQL" },
        { id: 5, name: "CSDL" },
      ],
    },
    {
      id: 3,
      title: "Đề cương ôn tập Toán cao cấp",
      content:
        "Tổng hợp công thức, bài tập mẫu và đề thi các năm trước môn Toán cao cấp dành cho sinh viên IT.",
      downloadLink: "/documents/math-review.pdf",
      uploadedBy: 3,
      createdAt: "2024-03-13T09:15:00Z",
      user: {
        id: 3,
        full_name: "ThS. Trần Văn C",
        email: "teacher@eaut.edu.vn",
        role: "teacher",
      },
      likesCount: 20,
      isLiked: false,
      tags: [{ id: 6, name: "Toán cao cấp" }],
    },
    {
      id: 4,
      title: "Hướng dẫn đồ án môn học",
      content:
        "Quy trình thực hiện đồ án, các yêu cầu về nội dung và hình thức, cách viết báo cáo và trình bày.",
      downloadLink: "/documents/project-guide.pdf",
      uploadedBy: 1,
      createdAt: "2024-03-12T14:20:00Z",
      user: {
        id: 1,
        full_name: "ThS. Nguyễn Văn A",
        email: "teacher@eaut.edu.vn",
        role: "teacher",
      },
      likesCount: 15,
      isLiked: false,
      tags: [
        { id: 7, name: "Đồ án" },
        { id: 8, name: "Quy trình" },
      ],
    },
    {
      id: 5,
      title: "Tài liệu Tiếng Anh chuyên ngành",
      content:
        "Từ vựng và thuật ngữ chuyên ngành CNTT, các bài đọc và bài tập thực hành kèm giải thích chi tiết.",
      downloadLink: "/documents/tech-english.pdf",
      uploadedBy: 4,
      createdAt: "2024-03-11T11:00:00Z",
      user: {
        id: 4,
        full_name: "ThS. Nguyễn Thị D",
        email: "teacher@eaut.edu.vn",
        role: "teacher",
      },
      likesCount: 10,
      isLiked: false,
      tags: [
        { id: 9, name: "Tiếng Anh" },
        { id: 10, name: "Chuyên ngành" },
      ],
    },
    {
      id: 6,
      title: "Ôn tập cuối kỳ Mạng máy tính",
      content:
        "Tổng hợp kiến thức trọng tâm, bài tập mẫu và đề thi thử có lời giải chi tiết môn Mạng máy tính.",
      downloadLink: "/documents/network-review.pdf",
      uploadedBy: 2,
      createdAt: "2024-03-10T16:30:00Z",
      user: {
        id: 2,
        full_name: "ThS. Nguyễn Thị B",
        email: "teacher@eaut.edu.vn",
        role: "teacher",
      },
      likesCount: 5,
      isLiked: false,
      tags: [
        { id: 11, name: "Mạng máy tính" },
        { id: 12, name: "Đề thi" },
      ],
    },
  ];
};
const toggleLike = async (documentId: number) => {
  console.log("Toggle like for document:", documentId);
};

const ReccentDocuments: FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await fetchMockDocuments();
        setDocuments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -15,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -15,
      scale: 1.03,
      rotateY: 5,
      boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  if (isLoading) {
    return (
      <motion.div
        className="py-5 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Spinner animation="border" variant="dark" />
        <p className="text-muted mt-2">Đang tải dữ liệu...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="py-5 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-danger mb-3">
          <FontAwesomeIcon icon={faExclamationCircle} size="3x" />
        </div>
        <p className="text-muted">{error}</p>
      </motion.div>
    );
  }

  return (
    <section className="py-5">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div className="mb-5 text-center" variants={headerVariants}>
            <motion.div
              className="badge bg-dark mb-3 px-4 py-2"
              style={{ borderRadius: "30px" }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
              }}
            >
              Tài liệu mới cập nhật
            </motion.div>
            <motion.h2
              className="display-4 fw-bold mb-4"
              style={{
                background: "linear-gradient(45deg, #1a1a1a, #4a4a4a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              whileInView={{
                textShadow: [
                  "0 0 0px rgba(0,0,0,0)",
                  "0 0 20px rgba(0,0,0,0.2)",
                  "0 0 0px rgba(0,0,0,0)",
                ],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            >
              Tài Liệu Học Tập
            </motion.h2>
            <p className="lead text-secondary">
              Kho tài liệu học tập chất lượng dành cho sinh viên Đại học Công
              nghệ Đông Á
            </p>
          </motion.div>

          {documents.length === 0 ? (
            <motion.div className="py-5 text-center" variants={headerVariants}>
              <div className="text-muted mb-3">
                <FontAwesomeIcon icon={faFile} size="3x" />
              </div>
              <p>Chưa có tài liệu nào</p>
            </motion.div>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {documents.map((doc) => (
                <Col key={doc.id}>
                  <motion.div variants={cardVariants} whileHover="hover">
                    <Card className="h-100 border-0 shadow-sm">
                      <Card.Body>
                        <div className="d-flex mb-3">
                          <motion.div
                            className="rounded-circle bg-dark bg-opacity-10 me-3 flex-shrink-0 p-3"
                            style={{
                              width: "48px",
                              height: "48px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            whileHover={{
                              rotate: 360,
                              scale: 1.2,
                              transition: { duration: 0.5 },
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faFile}
                              className="text-dark"
                              size="lg"
                            />
                          </motion.div>

                          <div className="overflow-hidden">
                            <h5
                              className="card-title text-truncate mb-1"
                              style={{ maxWidth: "100%" }}
                            >
                              {doc.title}
                            </h5>
                            <div className="d-flex align-items-center text-muted small flex-wrap">
                              <div className="d-flex align-items-center me-3">
                                <FontAwesomeIcon
                                  icon={faUser}
                                  className="me-1"
                                  size="sm"
                                />
                                <span
                                  className="text-truncate"
                                  style={{ maxWidth: "150px" }}
                                >
                                  {doc.user.full_name}
                                </span>
                              </div>
                              <div className="d-flex align-items-center">
                                <FontAwesomeIcon
                                  icon={faClock}
                                  className="me-1"
                                  size="sm"
                                />
                                <span>
                                  {new Date(doc.createdAt).toLocaleDateString(
                                    "vi-VN",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    },
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {doc.content && (
                          <Card.Text
                            className="text-secondary small mb-3"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              minHeight: "4.5em",
                            }}
                          >
                            {doc.content}
                          </Card.Text>
                        )}

                        <div className="d-flex mb-3 flex-wrap gap-2">
                          {doc.tags.map((tag) => (
                            <span
                              key={tag.id}
                              className="badge bg-dark bg-opacity-10 text-dark text-truncate"
                              style={{ maxWidth: "120px" }}
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex gap-2">
                            <motion.button
                              className={`btn btn-sm ${doc.isLiked ? "btn-dark" : "btn-outline-dark"}`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggleLike(doc.id)}
                            >
                              <FontAwesomeIcon
                                icon={doc.isLiked ? faHeartSolid : faHeart}
                                className="me-1"
                              />
                              {doc.likesCount}
                            </motion.button>

                            <motion.a
                              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + doc.downloadLink)}`}
                              className="btn btn-sm btn-outline-dark"
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FontAwesomeIcon
                                icon={faShareNodes}
                                className="me-1"
                              />
                              Chia sẻ
                            </motion.a>
                          </div>

                          <motion.a
                            href={doc.downloadLink}
                            className="btn btn-dark btn-sm"
                            download
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FontAwesomeIcon
                              icon={faDownload}
                              className="me-1"
                              size="sm"
                            />
                            Tải xuống
                          </motion.a>
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          )}
        </motion.div>
      </Container>
    </section>
  );
};

export default ReccentDocuments;
