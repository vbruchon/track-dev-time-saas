import { AnimatePresence, motion } from "framer-motion";

export const AnimatedSubmitLabel = ({
  isMagicLink,
}: {
  isMagicLink: boolean;
}) => {
  return (
    <AnimatePresence mode="wait">
      {isMagicLink ? (
        <motion.span
          key="magic"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          Sign In with magic link
        </motion.span>
      ) : (
        <motion.span
          key="password"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          Sign In
        </motion.span>
      )}
    </AnimatePresence>
  );
};
