import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtVerificationMiddleware implements NestMiddleware {
  constructor() {}
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.get('Authorization'); // Get the token from the "token" cookie
    const token = authHeader?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' }); // Return a 401 Unauthorized response if no token is present
    }

    try {
      const decoded = jwt.verify(token, <string>process.env.JWT_SECRET); // Verify the token using the JWT_SECRET environment variable
      req.user = decoded; // Add the decoded token to the "user" property of the request object
      next(); // Call the next middleware or route handler
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' }); // Return a 401 Unauthorized response if the token is invalid or expired
    }
  }
}
