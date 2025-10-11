import React from "react";
import BaseModal from "./BaseModal";
import { useNavigate } from "react-router-dom";

function ReturnConfirmationModal({ onCancel }) {
  const navigate = useNavigate();
  const ticketSelectionRoute = "/seleccionTickets";
  return (
    <>
      <BaseModal>
        <div className="flex flex-col rounded-lg bg-white size-auto p-5">
          <span className="font-semibold pb-2">Confirmar</span>
          <hr className="text-purple-800"></hr>
          <span className="p-4">¿Está seguro que desea retroceder?</span>
          <div className="flex flex-row gap-10">
            <button
              onClick={() => navigate(ticketSelectionRoute)}
              className="flex flex-1 rounded-lg justify-center py-0.5 bg-red-500/90 text-white cursor-pointer hover:scale-105 hover:bg-red-600/80 transition-transform"
            >
              Si
            </button>
            <button
              onClick={onCancel}
              className="flex flex-1 rounded-lg justify-center bg-purple-600 text-white cursor-pointer hover:scale-105 hover:bg-purple-800 transition-transform"
            >
              No
            </button>
          </div>
        </div>
      </BaseModal>
    </>
  );
}

export default ReturnConfirmationModal;
