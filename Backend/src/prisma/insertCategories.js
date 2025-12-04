export default async function insertCategories(eventCategory) {
  const now = new Date();

  await eventCategory.createMany({
    data: [
      { initials: "MUS", description: "Música", createdAt: now, updatedAt: now },
      { initials: "DEP", description: "Deportes", createdAt: now, updatedAt: now },
      { initials: "TEA", description: "Teatro", createdAt: now, updatedAt: now },
      { initials: "CUL", description: "Cultura", createdAt: now, updatedAt: now },
      { initials: "TEC", description: "Tecnología", createdAt: now, updatedAt: now },
      { initials: "GAS", description: "Gastronomía", createdAt: now, updatedAt: now },
      { initials: "EDU", description: "Educativo", createdAt: now, updatedAt: now },
      { initials: "NEG", description: "Negocios", createdAt: now, updatedAt: now },
      { initials: "EXP", description: "Exposición", createdAt: now, updatedAt: now },
      { initials: "OTR", description: "Otros", createdAt: now, updatedAt: now },
      { initials: "CIN", description: "Cine", createdAt: now, updatedAt: now },
      { initials: "LIT", description: "Literatura", createdAt: now, updatedAt: now },
      { initials: "FAM", description: "Familia y Niños", createdAt: now, updatedAt: now },
      { initials: "COM", description: "Comedia y Stand-up", createdAt: now, updatedAt: now },
      { initials: "ART", description: "Arte", createdAt: now, updatedAt: now },
      { initials: "MOD", description: "Moda", createdAt: now, updatedAt: now },
      { initials: "EMP", description: "Emprendimiento", createdAt: now, updatedAt: now },
      { initials: "REL", description: "Religiosos", createdAt: now, updatedAt: now },
      { initials: "SAL", description: "Salud y Bienestar", createdAt: now, updatedAt: now },
      { initials: "DAN", description: "Danza", createdAt: now, updatedAt: now },
      { initials: "JUE", description: "Juegos y Gaming", createdAt: now, updatedAt: now },
      { initials: "ANI", description: "Anime y Cultura Geek", createdAt: now, updatedAt: now },
      { initials: "FER", description: "Ferias", createdAt: now, updatedAt: now },
      { initials: "POL", description: "Política y Debates", createdAt: now, updatedAt: now },
      { initials: "MED", description: "Medicina y Ciencia", createdAt: now, updatedAt: now },
    ],
    skipDuplicates: true,
  });
}
