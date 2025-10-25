import {
  createEventRepo,
  listEventRepo,
  listAvailableTicketsRepo,
  setEventFeeRepo,
} from "../repositories/event.repo.js";

export async function createEventSvc(input) {
  return createEventRepo(input);
}

export async function listEventSvc() {
  return listEventRepo();
}

export async function listAvailableTicketsSvc(input) {
  return listAvailableTicketsRepo(input);
}

export async function setEventFeeSvc({ id, percentage }) {
  return setEventFeeRepo({ eventId: id, percentage: percentage });
}