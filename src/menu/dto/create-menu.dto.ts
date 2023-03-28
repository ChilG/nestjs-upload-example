import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, format: 'binary' })
  image: object;
}
