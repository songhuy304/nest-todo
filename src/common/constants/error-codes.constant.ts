export enum ErrorCodes {
  //user
  USER_INVALID = 'error.user.invalid',
  USER_NOT_FOUND = 'error.user.not-found',
  USER_INVALID_CREDENTIALS = 'error.user.invalid-credentials',
  USER_ALREADY_EXISTS = 'error.user.already-exists',

  //auth
  AUTH_EXPIRED = 'error.auth.expired',
  AUTH_UNAUTHORIZED = 'error.auth.unauthorized',
  AUTH_FORBIDDEN = 'error.auth.forbidden',

  //task
  TASK_NOT_FOUND = 'error.task.not-found',

  INTERNAL_ERROR = 'error.internal',
}
