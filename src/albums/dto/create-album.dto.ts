import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ nullable: true, type: String, format: 'uuid' })
  @IsOptional()
  artistId: string | null;
}
