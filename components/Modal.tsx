import React, { Dispatch, ReactNode, SetStateAction } from "react";

type ModalProp = {
  show: boolean;
  onclose: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};
function Modal({ show, onclose, children }: ModalProp) {
  return (
    <div
      style={{
        transform: show ? "translateX(0%)" : "translateX(-200%)",
      }}
      className="absolute top-0 left-0 h-full w-full z-10 transition-all duration-500"
    >
      <div className="container mx-auto max-w-2xl h-[80vh] rounded-3xl bg-slate-800 py-6 px-4">
        <button
          onClick={(e) => onclose(false)}
          className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-600"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
