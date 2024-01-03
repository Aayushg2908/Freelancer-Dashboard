"use client";

import { useEffect, useState } from "react";
import { ProjectModal } from "../ProjectModal";
import { DeleteModal } from "../DeleteModal";
import { ClientModal } from "../ClientModal";
import { TaskModal } from "../TaskModal";

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
      <TaskModal />
    </>
  );
};

export default ModalProvider;
