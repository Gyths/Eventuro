export function select_test(testNum, eventId) {
  const tests = [
    // ========================================================
    // 1️⃣ Concierto Sinfónico PUCP 2025 (con asientos)
    // ========================================================
    [
      {
        eventId: 1,
        eventDateId: 1, // primera fecha del concierto
        eventDateZoneId: 1, // Zona VIP
        zoneDateAllocationId: 1, // descuento +65
        seatId: 45, // asiento numerado (ejemplo)
        quantity: 1,
      },
    ],

    // ========================================================
    // 2️⃣ Seminario de Ciberseguridad y Prevención de Fraudes
    // ========================================================
    [
      {
        eventId: 2,
        eventDateId: 3, // primera fecha del seminario
        eventDateZoneId: 5, // Asientos Preferenciales
        zoneDateAllocationId: 9, // Estudiantes Universitarios
        seatId: 2050, // asiento ejemplo
        quantity: 1,
      },
    ],

    // ========================================================
    // 3️⃣ Festival Gastronómico del Sur (sin asientos)
    // ========================================================
    [
      {
        eventId: 3,
        eventDateId: 5, // día 1 del festival
        eventDateZoneId: 9, // Entrada General - Día 1
        zoneDateAllocationId: 23, // Niños menores de 12
        seatId: null, // no hay asientos
        quantity: 2,
      },
    ],

    // ========================================================
    // 4️⃣ Obra de Teatro “El Último Ensayo” (con asientos)
    // ========================================================
    [
      {
        eventId: 4,
        eventDateId: 9, // primera función
        eventDateZoneId: 13, // Palco VIP
        zoneDateAllocationId: 31, // Estudiantes
        seatId: 2800, // asiento ejemplo
        quantity: 1,
      },
    ],

    // ========================================================
    // 5️⃣ Expo Tecnología Lima 2025 (sin asientos)
    // ========================================================
    [
      {
        eventId: 5,
        eventDateId: 12, // primer día de la expo
        eventDateZoneId: 18, // Pase General - Día 1
        zoneDateAllocationId: 39, // Estudiantes
        seatId: null, // no aplica
        quantity: 1,
      },
    ],
  ];

  return tests[testNum - 1];
}
