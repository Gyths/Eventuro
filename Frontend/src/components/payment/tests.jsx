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
  ];

  return tests[testNum - 1];
}
