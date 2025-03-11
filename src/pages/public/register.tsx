import RegisterImage from "@/assets/images/register-image.webp";
import { useToast } from "@/components/common/toast";
import { motion } from "framer-motion";
import type { FC } from "react";
import { useEffect } from "react";
import { Button, Card, Form, Row, Stack } from "react-bootstrap";
import { useFormStatus } from "react-dom";
import { Link } from "react-router";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="dark"
      className="fw-bold rounded-pill w-100 py-2"
      disabled={pending}
    >
      {pending ? "Đang xử lý..." : "Đăng ký"}
    </Button>
  );
};

const Register: FC = () => {
  const { showToast } = useToast();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = async (formData: FormData) => {
    "use server";
    try {
      // TODO:
      console.log(formData);
      showToast("Đăng ký thành công!");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Đăng ký thất bại. Vui lòng thử lại!";
      showToast(errorMessage);
    }
  };

  return (
    <Row className="align-items-center justify-content-center g-0">
      <motion.div
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        transition={{ ease: "easeInOut" }}
        className="col-md-6 col-lg-5"
      >
        <Card className="rounded-0 border-0">
          <Card.Body className="p-sm-5 d-flex flex-column justify-content-center">
            <Stack gap={4}>
              <div className="text-center">
                <h2 className="fw-bold display-6 mb-2">Đăng ký</h2>
                <p className="text-muted lead mb-4">
                  Tạo tài khoản mới để bắt đầu
                </p>
              </div>

              <Form action={handleSubmit}>
                <Stack gap={3}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Nhập email của bạn"
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Nhập mật khẩu"
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Vai trò</Form.Label>
                    <Form.Select name="role" required>
                      <option value="student">Học sinh</option>
                      <option value="teacher">Giáo viên</option>
                    </Form.Select>
                  </Form.Group>

                  <SubmitButton />
                </Stack>
              </Form>

              <div className="text-center">
                <p className="text-muted mb-0">
                  Đã có tài khoản?{" "}
                  <Link
                    to="/dang-nhap"
                    className="text-decoration-none text-dark fw-bold"
                  >
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </Stack>
          </Card.Body>
        </Card>
      </motion.div>

      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ ease: "easeInOut" }}
        className="col-md-3 d-none d-md-block"
      >
        <div
          className="bg-dark rounded-0 d-flex align-items-center"
          style={{ height: "400px" }}
        >
          <img
            src={RegisterImage}
            alt="Register Banner"
            className="object-fit-cover h-100 w-100"
          />
        </div>
      </motion.div>
    </Row>
  );
};

export default Register;
