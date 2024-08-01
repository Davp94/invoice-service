import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';
import { AuthDataDto } from '../dto/auth-data.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async saveCategory(@Req() req, @Body() authDto: AuthDto): Promise<AuthDataDto> {
    return await this.authService.authUser(authDto);
  }
}
