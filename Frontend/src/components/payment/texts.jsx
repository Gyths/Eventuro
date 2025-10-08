//Textos relevantes a utilizar en los componentes del flujo de pago

//Párrafos de la descripción de E-Tickets, utilizado en /src/payment/ETicketDescription.jsx
export const ETICKETS_DESCRIPTION = {
  first:
    "Una vez confirmada tu compra, recibirás tus tickets directamente en el correo electrónico registrado en tu cuenta. Revisa tu bandeja de entrada y, de ser necesario, la carpeta de spam o correo no deseado.",
  second:
    "Con el ticket podrás acceder al evento presentándolo en formato digital desde tu dispositivo móvil o impreso en papel. Ten en cuenta que, para eventos deportivos, conforme a la Ley N° 30037, es obligatorio presentar la entrada impresa.",
  third:
    "Cada ticket cuenta con un sistema de control y seguridad que valida su autenticidad en el acceso. En caso de generarse duplicados, solo se permitirá el ingreso a la primera persona registrada, bloqueando cualquier intento de ingreso posterior con la misma entrada.",
};

//Texto para el checkbox de términos y condiciones, utilizado en /src/payment/TermsServicesCheckbox.jsx
export const TERMS_AND_CONDITIONS_TEXT = {
  text: "He leído y acepto los Términos y Condiciones y la Política de Privacidad.",
};

//Descripciones de los métodos de pago, utilizado en /src/payment/PaymentOptions.jsx
export const PAYMENT_OPTION_DESCRIPTIONS = {
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
};
