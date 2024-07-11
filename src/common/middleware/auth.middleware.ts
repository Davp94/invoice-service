import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const request = req;
    if (request.headers.authorization) {
      const token = request.headers.authorization;
      console.log('🚀 ~ AuthMiddleware ~ use ~ token:', token);
      console.log('obteniendo token para validacion');
    } else {
      throw new Error('NO EXISTE UN HEADER DE AUTENTICACION');
    }

    next();
  }
}
