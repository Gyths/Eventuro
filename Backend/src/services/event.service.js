import {
  createEventRepo,
  listEventRepo,
  listEventInfoRepo,
  listEventDateByEventIdRepo,
  listEventDateZonesByEventDateIdRepo,
  setEventStatusRepo,
  eventDetails,
  listEventsByOrganizerRepo,
  listEventstoApproveRepo,
  listSalesSummaryByOrganizer,
  getAttendeesByEventAndOrganizer,
  deleteEventDateZoneAllocationRepo,
  deleteEventDateZoneRepo,
  deleteEventDateRepo,
  deleteEventRepo,
} from "../repositories/event.repo.js";
import { deleteTicketSvc } from "./ticket.service.js";

export async function createEventSvc(userId, input) {
  //console.log(input);
  return await createEventRepo(userId, input);
}

export async function listEventSvc() {
  return listEventRepo();
}

export async function listEventInfoSvc(eventId) {
  return listEventInfoRepo(eventId);
}

export async function listEventDateByEventIdSvc(eventId) {
  return listEventDateByEventIdRepo(eventId);
}

export async function listEventDateZonesByEventDateIdSvc(
  userId,
  eventId,
  eventDateId
) {
  return listEventDateZonesByEventDateIdRepo(userId, eventId, eventDateId);
}

export async function setEventStatusSvc(userId, { id, status, percentage }) {
  return setEventStatusRepo(userId, { eventId: id, status, percentage });
}

export async function _getEventDetails(id) {
  return eventDetails(id);
}

export async function _listEventsByOrganizer(idOrganizer) {
  return listEventsByOrganizerRepo(idOrganizer);
}

export async function listEventstoApproveSvc({ page = 1, pageSize = 10 }) {
  return listEventstoApproveRepo({ page, pageSize });
}

export async function getSalesSummarySvc(organizerId) {
  return await listSalesSummaryByOrganizer(organizerId);
}

export async function getAttendeesSvc(eventId, organizerId) {
  if (!eventId) throw new Error("eventId requerido.");
  if (!organizerId) throw new Error("organizerId requerido.");

  return await getAttendeesByEventAndOrganizer({
    eventId: BigInt(eventId),
    organizerId: BigInt(organizerId),
  });
}

export async function deleteEventDateZoneAllocationSvc(edzaId) {
  const result = await deleteEventDateZoneAllocationRepo(edzaId);
  // esto devuelve una lista  {updatedAllcationId,relatedTicketsIds}
  const ticketIdList = result.relatedTicketsIds.map((id) => BigInt(id));
  console.log("ticketIdList --> ", ticketIdList);
  if (ticketIdList.length === 0) {
    return []; // nada que borrar, nada que notificar
  }
  //recorrer la lista de ticketid y eliminar cada uno con deleteTicket(id)
  //cada invocacion a deleteTicket devuelve ticketId, ownerEmail, eventTitle, EventDateStart.
  //Es importante ya que se usara para enviar los correo de aviso
  const result_ticket = await Promise.all(ticketIdList.map((id) => deleteTicketSvc(id)));
  console.log("result_ticket --> ", result_ticket);
  return result_ticket;
}

export async function deleteEventDateZoneSvc(edzId) {
  const result = await deleteEventDateZoneRepo(edzId);
  // esto devuelve una lista {updatedEventDateZoneId, relatedAllocationIds} 
  const allocationList = result.relatedAllocationIds.map((id) => BigInt(id));
  console.log("allocationList --> ", allocationList);
  if (allocationList.length === 0) {
    return []; // nada que borrar, nada que notificar
  }
  // recorrer la lista de allocationId y eliminar cada uno con deleteEventDateZoneAllocationRepo(id)
  // cada invocacion a deleteEventDateZoneAllocationRepo devuelve ticketId, ownerEmail, eventTitle, EventDateStart.
  const result_allocation = await Promise.all(allocationList.map((id) => deleteEventDateZoneAllocationSvc(id)));
  console.log("result_allocation --> ", result_allocation);
  return result_allocation.flat();
}

export async function deleteEventDateSvc(edId) {
  const result = await deleteEventDateRepo(edId);
  //esto devuelve una lista {updatedEventDateId, relatedEventDateZoneIds}
  const zoneList = result.relatedEventDateZoneIds.map((id) => BigInt(id));
  console.log("zoneList --> ", zoneList);
  if (zoneList.length === 0) {
    return []; //nada que borrar, nada que notificar
  }
  //recorrer la lista de eventDateZoneId y eliminar cada uno con deleteEventDateZoneSvc(id)
  //cada invocacion a deleteEventDateZoneSvc devuelve ticketId, ownerEmail, eventTitle, EventDateStart.
  const result_zone = await Promise.all(zoneList.map((id) => deleteEventDateZoneSvc(id)));
  console.log("result_zone --> ", result_zone);
  return result_zone.flat();
}

export async function deleteEventSvc(eventId) {
  const result = await deleteEventRepo(eventId);
  console.log("--> ", result);
  //esto devuelve una lista {updatedEventId, relatedEventDateIds}
  const dateList = result.relatedEventDateIds.map((id) => BigInt(id));
  console.log("dateList --> ", dateList);
  if (dateList.length === 0) {
    return []; //nada que borrar, nada que notificar
  }
  //recorrer la lista de eventDateId y eliminar cada uno con deleteEventDateSvc(id)
  //cada invocacion a deleteEventDateSvc devuelve ticketId, ownerEmail, eventTitle, EventDateStart.
  const result_date = await Promise.all(dateList.map((id) => deleteEventDateSvc(id)));
  console.log("result_date --> ", result_date);
  return result_date.flat();
}
