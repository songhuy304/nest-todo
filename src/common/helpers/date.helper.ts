const toIso = (value: unknown): string | null => {
  return value instanceof Date ? value.toISOString() : null;
};

export { toIso };
