"use client";

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="ui:fixed ui:inset-0 ui:z-50 ui:bg-black/30 ui:flex ui:items-center ui:justify-center">
      <div className="ui:bg-white ui:rounded-xl ui:shadow-xl ui:max-w-md ui:w-full ui:p-6 ui:relative">
        <button
          className="ui:absolute ui:top-2 ui:right-2 ui:text-gray-600 ui:hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>
        {title && (
          <h2 className="ui:text-lg ui:font-bold ui:mb-4 ui:text-green-800">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
}
