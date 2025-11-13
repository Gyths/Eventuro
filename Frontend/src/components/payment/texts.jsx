//Textos relevantes a utilizar

export const EVENT_INFORMATION_TEXTS = {
  alerts: {
    0: "Ha ocurrido un error inesperado, por favor vuelva a intentarlo.",
    1: "El evento seleccionado no existe.",
    2: "Este evento no se encuentra activo.",
    3: "El evento ha terminado.",
    4: "No hay fases de venta activas para este evento.",
  },
};

export const TICKET_SELECTION_TEXTS = {
  alerts: {
    0: "¡Lo sentimos! Ha ocurrido un error inesperado, por favor vuelva a intentarlo.",
    2: "Como organizador, no puede comprar entradas para su propio evento.",
    3: "Se ha excedido la cantidad máxima de entradas por usuario.",
    4: "Su orden excede la capacidad restante para este evento.",
    5: "Uno o más asientos seleccionados no están disponibles.",
    6: "Uno o más asientos seleccionados ya fueron ocupados.",
    7: "Su orden excede la capacidad restante para este evento.",
    8: "Por favor, seleccione al menos un ítem para continuar.",
  },
};

//Párrafos de la descripción de E-Tickets, utilizado en /src/payment/ETicketDescription.jsx
export const ETICKETS_DESCRIPTION = {
  first:
    "Una vez confirmada tu compra, recibirás tus tickets directamente en el correo electrónico registrado en tu cuenta. Revisa tu bandeja de entrada y, de ser necesario, la carpeta de spam o correo no deseado.",
  second:
    "Con el ticket podrás acceder al evento presentándolo en formato digital desde tu dispositivo móvil o impreso en papel. Ten en cuenta que, para eventos deportivos, conforme a la Ley N° 30037, es obligatorio presentar la entrada impresa.",
  third:
    "Cada ticket cuenta con un sistema de control y seguridad que valida su autenticidad en el acceso. En caso de generarse duplicados, solo se permitirá el ingreso a la primera persona registrada, bloqueando cualquier intento de ingreso posterior con la misma entrada.",
};

//Texto y mensaje de alerta para el checkbox de términos y condiciones, utilizado en /src/payment/TermsServicesCheckbox.jsx
export const TERMS_AND_CONDITIONS_TEXTS = {
  des: "He leído y acepto los Términos y Condiciones y la Política de Privacidad.",
  alert: "Debes aceptar los términos y condiciones para continuar",
};

//Descripciones y mensaje de alerta de los métodos de pago, utilizado en /src/payment/PaymentOptions.jsx y /src/pages/PaymentMethod.jsx
export const PAYMENT_OPTION_TEXTS = {
  "credit-debit-card": {
    title: "Tarjeta de Crédito / Débito",
    description:
      "Ingresa los datos de tu tarjeta o selecciona una tarjeta guardada para realizar tu compra",
  },
  "yape-plin": {
    title: "Yape / Plin",
    description:
      "Ingresa un número asociado a una cuenta de Yape o Plin e ingresa el código de verificación que se encuentra en tu aplicativo para realizar tu compra",
  },
  alert: "Debes seleccionar una opción para realizar el pago",
};

export const DISCOUNT_CODE_TEXTS = {
  title: "¿Tienes algún código de descuento?",
  alerts: {
    0: "Ha ocurrido un error inesperado.",
    1: "Ingrese un código de descuento.",
    2: "El código ingresado no es válido.",
    3: "El código ingresado no es aplicable en este evento.",
    4: "El código de descuento no está activo.",
    5: "El código de descuento ha expirado.",
    6: "Se alcanzó el límite de usos para este código de descuento.",
    7: "Este código de descuento no puede ser combinado con otros código.",
    8: "No hay ítems aplicables en el carrito de compras",
    9: "El código ya ha sido aplicado",
  },
};
