import useLocalStorage from './useLocalStorage';

const VOLUME_CHANGE = 0.1;
const MAX_VOLUME = 1;
const MIN_VOLUME = 0;
const LOCAL_STORAGE_KEY = 'volumes';

function useVolume(audios: object[], defaultVolume: number) {
  const [volumes, setVolumes] = useLocalStorage<number[]>(LOCAL_STORAGE_KEY, audios.map(() => defaultVolume));

  function handleVolumeChange(value: number, index: number) {
    setVolumes(
      volumes.map((volume, i) => (i === index ? value : volume))
    );
  }

  function increaseVolumes() {
    setVolumes(
      volumes.map(volume => Math.min(volume + VOLUME_CHANGE, MAX_VOLUME))
    );
  }

  function decreaseVolumes() {
    setVolumes(
      volumes.map(volume => Math.max(volume - VOLUME_CHANGE, MIN_VOLUME))
    );
  }

  return {
    volumes,
    handleVolumeChange,
    increaseVolumes,
    decreaseVolumes,
  };
}

export default useVolume;
