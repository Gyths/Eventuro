import { stringify } from "node:querystring";
import {
  listReportSaleTicketsSvc,
  exportReportSaleTicketsCsvSvc,
  showSalesReportSvc,
} from "../services/reportSales.service.js";
import { toJSONSafe } from "../utils/serialize.js";

export async function listReportSaleTicketsCtrl(req, res) {
  try {
    const data = await listReportSaleTicketsSvc(req.query);
    return res.json(toJSONSafe(data));
  } catch (err) {
    console.error("listReportSaleTicketsCtrl", err);
    return res.status(500).json({ message: "Unexpected error" });
  }
}

function toCsv(rows) {
  if (!rows || rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v) => {
    if (v == null) return "";
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ];
  return lines.join("\n");
}

export async function exportReportSaleTicketsCsvCtrl(req, res) {
  try {
    const rows = await exportReportSaleTicketsCsvSvc(req.query);
    const csv = toCsv(rows);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="sales_tickets.csv"`
    );
    return res.send(csv);
  } catch (err) {
    console.error("exportReportSaleTicketsCsvCtrl", err);
    return res.status(500).json({ message: "Unexpected error" });
  }
}

export const showSalesReportCtrl = async (req, res) => {
  try {
    const { organizerId } = req.params;

    const data = await showSalesReportSvc(Number(organizerId));
    return res.json(toJSONSafe(data));
  } catch (error) {
    console.error("Error en showSalesReportController:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al generar el reporte de ventas.",
      error: error.message,
    });
  }
};
