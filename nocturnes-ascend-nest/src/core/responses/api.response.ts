import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse {
  @ApiProperty()
  success: boolean;
}
