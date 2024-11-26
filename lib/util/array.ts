export async function remap<StartType, ReturnType>(values: StartType[], callback: (value: StartType) => Promise<ReturnType>): Promise<ReturnType[]> {
  const results: ReturnType[] = [];
  for (const value of values) {
    results.push(await callback(value));
  }
  return results;
}
