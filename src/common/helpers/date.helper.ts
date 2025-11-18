function toISOStringSafe(date?: Date | null): string | undefined {
  return date ? date.toISOString() : undefined;
}

export { toISOStringSafe };
