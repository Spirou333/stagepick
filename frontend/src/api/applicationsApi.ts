const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8081/v1";

export type CreateApplicationPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  motivation: string;
};

export async function createApplication(payload: CreateApplicationPayload) {
  const response = await fetch(`${API_BASE_URL}/applications`, {
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