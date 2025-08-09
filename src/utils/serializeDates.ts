export function serializeDates<T>(input: T): T {
  if (input instanceof Date) {
    return input.toISOString() as unknown as T;
  }

  if (Array.isArray(input)) {
    return input.map(serializeDates) as unknown as T;
  }

  if (input !== null && typeof input === "object") {
    const newObj = {} as T;
    for (const key in input) {
      newObj[key] = serializeDates(input[key]);
    }
    return newObj;
  }

  return input;
}
