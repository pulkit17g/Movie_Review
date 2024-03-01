// ReactPortal.tsx
"use client"
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

function ReactPortal({
  children,
  wrapperId,
}: {
  children: React.ReactElement;
  wrapperId: string;
}) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement>();

  useEffect(() => {
    let element = document.getElementById(wrapperId);

    if (!element) {
      element = createWrapperAndAppendToBody(wrapperId);
    }

    setWrapperElement(element);

    return () => {
      if (wrapperElement && wrapperElement.parentNode) {
        wrapperElement.parentNode.removeChild(wrapperElement);
      }
    };
  }, [wrapperId]);

  if (!wrapperElement) return null;

  return createPortal(children, wrapperElement);
}

export default ReactPortal;
