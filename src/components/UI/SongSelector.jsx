import { useState, useRef, useEffect } from "react";
import { IoClose, IoHeadset, IoPlay, IoMusicalNotes } from "react-icons/io5";
import "./SongSelector.css";
import blackoutAudio from "../../assets/audio/blackout.mp3";

// Song library - easily extensible for more songs
const SONGS = [
  {
    id: "blackout",
    title: "Blackout",
    artist: "Unknown Artist",
    audioUrl: blackoutAudio,
    duration: "3:45",
    color: "#c41e3a", // Christmas red
  },
  // Add more songs here in the future
];

export default function SongSelector({ onSongSelect, onClose }) {
  const [hoveredSong, setHoveredSong] = useState(null);
  const [previewingSong, setPreviewingSong] = useState(null);
  const previewAudioRef = useRef(null);

  // Cleanup preview audio on unmount
  useEffect(() => {
    return () => {
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
        previewAudioRef.current = null;
      }
    };
  }, []);

  const handlePreview = (song) => {
    // Stop any existing preview
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      previewAudioRef.current = null;
    }

    // Create new audio element
    const audio = new Audio(song.audioUrl);
    previewAudioRef.current = audio;

    // Start from a random position (avoid first and last 10 seconds)
    audio.addEventListener("loadedmetadata", () => {
      const duration = audio.duration;
      const minStart = 10;
      const maxStart = Math.max(minStart, duration - 15);
      const randomStart = minStart + Math.random() * (maxStart - minStart);
      audio.currentTime = randomStart;
    });

    // Play for 5 seconds then stop
    audio.play();
    setPreviewingSong(song.id);

    const previewTimeout = setTimeout(() => {
      audio.pause();
      setPreviewingSong(null);
    }, 5000);

    audio.addEventListener("ended", () => {
      clearTimeout(previewTimeout);
      setPreviewingSong(null);
    });
  };

  const handlePlay = (song) => {
    // Stop preview if playing
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      previewAudioRef.current = null;
    }
    setPreviewingSong(null);
    onSongSelect(song);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="song-selector-backdrop" onClick={handleBackdropClick}>
      <div className="song-selector-modal">
        <div className="modal-header">
          <h2 className="modal-title">Select Your Track</h2>
          <button className="close-button" onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <div className="songs-list">
          {SONGS.map((song) => (
            <div
              key={song.id}
              className={`song-card ${hoveredSong === song.id ? "hovered" : ""}`}
              onMouseEnter={() => setHoveredSong(song.id)}
              onMouseLeave={() => setHoveredSong(null)}
              style={{ "--song-color": song.color }}
            >
              <div className="song-info">
                <div className="song-icon">
                  <IoMusicalNotes />
                </div>
                <div className="song-details">
                  <h3 className="song-title">{song.title}</h3>
                  <p className="song-artist">{song.artist}</p>
                  <p className="song-duration">{song.duration}</p>
                </div>
              </div>

              <div className="song-actions">
                <button
                  className={`action-button preview-button ${
                    previewingSong === song.id ? "active" : ""
                  }`}
                  onClick={() => handlePreview(song)}
                  disabled={previewingSong === song.id}
                >
                  {previewingSong === song.id ? (
                    <>
                      <span className="pulse-dot"></span>
                      Previewing...
                    </>
                  ) : (
                    <>
                      <IoHeadset className="icon" />
                      Preview
                    </>
                  )}
                </button>

                <button
                  className="action-button play-button"
                  onClick={() => handlePlay(song)}
                >
                  <IoPlay className="icon" />
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <p className="footer-text">Choose a track to start the experience</p>
        </div>
      </div>
    </div>
  );
}
