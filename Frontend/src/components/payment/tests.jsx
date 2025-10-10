export function select_test(testNum, eventId) {
  const tests = [
    [
      {
        eventId: eventId,
        eventDateId: 2,
        eventDateZoneId: 4,
        quantity: 1,
      },
    ],
    [
      {
        eventId: eventId,
        eventDateId: 3,
        eventDateZoneId: 5,
        quantity: 1,
        seatId: 241,
      },
    ],
    [
      {
        eventId: eventId,
        eventDateId: 2,
        eventDateZoneId: 3,
        eventDateZoneAllocationId: 4,
        quantity: 1,
        seatId: 121,
      },
    ],
    [
      {
        eventId: eventId,
        eventDateId: 2,
        eventDateZoneId: 3,
        eventDateZoneAllocationId: 5,
        quantity: 1,
        seatId: 123,
      },
    ],
    [
      {
        eventId: eventId,
        eventDateId: 2,
        eventDateZoneId: 3,
        eventDateZoneAllocationId: 4,
        quantity: 1,
        seatId: 124,
      },
      {
        eventId: eventId,
        eventDateId: 2,
        eventDateZoneId: 3,
        eventDateZoneAllocationId: 1,
        quantity: 1,
        seatId: 125,
      },
    ],
  ];

  return tests[testNum - 1];
}
