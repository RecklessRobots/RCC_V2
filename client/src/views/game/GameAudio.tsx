/*eslint-disable*/
import Music from "./Music2.mp3"

    
      import React, { useRef, useEffect } from 'react';
      import { Button, SliderTrack, SliderFilledTrack, SliderThumb, IconButton, Icon, Box } from '@chakra-ui/react';
      import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
      
      const MyAudioPlayer: React.FC = () => {
        const audioRef1 = useRef<HTMLAudioElement>(null);
      
      
    
  useEffect(() => {
    const audioElement = audioRef1.current;

    if (audioElement) {
      const playPromise = audioElement.play();
      playPromise.catch((error) => {
        console.error("Audio play error:", error);
      });
      audioElement.volume = 1;

      return () => {
        // Clean up audio playback when the component is unmounted
        audioElement.pause();
        audioElement.currentTime = 0;
    
      };
    }

  }, [audioRef1]);
        const handleToggleMute = () => {
          if (audioRef1.current) {
            audioRef1.current.muted = !audioRef1.current.muted;
          }
        };
      
        return (
          <div>
            <audio ref={audioRef1} autoPlay loop>
              <source src={Music} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
      
            <IconButton
              aria-label="Mute/Unmute"
              onClick={handleToggleMute}
              icon={<Icon as={audioRef1.current?.muted ? HiVolumeOff : HiVolumeUp} />}
            />
          </div>
        );
      };
      
      export default MyAudioPlayer;