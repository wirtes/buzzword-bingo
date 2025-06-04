export function onError(error: Error | string | unknown) {
  let message = String(error);

  if (!(error instanceof Error) && error && typeof error === 'object' && 'message' in error) {
    message = String((error as { message: unknown }).message);
  }

  alert(message);
}
