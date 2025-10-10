import { ETICKETS_DESCRIPTION } from "./texts";

export default function ETicketDescription() {
  return (
    <div className="flex justify-items-normal bg-white rounded-lg shadow-xl p-10 flex-col gap-10">
      <h2 className="text-2xl font-bold">Ticket Electrónico</h2>
      <p className="text-md">{ETICKETS_DESCRIPTION.first}.</p>
      <p>{ETICKETS_DESCRIPTION.second}</p>
      <p>{ETICKETS_DESCRIPTION.third}</p>
    </div>
  );
}
