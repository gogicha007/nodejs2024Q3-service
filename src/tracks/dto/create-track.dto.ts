import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  artistId: string | null;
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
