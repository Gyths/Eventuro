import { createEventRepo, listEventRepo } from '../repositories/event.repo.js';

export async function createEventSvc(input) {
  return createEventRepo(input);
}

export async function listEventSvc() {

  return listEventRepo();
}