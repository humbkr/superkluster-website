import React, {
  useCallback, useContext, useEffect, useState,
} from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useAudioPlayer } from 'react-use-audio-player'
import useDimensions from 'react-use-dimensions'
import ProgressBar from './ProgressBar'
import PauseIcon from './icons/Pause'
import PlayIcon from './icons/Play'
import Loader from './icons/Loader'
import Time from './Time'
import { cycleNumPos } from './utils'
import PlaylistNavControls from './PlaylistNavControls'
import { PlaylistItem, RepeatState } from './types'
import PlaybackOptionsControls from './PlaybackOptionsControls'
import theme from './theme'
import Volume from './Volume'
import { PlayerOptionsContext } from './context'

const widthTimeFormatSwitch = 248

const AudioPlayer: React.FC<{
  playlist: PlaylistItem[]
}> = ({ playlist }) => {
  // TODO: Test the impact on performance.
  const [ref, { width }] = useDimensions()

  const playerOptions = useContext(PlayerOptionsContext)

  const {
    ready, playing, togglePlayPause, ended, load,
  } = useAudioPlayer()

  const [currentPlaylistPosition, setCurrentPlaylistPosition] = useState<
    number
  >(0)
  const [repeat, setRepeat] = useState<RepeatState>(RepeatState.norepeat)

  const [shuffle, setShuffle] = useState<boolean>(false)
  // List of tracks that have been played already.
  const [shuffleList, setShuffleList] = useState<number[]>([])
  // List of times user has pressed prev button while in random mode.
  const [randomPrevTimes, setRandomPrevTimes] = useState<number>(0)

  useEffect(() => {
    // Reset shuffle list when playlist changes or shuffle is toggled.
    setShuffleList([])
    setRandomPrevTimes(0)
  }, [playlist])

  useEffect(() => {
    if (ended) {
      handleNext(null, true)
      return
    }

    // Load the first audio asynchronously to speed-up page load.
    load({
      src: playlist[currentPlaylistPosition].url,
      html5: true,
      format: playlist[currentPlaylistPosition].format ?? 'mp3',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ended])

  // Selects a random track in the list of tracks that have not been played yet.
  const selectRandomTrack = useCallback(() => {
    if (shuffleList.length === playlist.length) {
      // Reset the shuffle history.
      const next = Math.floor(Math.random() * Math.floor(playlist.length))
      setShuffleList([next])

      return next
    }

    // Create an array with the tracks available to choose from.
    const availableTracks = Array.from(Array(playlist.length).keys()).filter(
      (item) => !shuffleList.includes(item)
    )
    // Select a track from this array.
    const nextPlaylistPosition = availableTracks.splice(
      Math.floor(Math.random() * Math.floor(availableTracks.length)),
      1
    )[0]
    // Add the selected track to the list of tracks already played.
    setShuffleList([...shuffleList, nextPlaylistPosition])

    return nextPlaylistPosition
  }, [shuffleList, playlist.length])

  const handleRepeat = () => {
    if (playlist.length > 1) {
      setRepeat(cycleNumPos(repeat, 1, 3))
    } else {
      setRepeat(
        repeat === RepeatState.norepeat ? RepeatState.one : RepeatState.norepeat
      )
    }
  }

  const handleShuffle = () => {
    setShuffleList(!shuffle ? [currentPlaylistPosition] : [])
    setShuffle(!shuffle)
  }

  const handlePrev = () => {
    let nextPlaylistPosition = currentPlaylistPosition - 1
    if (shuffle) {
      // Play the previous track in the history of shuffled tracks.
      // If the user continues to press prev button, this will go down the history.
      const historyPos = shuffleList.length - (2 + randomPrevTimes)

      nextPlaylistPosition = shuffleList[historyPos]
      setRandomPrevTimes(randomPrevTimes + 1)
    } else if (nextPlaylistPosition < 0 && repeat === RepeatState.all) {
      nextPlaylistPosition = playlist.length - 1
    }

    load({
      src: playlist[nextPlaylistPosition].url,
      autoplay: playing,
      html5: true,
      format: playlist[currentPlaylistPosition].format ?? 'mp3',
    })
    setCurrentPlaylistPosition(nextPlaylistPosition)
  }

  const handleNext = (
    e: React.MouseEvent<HTMLButtonElement>,
    forcePlaying: boolean = false
  ) => {
    let nextPlaylistPosition = currentPlaylistPosition + 1

    // Repeat one cases.
    if (repeat === RepeatState.one && forcePlaying) {
      // Track ended naturally, repeat same track.
      togglePlayPause()
      return
    }

    if (shuffle) {
      if (randomPrevTimes > 0) {
        // Go up the shuffle history.
        const historyPos = shuffleList.length - randomPrevTimes
        nextPlaylistPosition = shuffleList[historyPos]
        setRandomPrevTimes(randomPrevTimes - 1)
      } else {
        // Select a new random track.
        nextPlaylistPosition = selectRandomTrack()
        setRandomPrevTimes(0)
      }
    } else if (
      // When repeat all, loop playlist.
      nextPlaylistPosition >= playlist.length
      && repeat === RepeatState.all
    ) {
      nextPlaylistPosition = 0
    }

    if (nextPlaylistPosition < playlist.length) {
      load({
        src: playlist[nextPlaylistPosition].url,
        autoplay: forcePlaying || playing,
        html5: true,
        format: playlist[currentPlaylistPosition].format ?? 'mp3',
      })
      setCurrentPlaylistPosition(nextPlaylistPosition)
    }
  }

  const PlayPauseIcon = playing ? PauseIcon : PlayIcon

  const disablePrev = (!shuffle && currentPlaylistPosition === 0 && repeat !== RepeatState.all)
    || (shuffle && currentPlaylistPosition === shuffleList[0])

  const disableNext = (!shuffle
      && currentPlaylistPosition === playlist.length - 1
      && repeat !== RepeatState.all)
    || (shuffle
      && shuffleList.length === playlist.length
      && randomPrevTimes === 0
      && repeat !== RepeatState.all)

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {!ready && (
          <PlayButton as="div" data-testid="player-play-button-loading">
            <Loader size={40} />
          </PlayButton>
        )}
        {ready && (
          <PlayButton
            type="button"
            onClick={togglePlayPause}
            aria-label="Play"
            data-testid="player-play-button"
          >
            <PlayPauseIcon size={40} />
          </PlayButton>
        )}
        <Secondary>
          <SongInfo ref={ref}>
            <SongTitle data-testid="player-track-title">
              {playlist[currentPlaylistPosition].title}
            </SongTitle>
            <TimeIndicator>
              <Time remaining={width <= widthTimeFormatSwitch} />
            </TimeIndicator>
          </SongInfo>
          <ProgressBar />
          <Controls>
            {playlist.length > 1 && (
              <PlaylistNavControls
                disablePrev={disablePrev}
                disableNext={disableNext}
                onPrev={handlePrev}
                onNext={handleNext}
              />
            )}
            {playlist.length === 1 && <div />}
            <ControlsEnd>
              <PlaybackOptionsControls
                repeatState={repeat}
                onRepeat={handleRepeat}
                shuffleState={shuffle}
                onShuffle={handleShuffle}
                displayShuffle={playlist.length > 1}
              />
              {playerOptions.canChangeVolume && <Volume />}
            </ControlsEnd>
          </Controls>
        </Secondary>
      </Container>
    </ThemeProvider>
  )
}

export default AudioPlayer
export { widthTimeFormatSwitch }

const Container = styled.div`
  padding: 6px;
  background-color: ${(props) => props.theme.general.background};
  color: black;
  display: flex;
`
const PlayButton = styled.button`
  width: 70px;
  height: 70px;
  background-color: ${(props) => props.theme.buttons.playback.background};
  border: 1px solid ${(props) => props.theme.buttons.playback.borderColor};
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
`
const Secondary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  overflow: hidden;
`
const SongInfo = styled.div`
  display: flex;
  flex-flow: row nowrap;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const SongTitle = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin: 0;
  height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const TimeIndicator = styled.div`
  flex-shrink: 0;
  height: 100%;
  padding-left: 15px;
`
const Controls = styled.div`
  display: flex;
  margin-left: -1px;
  justify-content: space-between;
`
const ControlsEnd = styled.div`
  display: flex;
`
