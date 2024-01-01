"use client";

import { useEffect, useState } from "react";
import { ProjectModal } from "../ProjectModal";
import { DeleteModal } from "../DeleteModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ProjectModal />
      <DeleteModal />
    </>
  );
};

export default ModalProvider;
