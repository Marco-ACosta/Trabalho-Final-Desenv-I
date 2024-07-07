
import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validateAvaliador = [
  check("nome").isString().notEmpty(),
  check("login").isString().notEmpty(),
  check("password").isLength({ min: 6 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateEquipe = [
  check("nome").isString().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
]


export { validateAvaliador, validateEquipe };