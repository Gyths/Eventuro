export async function withAudit(userId, work) {
  return prisma.$transaction(async (tx) => {
    const actor = userId === null || userId === undefined ? '' : String(userId);
    await tx.$executeRaw`SELECT set_config('app.userId', ${actor}, true)`;
    return work(tx);
  });
}