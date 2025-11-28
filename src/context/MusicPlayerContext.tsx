import React, { createContext, useContext, useState } from "react";
import { Audio } from "expo-av";

export type Song = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audioUrl: string; // Jamendo MP3 URL
};

export type Playlist = {
  id: string;
  name: string;
  description: string;
  cover: string;
  songs: Song[];
};

type MusicPlayerContextType = {
  currentSong: Song | null;
  currentPlaylist: Playlist | null;

  // queue system
  queue: Song[];
  addToQueue: (song: Song) => void;
  removeFromQueue: (id: string) => void;
  clearQueue: () => void;

  // playback
  isPlaying: boolean;
  position: number;
  duration: number;
  playSong: (song: Song, playlist?: Playlist) => Promise<void>;
  playPause: () => Promise<void>;
  playNext: () => void;
  playPrev: () => void;
  seekTo: (millis: number) => Promise<void>;
};

const MusicPlayerContext = createContext<MusicPlayerContextType | null>(null);

// GLOBAL AUDIO ENGINE
let soundObj: Audio.Sound | null = null;

export const MusicPlayerProvider = ({ children }: any) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);

  // NEW — queue
  const [queue, setQueue] = useState<Song[]>([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);

  // AUDIO CONFIG
  Audio.setAudioModeAsync({
    staysActiveInBackground: true,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: false,
  });

  // unload previous song
  async function unloadPrevious() {
    if (soundObj) {
      await soundObj.unloadAsync();
      soundObj = null;
    }
  }

  // playback callback
  const onPlaybackStatusUpdate = (status: any) => {
    if (!status.isLoaded) return;

    setPosition(status.positionMillis);
    setDuration(status.durationMillis || 1);
    setIsPlaying(status.isPlaying);

    if (status.didJustFinish) {
      playNext();
    }
  };

  // MAIN PLAY FUNCTION
  const playSong = async (song: Song, playlist?: Playlist) => {
    try {
      await unloadPrevious();

      if (playlist) setCurrentPlaylist(playlist);
      setCurrentSong(song);

      const { sound } = await Audio.Sound.createAsync(
        { uri: song.audioUrl },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      soundObj = sound;
      setIsPlaying(true);
    } catch (e) {
      console.log("Audio play error:", e);
    }
  };

  // PLAY/PAUSE
  const playPause = async () => {
    if (!soundObj) return;

    if (isPlaying) {
      await soundObj.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundObj.playAsync();
      setIsPlaying(true);
    }
  };

  // NEXT SONG LOGIC (queue first)
  const playNext = () => {
    // 1) If queue has songs → play next queue item
    if (queue.length > 0) {
      const nextSong = queue[0];
      setQueue((prev) => prev.slice(1));
      playSong(nextSong, currentPlaylist);
      return;
    }

    // 2) Playlist fallback
    if (!currentPlaylist || !currentSong) return;

    const index = currentPlaylist.songs.findIndex(
      (s) => s.id === currentSong.id
    );
    const nextIndex = (index + 1) % currentPlaylist.songs.length;
    playSong(currentPlaylist.songs[nextIndex], currentPlaylist);
  };

  // PREVIOUS
  const playPrev = () => {
    if (!currentPlaylist || !currentSong) return;

    const index = currentPlaylist.songs.findIndex(
      (s) => s.id === currentSong.id
    );
    const prevIndex =
      index === 0 ? currentPlaylist.songs.length - 1 : index - 1;

    playSong(currentPlaylist.songs[prevIndex], currentPlaylist);
  };

  // QUEUE FUNCTIONS
  const addToQueue = (song: Song) => {
    setQueue((prev) => [...prev, song]);
  };

  const removeFromQueue = (id: string) => {
    setQueue((prev) => prev.filter((s) => s.id !== id));
  };

  const clearQueue = () => setQueue([]);

  // SEEK
  const seekTo = async (millis: number) => {
    if (!soundObj) return;
    await soundObj.setPositionAsync(millis);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        currentPlaylist,
        queue,
        addToQueue,
        removeFromQueue,
        clearQueue,
        isPlaying,
        position,
        duration,
        playSong,
        playPause,
        playNext,
        playPrev,
        seekTo,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext)!;
