export const promiseResult = async <T>(
  promise: Promise<T>
): Promise<PromiseSettledResult<T>> => {
  try {
    const result = await promise;
    return { status: "fulfilled", value: result };
  } catch (error) {
    return { status: "rejected", reason: error };
  }
};

export const fulfilled = <T>(value: T) => ({
  status: "fulfilled" as const,
  value,
});

export const rejected = <T>(reason: T) => ({
  status: "rejected" as const,
  reason,
});

export const isPromiseResult = <T>(
  candidate: unknown
): candidate is PromiseSettledResult<T> => {
  return (
    typeof candidate === "object" &&
    candidate !== null &&
    "status" in candidate &&
    ("value" in candidate || "reason" in candidate)
  );
};
