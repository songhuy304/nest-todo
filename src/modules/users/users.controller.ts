import { User } from '@/common/decorator';
import type { JwtUser } from '@/common/interfaces';
import { Controller, Get } from '@nestjs/common';
import { UserDto } from './dtos';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getMe(@User() req: JwtUser): Promise<UserDto> {
    return this.usersService.getMe(req.id);
  }
}
