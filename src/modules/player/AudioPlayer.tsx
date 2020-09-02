import React, { useEffect, useState } from 'react'
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

const widthTimeFormatSwitch = 248

const AudioPlayer: React.FC<{
  playlist: PlaylistItem[]
}> = ({ playlist }) => {
  // TODO: Test the impact on performance.
  const [ref, { width }] = useDimensions()

  const [currentPlaylistPosition, setCurrentPlaylistPosition] = useState<
    number
  >(0)
  const [repeat, setRepeat] = useState<RepeatState>(RepeatState.norepeat)
  const [shuffle, setShuffle] = useState(false)

  // List of already played tracks in a playlist.
  const [shuffleList, setShuffleList] = useState<number[]>([])
  useEffect(() => {
    // Clean shuffle list when playlist changes.
    setShuffleList([])
  }, [playlist])

  const {
    ready, playing, togglePlayPause, ended, load,
  } = useAudioPlayer()

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

    setShuffleList([...shuffleList, currentPlaylistPosition])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ended])

  const handleRepeat = () => {
    if (playlist.length > 1) {
      setRepeat(cycleNumPos(repeat, 1, 3))
    } else {
      setRepeat(
        repeat === RepeatState.norepeat ? RepeatState.one : RepeatState.norepeat
      )
    }
  }

  const handlePrev = () => {
    let nextPlaylistPosition = currentPlaylistPosition - 1
    if (nextPlaylistPosition < 0 && repeat === RepeatState.all) {
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
    if (nextPlaylistPosition >= playlist.length && repeat === RepeatState.all) {
      nextPlaylistPosition = 0
      setShuffleList([])
    }

    if (nextPlaylistPosition < playlist.length) {
      load({
        src: playlist[nextPlaylistPosition].url,
        autoplay: forcePlaying || playing,
        html5: true,
        format: playlist[currentPlaylistPosition].format ?? 'mp3',
      })
      setCurrentPlaylistPosition(nextPlaylistPosition)
      setShuffleList([...shuffleList, nextPlaylistPosition])
    }
  }

  const PlayPauseIcon = playing ? PauseIcon : PlayIcon

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
            <SongTitle>{playlist[currentPlaylistPosition].title}</SongTitle>
            <TimeIndicator>
              <Time remaining={width <= widthTimeFormatSwitch} />
            </TimeIndicator>
          </SongInfo>
          <ProgressBar />
          <Controls>
            {playlist.length > 1 && (
              <PlaylistNavControls
                disablePrev={
                  currentPlaylistPosition === 0 && repeat !== RepeatState.all
                }
                disableNext={
                  currentPlaylistPosition === playlist.length - 1
                  && repeat !== RepeatState.all
                }
                onPrev={handlePrev}
                onNext={handleNext}
              />
            )}
            <PlaybackOptionsControls
              repeatState={repeat}
              onRepeat={handleRepeat}
              shuffleState={shuffle}
              onShuffle={() => setShuffle(!shuffle)}
              displayShuffle={playlist.length > 1}
            />
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
