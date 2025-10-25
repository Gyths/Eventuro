import {
  createEventRepo,
  listEventRepo,
  listAvailableTicketsRepo,
} from "../repositories/event.repo.js";

export async function createEventSvc(input) {
  return await createEventRepo(input);
}

export async function listEventSvc() {
  return listEventRepo();
}

export async function listAvailableTicketsSvc(input) {
  return listAvailableTicketsRepo(input);
}
