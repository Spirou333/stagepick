export type Genres = {
  id: string;
  name: string;
  main: boolean;
};

const BACKEND_URL =
  import.meta.env.BACKEND_URL ?? "http://localhost:8081/v1";

export async function getGenres(): Promise<Genres[]> {
  const response = await fetch(`${BACKEND_URL}/genres`);
  console.log("Shopping response status:", response);
  if (!response.ok) {
    throw new Error("Failed to load genres");
  }
  const result = await response.json();
  return result.data
}