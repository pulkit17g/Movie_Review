"use client"
import React, { useEffect } from "react";
import ReactPortal from "./ReactPortal";

interface ModalProps {
    children: React.ReactElement;
    isOpen: boolean; // Use lowercase 'boolean'
    handleClose: () => void;
  }
  

  const Modal = ({ children, isOpen, handleClose }: ModalProps) => {
    useEffect(() => {
      const closeOnEscapeKey = (e: KeyboardEvent) => e.key === "Escape" ? handleClose() : null;
      document.body.addEventListener("keydown", closeOnEscapeKey);
      return () => document.body.removeEventListener("keydown", closeOnEscapeKey);
    }, [handleClose]);
  
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }, [isOpen]);
  
    if (!isOpen) return null;
  
  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <>
        <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-black opacity-60" onClick={handleClose} />
        <div className="fixed rounded flex flex-col box-border min-w-fit overflow-hidden p-5 bg-white inset-y-40 inset-x-72 z-50">
          <div className="box-border p-6">{children}</div>
        </div>
      </>
    </ReactPortal>
  );
};

export default Modal;
