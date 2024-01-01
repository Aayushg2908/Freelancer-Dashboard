"use client";

import { useEffect, useState } from "react";
import { ProjectModal } from "../ProjectModal";
import { DeleteModal } from "../DeleteModal";
import { ClientModal } from "../ClientModal";

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
      <ClientModal />
    </>
  );
};

export default ModalProvider;
