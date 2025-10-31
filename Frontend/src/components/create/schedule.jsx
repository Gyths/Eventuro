// schedule.js
export function parseToMinutesHHMM(hhmm) {
  const m = String(hhmm || "").trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return NaN;
  const h = Number(m[1]), mm = Number(m[2]);
  if (h < 0 || h > 23 || mm < 0 || mm > 59) return NaN;
  return h * 60 + mm;
}

export function hasOverlaps(schedules = []) {
  const EARLY_CUTOFF = 8 * 60; // 08:00 -> “madrugada” del día siguiente

  // Normaliza a intervalos [start, endAdj)
  const intervals = schedules
    .map((s) => {
      const sm = parseToMinutesHHMM(s.start);
      const em = parseToMinutesHHMM(s.end);
      if (Number.isNaN(sm) || Number.isNaN(em)) return null;
      let end = em;
      if (end <= sm) end += 1440; // cruza medianoche
      return { id: s.id, start: sm, end };
    })
    .filter(Boolean)
    .sort((a, b) => a.start - b.start);

  // 1) Cruces “normales” en el mismo día
  for (let i = 0; i < intervals.length - 1; i++) {
    const a = intervals[i];
    const b = intervals[i + 1];
    // Igualdad en el borde NO cuenta como cruce (a.end > b.start, no >=)
    if (a.end > b.start) return true;
  }

  // 2) Cruces por spill (parte en la madrugada del día siguiente)
  //    Solo comparar con horarios que empiezan antes de EARLY_CUTOFF
  for (const a of intervals) {
    if (a.end > 1440) {
      const spillEnd = a.end - 1440; // tramo del “día siguiente”
      const limit = Math.min(spillEnd, EARLY_CUTOFF);
      if (limit > 0) {
        for (const b of intervals) {
          if (b === a) continue;
          // Solo consideramos “madrugada” real
          if (b.start < limit && b.end <= 1440) {
            // b está íntegro en el mismo día (no cruza) y cae en [0, limit)
            return true;
          }
          // Están ordenados; si b.start >= limit ya no habrá más candidatos
          if (b.start >= limit) break;
        }
      }
    }
  }

  return false;
}
