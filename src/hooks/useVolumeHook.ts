import { useLocalStorage } from '@/hooks/useLocalStorage';
import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import VolumeType from '@/types/audioPlayer/volume';

// read from localStorage
export default function useVolumeHook(): [VolumeType, React.Dispatch<React.SetStateAction<VolumeType>>] {
    const currentVolume = useReadLocalStorage<number>("currentVolume");

    const [volume, setVolume] = useLocalStorage<VolumeType>("currentVolume", {
        prevVolume: 50,
        currentVolume: currentVolume ?? 50
    });

    return [volume, setVolume]
}