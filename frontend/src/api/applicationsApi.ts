const BACKEND_URL =
  import.meta.env.BACKEND_URL ?? "http://localhost:8081/v1";

export type CreateApplicationPayload = {
  stageName: string;
  email: string;
  motivation: string;
};

export async function createApplication(payload: CreateApplicationPayload) {
  const response = await fetch(`${BACKEND_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to submit application");
  }

  return response.json();
}