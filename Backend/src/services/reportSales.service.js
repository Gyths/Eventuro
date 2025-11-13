import {
  listReportSaleTicketsRepo,
  exportReportSaleTicketsCsvRepo,
  showSalesReportRepo,
} from "../repositories/reportSales.repo.js";

export async function listReportSaleTicketsSvc(q) {
  const { page, pageSize, sortBy, sortDir, ...filters } = q;
  return listReportSaleTicketsRepo({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 20,
    sortBy,
    sortDir,
    filters,
  });
}

export async function exportReportSaleTicketsCsvSvc(q) {
  const { ...filters } = q;
  return exportReportSaleTicketsCsvRepo({ filters });
}

export const showSalesReportSvc = async (organizerId) => {
  if (!organizerId) throw new Error("El ID del organizador es requerido.");

  const reportData = await showSalesReportRepo(organizerId);
  return reportData;
};
