export class UserNotFoundError extends Error {
  constructor(userId: number) {
    const message = `User with userId: ${userId} not found.`;
    super(message);
  }
}
