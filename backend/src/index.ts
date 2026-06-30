import express, { type Request, type Response } from "express";
import v1Router from "./routes/v1";

const app = express();
const port = process.env.PORT ?? 8080;

app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "stagepick-api",
  });
});

// All v1 API routes live under /v1
app.use("/v1", v1Router);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
  });
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});