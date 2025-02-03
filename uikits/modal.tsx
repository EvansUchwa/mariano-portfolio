"use client";

import useModalStore from "@/stores/modal";

function Modal() {
  const isOpen = useModalStore((state) => state.isOpen);
  const content = useModalStore((state) => state.content);
  const toggle = useModalStore((state) => state.toggle);

  if (!isOpen) return;
  return (
    <div className="modal">
      <div className="modalContent">
        <section className="mc-header" onClick={() => toggle(null)}>
          <span>X</span>
        </section>
        <section className="mc-body">{content}</section>
      </div>
    </div>
  );
}

export default Modal;
