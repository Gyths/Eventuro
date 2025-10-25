export function select_test(testNum, eventId) {
  const tests = [
    // Concierto Sinfónico PUCP 2025 (con asientos)
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

    // Seminario de Ciberseguridad y Prevención de Fraudes
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

    // Festival Gastronómico del Sur (sin asientos)
    [
      {
        eventId: 3,
        eventDateId: 5, // día 1 del festival
        eventDateZoneId: 9, // Entrada General - Día 1
        quantity: 2,
      },
    ],

    // Obra de Teatro “El Último Ensayo” (con asientos)
    [
      {
        eventId: 4,
        eventDateId: 8, // primera función
        eventDateZoneId: 13, // Palco VIP
        zoneDateAllocationId: 27, // Estudiantes
        seatId: 2800, // asiento ejemplo
        quantity: 1,
      },
    ],

    // Expo Tecnología Lima 2025 (sin asientos)
    [
      {
        eventId: 5,
        eventDateId: 11, // primer día de la expo
        eventDateZoneId: 18, // Pase General - Día 1
        quantity: 2,
      },
    ],
  ];

  return tests[testNum - 1];
}
