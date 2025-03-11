import { motion } from "framer-motion";
import type { FC } from "react";

interface BubbleProps {
  size: number;
  left: string;
  delay: number;
  direction: "left" | "right";
}

const Bubble: FC<BubbleProps> = ({ size, left, delay, direction }) => {
  const xOffset = direction === "left" ? -100 : 100;

  return (
    <motion.div
      className="position-absolute"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 30% 30%, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.20))",
        border: "1px solid rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(3px)",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        left,
        top: "100%",
        zIndex: 0,
      }}
      initial={{ y: 0, x: 0 }}
      animate={{
        y: [0, -800],
        opacity: [0, 1, 1, 0],
        scale: [0.8, 1, 1, 0.8],
        x: [0, xOffset * 0.2, xOffset * 0.4, xOffset],
        rotate: [0, direction === "left" ? -360 : 360],
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default Bubble;
