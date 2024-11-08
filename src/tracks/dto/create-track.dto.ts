import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsInt()
  @IsNotEmpty()
  duration: number;

  @IsOptional()
  artistId: string | null;
  
  @IsOptional()
  albumId: string | null;
}
