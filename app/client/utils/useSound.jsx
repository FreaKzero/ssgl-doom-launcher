import { useContext } from 'react';

import AudioContext from '../components/Audio/AudioContext';

function useSound() {
  const ctx = useContext(AudioContext);
  return [ctx.play];
}

export default useSound;
