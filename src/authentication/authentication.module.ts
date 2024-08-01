import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { entities } from 'src/entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    JwtModule.registerAsync({
      useFactory: async () => {
        const options: JwtModuleOptions = {
          privateKey: fs.readFileSync(path.join(__dirname, 'key/key_rsa.pem'), 'utf8'),
          publicKey: fs.readFileSync(path.join(__dirname, 'key/key_rsa.pub.pem'), 'utf8'),
          signOptions: {
            algorithm: 'RS256',
          },
        };
        return options;
      },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthenticationModule {}
