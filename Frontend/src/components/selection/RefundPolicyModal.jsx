import React from "react";
import BaseModal from "../BaseModal";
import useEvent from "../../services/Event/EventContext";

export default function RefundPolicyModal({ onClose }) {
  const { event } = useEvent();
  return (
    <BaseModal>
      <div className="bg-white rounded-lg w-full md:w-[70vw] lg:w-[70vw] xl:w-[55vw] max-w-4xl shadow-lg relative mt-[5vh] mx-7">
        {/* Header */}
        <div className="h-[80vh] rounded-2xl">
          <iframe
            src={event.refundPolicyFileURLSigned}
            className="w-full h-full rounded-t-lg"
            title="Política de devoluciones"
          />
        </div>
        <div className="flex justify-end rounded-b-lg items-center px-2 py-2 bg-gray-50">
          <button
            onClick={onClose}
            className="flex w-auto bg-red-500 hover:bg-red-600 hover:scale-105 cursor-pointer transition-all px-2 text-white rounded-lg"
          >
            Volver
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
