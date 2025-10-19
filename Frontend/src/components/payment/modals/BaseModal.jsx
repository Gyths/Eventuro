import React from "react";
import { motion } from "framer-motion";

function BaseModal({ children }) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div
        className={
          "fixed inset-0 flex justify-center items-center transition-colors bg-black/20 backdrop-blur-xs"
        }
      >
        {children}
      </div>
    </motion.div>
  );
}

export default BaseModal;
