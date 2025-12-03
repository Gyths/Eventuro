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
  updateEventDetailsRepo,
  deleteEventDateZoneAllocationRepo,
  deleteEventDateZoneRepo,
  deleteEventDateRepo,
  deleteEventRepo,
} from "../repositories/event.repo.js";
import { deleteTicketSvc, listTicketByTypeSvc } from "./ticket.service.js";
import { sendDeleteEventEmailCtrl } from "../controllers/email.controller.js";

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

export async function updateEventDetailsSvc(userId, eventId, details) {
  return updateEventDetailsRepo(userId, eventId, details);
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
  if (ticketIdList.length === 0) {
    return []; // nada que borrar, nada que notificar
  }
  //recorrer la lista de ticketid y eliminar cada uno con deleteTicket(id)
  //cada invocacion a deleteTicket devuelve ticketId, ownerEmail, eventTitle, EventDateStart.
  //Es importante ya que se usara para enviar los correo de aviso
  const result_ticket = await Promise.all(ticketIdList.map((id) => deleteTicketSvc(id)));
  return result_ticket;
}

export async function deleteEventDateZoneSvc(edzId) {
  const result = await deleteEventDateZoneRepo(edzId);
  // esto devuelve una lista {updatedEventDateZoneId, relatedAllocationIds} 
  const allocationList = result.relatedAllocationIds.map((id) => BigInt(id));
  if (allocationList.length === 0) {
    return []; // nada que borrar, nada que notificar
  }
  // recorrer la lista de allocationId y eliminar cada uno con deleteEventDateZoneAllocationRepo(id)
  // cada invocacion a deleteEventDateZoneAllocationRepo devuelve ticketId, ownerEmail, eventTitle, EventDateStart.
  const result_allocation = await Promise.all(allocationList.map((id) => deleteEventDateZoneAllocationSvc(id)));
  return result_allocation.flat();
}

export async function deleteEventDateSvc(edId) {
  const result = await deleteEventDateRepo(edId);
  //esto devuelve una lista {updatedEventDateId, relatedEventDateZoneIds}
  const zoneList = result.relatedEventDateZoneIds.map((id) => BigInt(id));
  if (zoneList.length === 0) {
    return []; //nada que borrar, nada que notificar
  }
  //recorrer la lista de eventDateZoneId y eliminar cada uno con deleteEventDateZoneSvc(id)
  //cada invocacion a deleteEventDateZoneSvc devuelve ticketId, ownerEmail, eventTitle, EventDateStart.
  const result_zone = await Promise.all(zoneList.map((id) => deleteEventDateZoneSvc(id)));
  return result_zone.flat();
}

export async function deleteEventSvc(eventId) {
  const result = await deleteEventRepo(eventId);
  //esto devuelve una lista {updatedEventId, relatedEventDateIds}
  const dateList = result.relatedEventDateIds.map((id) => BigInt(id));
  if (dateList.length === 0) {
    return []; //nada que borrar, nada que notificar
  }
  //recorrer la lista de eventDateId y eliminar cada uno con deleteEventDateSvc(id)
  //cada invocacion a deleteEventDateSvc devuelve ticketId, ownerEmail, eventTitle, EventDateStart.
  const result_date = await Promise.all(dateList.map((id) => deleteEventDateSvc(id)));

  const result_date2 = result_date.flat();
  const uniqueUsers = new Map();

  for (const t of result_date2) {
    const key = `${t.ownerEmail}_${t.eventTitle}`;
    if (!uniqueUsers.has(key)) {
      uniqueUsers.set(key, {
        ownerEmail: t.ownerEmail,
        eventTitle: t.eventTitle,
      });
    }
  }

  const final_result = Array.from(uniqueUsers.values());
  //recorremos final result y en cada elemento mandamos un correo usando sendDeleteEventEmail(userEmail, eventTitle)
  for (const user of final_result) {
    await sendDeleteEventEmailCtrl(user.ownerEmail, user.eventTitle);
  }
  return final_result;
}

export async function deleteTicketyTypeSvc(eventId, ticketTypeId) {
  //antes de eliminar el tipo de ticket, buscar todos los tickets asociados a ese tipo de ticket y eliminarlos
  const ticketsToDelete = await listTicketByTypeSvc(eventId, ticketTypeId);
  const zoneList = ticketsToDelete.map((t) => BigInt(t.eventDateZoneId));
  console.log("Zones to delete:", zoneList);
  if (zoneList.length > 0) {
    await Promise.all(zoneList.map((id) => deleteEventDateZoneSvc(id)));
  }
}

