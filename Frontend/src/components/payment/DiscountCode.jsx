import React from "react";
import { EventuroApi } from "../../api";
import AlertMessage from "../AlertMessage";
import { DISCOUNT_CODE_TEXTS } from "./texts";

export default function DiscountCode({ userId, eventId, order, setOrder }) {
  const endpoint = "/discount/validate";
  const method = "POST";

  const [errorCode, setErrorCode] = React.useState(0);
  const [discountCode, setDiscountCode] = React.useState("");
  const [appliedCodes, setAppliedCodes] = React.useState([]);
  const [showDiscountCodeAlert, setShowDiscountCodeAlert] =
    React.useState(false);
  const handleChange = (event) => {
    setDiscountCode(event.target.value);
  };

  const handleDiscount = () => {
    if (discountCode === "") {
      setShowDiscountCodeAlert(true);
      return;
    } else {
      setShowDiscountCodeAlert(false);
    }

    const data = {
      code: discountCode,
      eventId: eventId,
      userId: userId,
      appliedCodes: [],
      items: [{}],
    };

    try {
      console.log(discountCode);
      const response = EventuroApi({
        endpoint: endpoint,
        method: method,
        data: data,
      });
      if (response.success != "true") {
        setErrorCode(response.code);
        setShowDiscountCodeAlert(false);
        return;
      }

      let order_placeholder = order;

      setAppliedCodes(...appliedCodes, response.discount.code);
      if (response.discount.type === "PERCENTAGE") {
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full max-w-lg mt-6 pb-2">
        <p className="font-medium mb-2">{DISCOUNT_CODE_TEXTS.title}</p>
        <div className="flex gap-2">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Código de descuento aquí"
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            onClick={handleDiscount}
            className="bg-yellow-400 text-white px-4 rounded hover:bg-yellow-500 transition-transform duration-200 active:scale-102"
          >
            Agregar
          </button>
        </div>
      </div>
      {showDiscountCodeAlert && (
        <AlertMessage id="discount-code-alert">
          {DISCOUNT_CODE_TEXTS.alerts[0]}
        </AlertMessage>
      )}
    </div>
  );
}
