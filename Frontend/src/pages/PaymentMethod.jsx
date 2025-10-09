import React from "react";
import { useNavigate } from "react-router-dom";

import ArrowButton from "../components/ArrowButton.jsx";
import EventInfoCard from "../components/payment/EvenInfoCard.jsx";
import ETicketDescription from "../components/payment/ETicketDescription.jsx";
import TermsServicesCheckbox from "../components/payment/TermsServicesCheckbox.jsx";
import PaymentOptions from "../components/payment/PaymentOptions.jsx";
import DiscountCode from "../components/payment/DiscountCode.jsx";
import ShoppingCart from "../components/payment/ShoppingCart.jsx";

import CardPaymentModal from "../components/payment/modals/CardPaymentModal.jsx";
import YapePlinPaymentModal from "../components/payment/modals/YapePlinPaymentModal.jsx";
import SuccesfulTransactionModal from "../components/payment/modals/SuccesfulTransactionModal.jsx";
import { useModal } from "../context/ModalContext";

import banksLogos from "../assets/credit-debit-card.svg";
import yapePlinLogo from "../assets/yape-plin.svg";

export default function PaymentMethod(Event = null) {
  const titleText = "Elige tu método de pago";
  const navigate = useNavigate();
  const ticketSelectionDest = "/seleccionTickets";
  const homeDest = "/home";
  const viewTicketDest = "/entradas";

  const [total, setTotal] = React.useState(0);
  const { modal, setModal } = useModal();

  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [optionSelected, setOption] = React.useState("nada seleccionado");

  const handleTermsChange = (checked) => {
    setTermsAccepted(checked);
  };

  const handleOptionChange = (selected) => {
    setOption(selected);
  };

  return (
    <>
      <div className="flex flex-col bg-gray-100 min-h-screen px-10">
        <div className="flex flex-wrap items-center gap-4 px-4 py-5 md:px-8">
          <ArrowButton destination={ticketSelectionDest} />
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
            {titleText}
          </h1>

          <div className="flex-1 flex justify-end pr-10">
            <EventInfoCard Event={Event} />
          </div>
        </div>

        <hr className="w-11/12 border-t-2 border-purple-900 mx-auto my-4" />

        <div className="flex flex-col lg:flex-row items-start gap-10 px-4 sm:px-8 md:px-12 py-5">
          <div className="flex flex-col w-full lg:w-3/5 gap-5">
            <ETicketDescription />
            <TermsServicesCheckbox handleTermsChange={handleTermsChange} />
            <PaymentOptions
              id="credit-debit-card"
              title="Tarjeta de crédito / débito"
              image={banksLogos}
              handleOptionChange={handleOptionChange}
            />
            <PaymentOptions
              id="yape-plin"
              title="Yape / Plin"
              image={yapePlinLogo}
              handleOptionChange={handleOptionChange}
            />
            <DiscountCode />
          </div>

          <div className="flex flex-col w-full lg:w-2/5 items-center sm:w-full">
            <ShoppingCart
              termsAccepted={termsAccepted}
              optionSelected={optionSelected}
              openModal={(value) => {
                setModal(value);
              }}
              setTotal={setTotal}
            />
          </div>
        </div>
      </div>

      {modal === "credit-debit-card" && (
        <CardPaymentModal
          onClose={() => setModal(null)}
          onSuccess={() => setModal("success")}
        />
      )}

      {modal === "yape-plin" && (
        <YapePlinPaymentModal
          onClose={() => setModal(null)}
          total={total}
          onSuccess={() => setModal("success")}
        />
      )}

      {modal === "success" && (
        <SuccesfulTransactionModal
          total={total}
          onReturnHome={() => {
            navigate(homeDest);
          }}
          onViewTickets={() => {
            navigate(viewTicketDest);
          }}
        />
      )}
    </>
  );
}
