import { createContext, useContext, useMemo, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (message: string) => {
    setMessage(message);
    setShow(true);
  };

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer className="p-3" position="bottom-end">
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          className="border-dark border bg-white shadow"
        >
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
};
