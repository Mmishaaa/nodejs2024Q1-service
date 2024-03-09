import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../users/interfaces/user.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/users/dto/updatePasswordDto';

import { v4 as uuidv4, validate } from 'uuid';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { Track } from 'src/tracks/interfaces/track.interface';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';

@Injectable()
export class DatabaseService {
  users: User[] = [
    {
      id: 'd335f055-8d41-4128-9406-a3336315cd4b',
      login: 'Login',
      password: '1231212',
      version: 1,
      createdAt: 10,
      updatedAt: 11,
    },
    {
      id: 'd335f055-8d41-4128-9406-a3336315cd4b',
      login: 'Login',
      password: '1231212',
      version: 1,
      createdAt: 10,
      updatedAt: 11,
    },
    {
      id: 'd335f055-8d41-4128-9406-a3336315cd4b',
      login: 'Login',
      password: '1231212',
      version: 1,
      createdAt: 10,
      updatedAt: 11,
    },
    {
      id: 'd335f055-8d41-4128-9406-a3336315cd4b',
      login: 'Login',
      password: '1231212',
      version: 1,
      createdAt: 10,
      updatedAt: 11,
    },
  ];

  tracks: Track[] = [
    {
      id: '0a35dd62-e09f-444b-a628-f4e7c6954f58',
      name: 'Sum 2 Prove',
      artistId: null,
      albumId: null,
      duration: 2,
    },
    {
      id: '0a35dd62-e09f-444b-a628-f4e7c6954f59',
      name: 'Sum 2 Prove',
      artistId: null,
      albumId: null,
      duration: 2,
    },
    {
      id: '0a35dd62-e09f-444b-a628-f4e7c6954f10',
      name: 'Sum 2 Prove',
      artistId: null,
      albumId: null,
      duration: 2,
    },
  ];

  artists: Artist[] = [];
  getAllUsers() {
    return this.users;
  }

  findUser(id: string) {
    return this.users.find((user) => user.id === id);
  }

  createUser(dto: CreateUserDto) {
    const newUser: User = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // const newUser = Object.assign({}, dto)
    this.users.push(newUser);

    const userToReturn = { ...newUser };
    delete userToReturn.password;
    return userToReturn;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const userToUpdate = this.findUser(id);
    userToUpdate.password = updatePasswordDto.newPassword;
    userToUpdate.version += 1;

    const userToReturn = { ...userToUpdate };
    delete userToReturn.password;
    return userToReturn;
  }

  deleteUser(id: string) {
    const indexOfUser = this.users.findIndex((user) => user.id === id);
    this.users.splice(indexOfUser, 1);
  }

  getAllArtists() {
    return this.artists;
  }

  findArtist(id: string) {
    const artist = this.artists.find((artist) => artist.id);
    return artist;
  }

  createArtist(createArtistDto: CreateArtistDto) {
    const newArtist: Artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };

    this.artists.push(newArtist);

    const artistToReturn = { ...newArtist };
    delete artistToReturn.id;
    return artistToReturn;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const artistToUpdate = this.findArtist(id);
    artistToUpdate.name = updateArtistDto.name;
    artistToUpdate.grammy = updateArtistDto.grammy;

    const artistToReturn = { ...artistToUpdate };
    delete artistToReturn.id;
    return artistToReturn;
  }

  deleteArtist(id: string) {
    const indexOfArtist = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(indexOfArtist, 1);

    const artistTracks = this.tracks.filter((track) => track.artistId === id);
    artistTracks.forEach((track) => (track.artistId = null));

    // const artistAlbums = this.albums.filter((album) => album.artistId === id);
    // artistTracks.forEach((album) => (album.artistId = null));
  }

  getAllTracks() {
    return this.tracks;
  }

  findTrack(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  createTrack(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId || null,
      albumId: createTrackDto.albumId || null,
      duration: createTrackDto.duration,
    };

    this.tracks.push(newTrack);

    // const trackToReturn = { ...newTrack };
    // delete trackToReturn.id;
    // return trackToReturn;
    return newTrack;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const trackToUpdate = this.findTrack(id);
    trackToUpdate.albumId = updateTrackDto.albumId;
    trackToUpdate.artistId = updateTrackDto.artistId;
    trackToUpdate.duration = updateTrackDto.duration;
    trackToUpdate.name = updateTrackDto.name;

    // const trackToReturn = { ...trackToUpdate };
    // delete trackToReturn.id;
    // return trackToReturn;
    return trackToUpdate;
  }

  deleteTrack(id: string) {
    const indexOfTrack = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(indexOfTrack, 1);
  }
}
