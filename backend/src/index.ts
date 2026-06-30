import express, { type Request, type Response } from "express";
import v1Router from "./routes/v1";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8081;

if (Number.isNaN(port)) {
  throw new Error("PORT must be a number");
}

app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "stagepick-backend",
  });
});

// All v1 API routes live under /v1
app.use("/v1", v1Router);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`API running on http://localhost:${port}`);
});