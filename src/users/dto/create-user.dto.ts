import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsInt} from 'class-validator';

export class CreateUserDto {

  @ApiProperty({ example: 'Jade Gonzalez' })
   @IsString()
  name: string;

  @ApiProperty({ example: 'jade@email.com' })
    @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  password: string;

  @ApiProperty({ example: 1 })
    @IsInt()
  tenantId: number;
}
