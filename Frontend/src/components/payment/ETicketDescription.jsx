export default function ETicketDescription() {
  return (
    <div className="flex justify-items-normal bg-white rounded-lg shadow-xl p-10 flex-col gap-10">
      <h2 className="text-2xl font-bold">Ticket Electrónico</h2>
      <p className="text-md">
        Una vez confirmada tu compra, recibirás tus tickets directamente en el
        correo electrónico registrado en tu cuenta. Revisa tu bandeja de entrada
        y, de ser necesario, la carpeta de spam o correo no deseado.
      </p>
      <p>
        Con el ticket podrás acceder al evento presentándolo en formato digital
        desde tu dispositivo móvil o impreso en papel. Ten en cuenta que, para
        eventos deportivos, conforme a la Ley N° 30037, es obligatorio presentar
        la entrada impresa.
      </p>
      <p>
        Cada ticket cuenta con un sistema de control y seguridad que valida su
        autenticidad en el acceso. En caso de generarse duplicados, solo se
        permitirá el ingreso a la primera persona registrada, bloqueando
        cualquier intento de ingreso posterior con la misma entrada.
      </p>
    </div>
  );
}
