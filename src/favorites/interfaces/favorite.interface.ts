import { Album } from 'src/albums/interfaces/album.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { Track } from 'src/tracks/interfaces/track.interface';

export interface Favorite {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
