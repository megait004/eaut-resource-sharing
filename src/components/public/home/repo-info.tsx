import { useToast } from "@/components/common/toast";
import {
  faBan,
  faBook,
  faBox,
  faBoxArchive,
  faCircleExclamation,
  faClone,
  faCode,
  faCodeFork,
  faComments,
  faCopy,
  faEye,
  faFile,
  faGlobe,
  faListCheck,
  faMagnifyingGlass,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { Badge, Card, Container } from "react-bootstrap";

interface Owner {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
}

interface RepoData {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: string;
  fork: boolean;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: string | null;
  allow_forking: boolean;
  is_template: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  subscribers_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  clone_url: string;
}

const CACHE_KEY = "github_repo_data";
const CACHE_DURATION = 24 * 60 * 60 * 1000;
interface CacheData {
  data: RepoData;
  timestamp: number;
}

const RepoInfo: FC = () => {
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { data, timestamp }: CacheData = JSON.parse(cachedData);
          const now = Date.now();

          if (now - timestamp < CACHE_DURATION) {
            setRepoData(data);
            setLoading(false);
            return;
          }
          localStorage.removeItem(CACHE_KEY);
        }

        const response = await fetch(
          "https://api.github.com/repos/megait004/eaut-resource-sharing",
        );
        const data = await response.json();

        if (data.message?.includes("API rate limit exceeded")) {
          showToast("Đã vượt quá giới hạn truy cập API. Vui lòng thử lại sau!");
          return;
        }

        const cacheData: CacheData = {
          data,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

        setRepoData(data);
      } catch {
        showToast("Không thể tải thông tin repository. Vui lòng thử lại sau!");
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [showToast]);

  const handleCopyUrl = async () => {
    if (!repoData) return;
    try {
      await navigator.clipboard.writeText(repoData.clone_url);
      showToast("Đã sao chép URL thành công!");
    } catch {
      showToast("Không thể sao chép URL. Vui lòng thử lại!");
    }
  };

  if (loading) {
    return (
      <motion.div
        className="py-5 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <output className="spinner-border text-dark">
          <span className="visually-hidden">Đang tải...</span>
        </output>
        <p className="text-secondary mt-3">Đang tải thông tin repository...</p>
      </motion.div>
    );
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  const magnifierVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  };

  return (
    <>
      <AnimatePresence>
        {showAvatarModal && repoData && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            className="position-fixed d-flex align-items-center justify-content-center start-0 top-0 h-100 w-100"
            style={{
              zIndex: 1050,
              background: "rgba(0,0,0,0.8)",
              cursor: "pointer",
            }}
            onClick={() => setShowAvatarModal(false)}
          >
            <motion.div
              className="rounded-circle overflow-hidden"
              style={{
                width: "300px",
                height: "300px",
                border: "5px solid white",
              }}
            >
              <img
                src={repoData.owner.avatar_url}
                alt={repoData.owner.login}
                className="object-fit-cover h-100 w-100"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Container fluid className="px-0">
        {repoData && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card className="border-0 bg-transparent">
              <Card.Body className="p-4">
                <motion.div
                  className="d-flex align-items-center mb-4"
                  variants={itemVariants}
                >
                  <div className="position-relative">
                    <motion.div
                      className="rounded-circle bg-dark overflow-hidden"
                      style={{ width: 48, height: 48 }}
                      onHoverStart={() => setShowMagnifier(true)}
                      onHoverEnd={() => setShowMagnifier(false)}
                      onClick={() => setShowAvatarModal(true)}
                      whileHover={{ cursor: "pointer" }}
                    >
                      <motion.img
                        src={repoData.owner.avatar_url}
                        alt={repoData.owner.login}
                        className="object-fit-cover h-100 w-100"
                      />
                    </motion.div>
                    <AnimatePresence>
                      {showMagnifier && (
                        <motion.div
                          className="position-absolute"
                          style={{
                            top: -10,
                            right: -10,
                            background: "rgba(0,0,0,0.8)",
                            borderRadius: "50%",
                            width: 28,
                            height: 28,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          variants={magnifierVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="fs-6 text-white"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="ms-3">
                    <Card.Title className="fs-4 mb-0">
                      <a
                        href={repoData.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark text-decoration-none"
                      >
                        {repoData.full_name}
                      </a>
                      {repoData.private && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <Badge bg="dark" className="ms-2">
                            Private
                          </Badge>
                        </motion.span>
                      )}
                    </Card.Title>
                    <small className="text-secondary">
                      by{" "}
                      <a
                        href={repoData.owner.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark text-decoration-none border-bottom border-dark"
                      >
                        {repoData.owner.login}
                      </a>
                      {" • "}
                      <span className="text-uppercase">
                        {repoData.visibility}
                      </span>
                      {repoData.is_template && (
                        <Badge bg="dark" className="fw-normal ms-2">
                          Template
                        </Badge>
                      )}
                    </small>
                  </div>
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="lead text-secondary mb-4"
                >
                  {repoData.description}
                </motion.p>

                <motion.div className="mb-4" variants={itemVariants}>
                  {repoData.topics.map((topic) => (
                    <Badge
                      key={topic}
                      bg="dark"
                      className="text-uppercase fs-7 fw-normal me-2"
                    >
                      {topic}
                    </Badge>
                  ))}
                </motion.div>

                <motion.div
                  className="d-flex mb-4 flex-wrap gap-3"
                  variants={itemVariants}
                >
                  <small className="d-flex align-items-center text-dark">
                    <FontAwesomeIcon icon={faStar} className="me-2" />
                    {repoData.stargazers_count} stars
                  </small>
                  <small className="d-flex align-items-center text-dark">
                    <FontAwesomeIcon icon={faCodeFork} className="me-2" />
                    {repoData.forks_count} forks
                  </small>
                  <small className="d-flex align-items-center text-dark">
                    <FontAwesomeIcon icon={faEye} className="me-2" />
                    {repoData.subscribers_count} watching
                  </small>
                  <small className="d-flex align-items-center text-dark">
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      className="me-2"
                    />
                    {repoData.open_issues_count} issues
                  </small>
                  {repoData.language && (
                    <small className="d-flex align-items-center text-dark">
                      <FontAwesomeIcon icon={faCode} className="me-2" />
                      {repoData.language}
                    </small>
                  )}
                  <small className="d-flex align-items-center text-dark">
                    <FontAwesomeIcon icon={faBox} className="me-2" />
                    {repoData.size}KB
                  </small>
                </motion.div>

                <motion.div className="mb-4" variants={itemVariants}>
                  <small className="d-flex text-dark flex-wrap gap-3">
                    {repoData.has_wiki && (
                      <span>
                        <FontAwesomeIcon icon={faBook} className="me-2" />
                        Wiki
                      </span>
                    )}
                    {repoData.has_pages && (
                      <span>
                        <FontAwesomeIcon icon={faFile} className="me-2" />
                        Pages
                      </span>
                    )}
                    {repoData.has_projects && (
                      <span>
                        <FontAwesomeIcon icon={faListCheck} className="me-2" />
                        Projects
                      </span>
                    )}
                    {repoData.has_discussions && (
                      <span>
                        <FontAwesomeIcon icon={faComments} className="me-2" />
                        Discussions
                      </span>
                    )}
                    {repoData.archived && (
                      <span>
                        <FontAwesomeIcon icon={faBoxArchive} className="me-2" />
                        Archived
                      </span>
                    )}
                    {repoData.disabled && (
                      <span>
                        <FontAwesomeIcon icon={faBan} className="me-2" />
                        Disabled
                      </span>
                    )}
                  </small>
                </motion.div>

                {repoData.homepage && (
                  <motion.div className="mb-3" variants={itemVariants}>
                    <small>
                      <FontAwesomeIcon
                        icon={faGlobe}
                        className="text-dark me-2"
                      />
                      <a
                        href={repoData.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark text-decoration-none border-bottom border-dark"
                      >
                        {repoData.homepage}
                      </a>
                    </small>
                  </motion.div>
                )}

                <motion.div className="text-secondary" variants={itemVariants}>
                  <small>
                    Created:{" "}
                    {new Date(repoData.created_at).toLocaleDateString("vi-VN")}
                    {" • "}
                    Last updated:{" "}
                    {new Date(repoData.updated_at).toLocaleDateString("vi-VN")}
                    {" • "}
                    Last push:{" "}
                    {new Date(repoData.pushed_at).toLocaleDateString("vi-VN")}
                  </small>
                </motion.div>

                <motion.div className="mt-3" variants={itemVariants}>
                  <motion.div
                    className="d-flex align-items-center bg-dark bg-opacity-10 gap-2 rounded p-2"
                    whileHover={{
                      backgroundColor: "rgba(0,0,0,0.15)",
                      transition: { duration: 0.2 },
                    }}
                  >
                    <FontAwesomeIcon icon={faClone} className="text-dark" />
                    <code className="user-select-all text-dark flex-grow-1">
                      {repoData.clone_url}
                    </code>
                    <motion.button
                      className="btn btn-sm btn-dark"
                      onClick={handleCopyUrl}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </motion.button>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="mt-4 text-center"
                  variants={itemVariants}
                >
                  <p className="text-secondary mb-2">
                    Truy cập repository để xem thêm thông tin chi tiết
                  </p>
                  <motion.a
                    href={repoData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-dark px-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Xem trên GitHub
                  </motion.a>
                </motion.div>
              </Card.Body>
            </Card>
          </motion.div>
        )}

        {!repoData && !loading && (
          <motion.div
            className="py-5 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="text-dark fs-1 mb-3"
            />
            <h4 className="mb-3">Không thể tải thông tin repository</h4>
            <p className="text-secondary">
              Có thể do giới hạn truy cập API hoặc lỗi kết nối.
              <br />
              Vui lòng thử lại sau!
            </p>
          </motion.div>
        )}
      </Container>
    </>
  );
};

export default RepoInfo;
