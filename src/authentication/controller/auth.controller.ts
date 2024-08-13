import { Body, Controller, Post, Req, UseFilters } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';
import { AuthDataDto } from '../dto/auth-data.dto';
import { HttpExceptionFilter } from 'src/common/exception/exception-filter';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async saveCategory(@Req() req, @Body() authDto: AuthDto): Promise<AuthDataDto> {
    return await this.authService.authUser(authDto);
  }
}
