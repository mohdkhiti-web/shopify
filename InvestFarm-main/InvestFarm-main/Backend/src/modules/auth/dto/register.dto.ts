import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ 
    example: 'John Doe',
    description: 'User full name'
  })
  @IsString()
  name: string;

  @ApiProperty({ 
    example: 'john@example.com',
    description: 'User email address'
  })
  @IsEmail()
  email: string;

  @ApiProperty({ 
    example: 'password123',
    description: 'User password (minimum 6 characters)'
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ 
    example: '+1234567890',
    description: 'User phone number',
    required: false
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ 
    example: 'farmer',
    description: 'User role',
    required: false,
    default: 'farmer'
  })
  @IsString()
  @IsOptional()
  role?: string;
} 