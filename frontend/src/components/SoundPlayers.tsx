import { StyledSoundPlayers } from "../styles/SoundPlayers.styled";
import SoundPlayer from "./SoundPlayer";

const SoundPlayers = ({
  resetVolume,
  setResetVolume,
}: {
  resetVolume: boolean;
  setResetVolume: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <StyledSoundPlayers>
      <SoundPlayer
        resetVolume={resetVolume}
        setResetVolume={setResetVolume}
        soundName={"RainIcon"}
        audioFileName={"rain.mp3"}
      />
      <SoundPlayer
        resetVolume={resetVolume}
        setResetVolume={setResetVolume}
        soundName={"FireIcon"}
        audioFileName={"fireplace.mp3"}
      />
      <SoundPlayer
        resetVolume={resetVolume}
        setResetVolume={setResetVolume}
        soundName={"WindIcon"}
        audioFileName={"storm.mp3"}
      />
      <SoundPlayer
        resetVolume={resetVolume}
        setResetVolume={setResetVolume}
        soundName={"BirdIcon"}
        audioFileName={"bird.mp3"}
      />
      <SoundPlayer
        resetVolume={resetVolume}
        setResetVolume={setResetVolume}
        soundName={"MoonIcon"}
        audioFileName={"night.mp3"}
      />
      <SoundPlayer
        resetVolume={resetVolume}
        setResetVolume={setResetVolume}
        soundName={"CoffeeIcon"}
        audioFileName={"restaurant.mp3"}
      />
    </StyledSoundPlayers>
  );
};

export default SoundPlayers;
