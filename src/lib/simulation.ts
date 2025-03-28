import { SimulationResults } from "../models/simultation";

export async function getSimulationResults(
  ranking: number[],
): Promise<SimulationResults | null> {
  const response = await fetch("/api/simulate", {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin,
    body: JSON.stringify({ data: ranking }),
  });
  const jsonResponse = response.json();
  return jsonResponse;
}
