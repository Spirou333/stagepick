import type { Request, Response } from "express";

export function listApplications(_req: Request, res: Response) {
  res.json({
    data: [],
  });
}

export function createApplication(req: Request, res: Response) {
  const applicationData = req.body;

  res.status(201).json({
    message: "Application created",
    data: applicationData,
  });
}

export function getApplicationById(req: Request, res: Response) {
  const { applicationId } = req.params;

  res.status(200).json({
    data: {
      id: applicationId,
    },
  });
}

export function updateApplication(req: Request, res: Response) {
  const { applicationId } = req.params;

  res.status(201).json({
    message: "Application updated",
    data: {
      id: applicationId,
      ...req.body,
    },
  });
}

export function deleteApplication(req: Request, res: Response) {
  const { applicationId } = req.params;

  res.status(204).send();
}