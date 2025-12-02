import { User } from '@/common/decorator';
import type { JwtUser } from '@/common/interfaces';
import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { UserDto } from './dtos';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '@/common';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getMe(@User() req: JwtUser): Promise<UserDto> {
    return this.usersService.getMe(req.id);
  }

  @Delete('logout')
  async logout(@User() req: JwtUser): Promise<void> {
    return this.usersService.logout(req.id);
  }
}
