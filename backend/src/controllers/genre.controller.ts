import type { Request, Response } from "express";

export function listGenres(_req: Request, res: Response) {
  res.status(200).json({
    data: [
      {"id": "1", "name": "House"},
      {"id": "2", "name": "Techno"}, 
      {"id": "3", "name": "Drum & Bass"}],
  });
}

export function deleteGenre(req: Request, res: Response) {
  const { genreId } = req.params;

  res.status(204).send();
}

export function addGenre(req: Request, res: Response) {
  const genre = req.body;

  res.status(201).json({
    message: "Genre added",
    data: genre,
  });
}