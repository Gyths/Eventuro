import React from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import useOrder from "../services/Order/OrderContext";
import useEvent from "../services/Event/EventContext";
import { useAuth } from "../services/auth/AuthContext";
import { EventuroApi } from "../api";

import ArrowButton from "../components/ArrowButton";
import EventInfoCard from "../components/payment/EvenInfoCard";
import ETicketDescription from "../components/payment/ETicketDescription";
import TermsServicesCheckbox from "../components/payment/TermsServicesCheckbox";
import PaymentOptions from "../components/payment/PaymentOptions";
import DiscountCode from "../components/payment/DiscountCode";
import ShoppingCart from "../components/payment/ShoppingCart";
import AlertMessage from "../components/AlertMessage";

import { PAYMENT_OPTION_TEXTS } from "../components/payment/texts";
import { TERMS_AND_CONDITIONS_TEXTS } from "../components/payment/texts";

import CardPaymentModal from "../components/payment/modals/CardPaymentModal";
import YapePlinPaymentModal from "../components/payment/modals/YapePlinPaymentModal";
import SuccesfulTransactionModal from "../components/payment/modals/SuccesfulTransactionModal";
import FailedTransactionModal from "../components/payment/modals/FailedTransactionModal";
import ReturnConfirmationModal from "../components/payment/modals/ReturnConfirmationModal";
import { useModal } from "../context/ModalContext";

import banksLogos from "../assets/credit-debit-card.svg";
import yapePlinLogo from "../assets/yape-plin.svg";

import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function PaymentMethod() {
  const titleText = "Elige tu método de pago";
  const navigate = useNavigate();
  const ticketSelectionDest = "/seleccionTickets";
  const homeDest = "/home";
  const viewTicketDest = "/entradas";

  const { event } = useEvent();
  const { order, setOrder } = useOrder();
  console.log(order);
  const { user } = useAuth();
  const { modal, setModal } = useModal(null);

  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [showTermsAlert, setShowTermsAlert] = React.useState(false);
  const [selectedOption, setOption] = React.useState("nada seleccionado");
  const [showSelectedOptionAlert, setSelectedOptionTermsAlert] =
    React.useState(false);

  const handleTermsChange = (checked) => {
    setTermsAccepted(checked);
  };

  const handleOptionChange = (selected) => {
    setOption(selected);
  };

  //Sección para cancelar la orden de compra cuando el usuario salga de la página de compra
  /*  async function cancelOrder() {
    try {
      const response = EventuroApi();
    } catch (err) {
      console.error("Error al crear al realizar la compra:", err);
    }
    console.log("Saliendo de la página de compra...");
  }

  React.useEffect(() => {
    return () => {
      cancelOrder(orderId);
    };
  }, [orderId]);*/

  return (
    <>
      <div className="flex flex-col bg-gray-100 min-h-screen px-10">
        {/*Parte superior de la pantalla, titulo, botón para retroceder, card con la información del evento */}
        <div className="flex flex-wrap items-center gap-4 px-4 py-5 md:px-8">
          <ArrowButton onClick={() => setModal("return")} />
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
            {titleText}
          </h1>

          <div className="flex-1 flex justify-end pr-10">
            <EventInfoCard />
          </div>
        </div>

        <hr className="w-11/12 border-t-2 border-purple-900 mx-auto my-4" />
        {/* Contenido principal de la página */}
        <div className="flex flex-col lg:flex-row items-start gap-10 px-4 sm:px-8 md:px-12 py-5">
          <div className="flex flex-col w-full lg:w-3/5 gap-4">
            {/* Card con información de que es un E-Ticket */}
            <ETicketDescription />
            {/* Términos y condiciones */}
            <TermsServicesCheckbox handleTermsChange={handleTermsChange} />
            {showTermsAlert && (
              <AlertMessage id="terms-services-alert">
                {TERMS_AND_CONDITIONS_TEXTS.alert}
              </AlertMessage>
            )}
            {/* Cards de las opciones de pago */}
            <div className="flex flex-col gap-4">
              <PaymentOptions
                id="credit-debit-card"
                image={banksLogos}
                selectedOption={selectedOption}
                handleOptionChange={handleOptionChange}
              />
              <PaymentOptions
                id="yape-plin"
                image={yapePlinLogo}
                selectedOption={selectedOption}
                handleOptionChange={handleOptionChange}
              />
            </div>
            {showSelectedOptionAlert && (
              <AlertMessage id="payment-options-selected-alert">
                {PAYMENT_OPTION_TEXTS.alert}
              </AlertMessage>
            )}
            {/* TODO: Ingreso de código de descuento*/}
            <DiscountCode />
          </div>
          {/* Carrito de compras*/}
          <div className="flex flex-col w-full lg:w-2/5 items-center sm:w-full">
            <ShoppingCart
              termsAccepted={termsAccepted}
              selectedOption={selectedOption}
              openModal={(value) => {
                setModal(value);
              }}
              setShowTermsAlert={setShowTermsAlert}
              setSelectedOptionTermsAlert={setSelectedOptionTermsAlert}
            />
          </div>
        </div>
      </div>
      {/* MODALES */}
      {/* Modal para pago con tarjeta */}
      <AnimatePresence initial={false}>
        {modal === "credit-debit-card" && (
          <CardPaymentModal
            onClose={() => setModal(null)}
            onSuccess={() => setModal("success")}
            onFail={() => setModal("fail")}
          ></CardPaymentModal>
        )}
      </AnimatePresence>
      {/* Modal para pago con yape / plin */}
      <AnimatePresence initial={false}>
        {modal === "yape-plin" && (
          <YapePlinPaymentModal
            onClose={() => setModal(null)}
            onSuccess={() => setModal("success")}
            onFail={() => setModal("fail")}
          />
        )}
      </AnimatePresence>
      {/* Modal para compra exitosa */}
      <AnimatePresence initial={false}>
        {modal === "success" && (
          <SuccesfulTransactionModal
            onReturnHome={() => {
              navigate(homeDest);
            }}
            onViewTickets={() => {
              navigate(viewTicketDest);
            }}
          />
        )}
      </AnimatePresence>
      {/* Modal para compra fallida */}
      <AnimatePresence initial={false}>
        {modal === "fail" && <FailedTransactionModal />}
      </AnimatePresence>
      {/* TODO: Modal de aviso para retroceder */}
      <AnimatePresence initial={false}>
        {modal === "return" && (
          <ReturnConfirmationModal onCancel={() => setModal(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
