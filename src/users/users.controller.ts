import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

class User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  @Get()
  findAll(@Query('role') role?: 'intern' | 'employee' | 'admin') {
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Post()
  create(@Body() user: User) {
    return user; 
  }

  @Patch(':id')
  udpateOne(@Param('id') id: string, @Body() userUpdate: {}) {
    return { id, ...userUpdate };
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return { id };
  }
}
