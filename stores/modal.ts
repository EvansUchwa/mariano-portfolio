import { ReactNode } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ModalState {
  isOpen: boolean;
  content: ReactNode | null;
  toggle: (content?: ReactNode) => void;
}

const useModalStore = create<ModalState>()(
  devtools((set) => ({
    isOpen: false,
    content: null,
    toggle: (content?: ReactNode) => {
      if (content) {
        set((state) => ({ isOpen: true, content }));
      } else {
        set((state) => ({ isOpen: false, content: null }));
      }
    },
  }))
);

export default useModalStore;
