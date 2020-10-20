import React, { useState } from 'react'
import styled from 'styled-components'
import ReactSlider from 'react-slider'
import { useAudioPlayer } from 'react-use-audio-player'
import VolumeLow from './icons/VolumeLow'
import VolumeHigh from './icons/VolumeHigh'
import Mute from './icons/Mute'

// eslint-disable-next-line react/jsx-props-no-spreading
const Thumb = (props) => <StyledThumb {...props} />
const Track = (props, state) => (
  <StyledTrack
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    index={state.index}
    data-testid="volume-slider-track"
  />
)

const Volume: React.FC = () => {
  const { volume } = useAudioPlayer()

  const [displayVolumeFullControls, setDisplayVolumeFullControls] = useState(
    false
  )
  const [savedVolume, setSavedVolume] = useState(1)

  const toggleMute = () => {
    const currentVolume = volume()
    if (currentVolume > 0) {
      // Mute.
      setSavedVolume(currentVolume)
      volume(0)
    } else {
      // Unmute.
      volume(savedVolume)
    }
  }

  const setVolumeForPlayer = (sliderValue: number) => {
    volume(sliderValue / 100)
  }

  const playerVolume = volume()

  let MainButtonIcon = VolumeHigh
  if (!displayVolumeFullControls && playerVolume === 0) {
    MainButtonIcon = Mute
  } else if (
    !displayVolumeFullControls
    && playerVolume > 0
    && playerVolume < 0.5
  ) {
    MainButtonIcon = VolumeLow
  }

  const MuteButtonIcon = playerVolume === 0 ? Mute : VolumeLow

  return (
    <Container
      onMouseEnter={() => setDisplayVolumeFullControls(true)}
      onMouseLeave={() => setDisplayVolumeFullControls(false)}
    >
      <FullControls
        displayed={displayVolumeFullControls}
        data-testid="volume-full-controls"
      >
        <VolLow
          onClick={toggleMute}
          data-testid={`volume-mute-button-${MuteButtonIcon.name}`}
        >
          <MuteButtonIcon size={25} />
        </VolLow>
        <SliderWrapper>
          <StyledSlider
            value={playerVolume * 100}
            step={0.1}
            onChange={setVolumeForPlayer}
            renderTrack={Track}
            renderThumb={Thumb}
            ariaLabel="Volume slider"
            ariaValuetext={() => playerVolume * 100}
          />
        </SliderWrapper>
      </FullControls>
      <AlwaysDisplayed
        data-testid={`volume-main-button-${MainButtonIcon.name}`}
      >
        <MainButtonIcon size={25} />
      </AlwaysDisplayed>
    </Container>
  )
}

export default Volume

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-left: 5px;
`
const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 140px;
  height: 100%;
  padding: 0 10px 0 7px;
`
const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 4px;
`
const StyledThumb = styled.div`
  height: 10px;
  width: 10px;
  top: -3px;
  background-color: ${(props) => props.theme.volume.handleColor};
  border-radius: 50%;
  cursor: grab;
`
const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  right: 0;
  background: ${(props) => (props.index === 1
    ? props.theme.volume.barColor
    : props.theme.volume.barVolumeColor)};
`
const FullControls = styled.div`
  display: ${(props) => (props.displayed ? 'flex' : 'none')};
  visibility: ${(props) => (props.displayed ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.displayed ? 1 : 0)};
  transition: visibility 0s, opacity 0.5s;
  align-items: center;
  height: 28px;
  position: absolute;
  right: 25px;
  background-color: ${(props) => props.theme.general.background};
  padding-left: 5px;

  :hover {
    cursor: pointer;
  }
`
const AlwaysDisplayed = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  background-color: transparent;

  :hover {
    cursor: pointer;
  }
`
const VolLow = styled.button`
  border: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
`
