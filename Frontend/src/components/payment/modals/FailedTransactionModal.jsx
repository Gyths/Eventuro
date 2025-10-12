import React from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import BaseModal from "./BaseModal";

function FailedTransactionModal() {
  const ticketSelectionPage = "/seleccionTickets";
  const navigate = useNavigate();

  function onClick() {
    navigate(ticketSelectionPage);
  }
  return (
    <>
      <BaseModal>
        <div className="flex flex-col justify-center items-center h-auto w-auto rounded-lg bg-white p-6 gap-6">
          <XCircleIcon className="text-red-500 size-30"></XCircleIcon>
          <span>Hubo un error al completar su compra</span>
          <hr className="flex text-purple-950 w-full"></hr>
          <button
            onClick={onClick}
            className="flex flex-1 py-2 px-6 justify-center rounded-lg cursor-pointer bg-purple-700 text-white font-semibold hover:scale-101 hover:bg-purple-800 transition-transform"
          >
            Volver
          </button>
        </div>
      </BaseModal>
    </>
  );
}

export default FailedTransactionModal;
