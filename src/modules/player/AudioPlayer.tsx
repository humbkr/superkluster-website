import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAudioPlayer } from 'react-use-audio-player'
import useDimensions from 'react-use-dimensions'
import { PlaylistItem } from '@src/types/Playlist'
import ProgressBar from './ProgressBar'
import PauseIcon from './icons/Pause'
import PlayIcon from './icons/Play'
import SkipPrevIcon from './icons/Previous'
import SkipNextIcon from './icons/Next'
import Loader from './icons/Loader'
import Time from './Time'

const AudioPlayer: React.FC<{
  playlist: PlaylistItem[]
}> = ({ playlist }) => {
  // TODO: Test the impact on performance.
  const [ref, { width }] = useDimensions()

  const [currentPlaylistPosition, setCurrentPlaylistPosition] = useState<
    number
  >(0)

  const {
    ready, playing, togglePlayPause, ended, load,
  } = useAudioPlayer()

  useEffect(() => {
    // Load the first playlist item asynchronously to speed-up first paint.
    load({ src: playlist[currentPlaylistPosition].url, html5: true })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePrev = () => {
    const nextPlaylistPosition = currentPlaylistPosition - 1
    if (nextPlaylistPosition >= 0) {
      load({
        src: playlist[nextPlaylistPosition].url,
        autoplay: playing,
        html5: true,
      })
      setCurrentPlaylistPosition(nextPlaylistPosition)
    }
  }

  const handleNext = (
    e: React.MouseEvent<HTMLButtonElement>,
    forcePlaying: boolean = false
  ) => {
    const nextPlaylistPosition = currentPlaylistPosition + 1
    if (nextPlaylistPosition < playlist.length) {
      load({
        src: playlist[nextPlaylistPosition].url,
        autoplay: forcePlaying || playing,
        html5: true,
      })
      setCurrentPlaylistPosition(nextPlaylistPosition)
    }
  }

  if (ended) {
    handleNext(null, true)
  }

  let PlayPauseIcon
  switch (playing) {
    case true:
      PlayPauseIcon = PauseIcon
      break
    case false:
      PlayPauseIcon = PlayIcon
      break
    default:
      break
  }

  return (
    <Container>
      {!ready && (
        <PlayButton as="div">
          <Loader size={40} />
        </PlayButton>
      )}
      {ready && (
        <PlayButton type="button" onClick={togglePlayPause} aria-label="Play">
          <PlayPauseIcon size={40} />
        </PlayButton>
      )}
      <Secondary>
        <SongInfo ref={ref}>
          <SongTitle>{playlist[currentPlaylistPosition].title}</SongTitle>
          <TimeIndicator>
            <Time remaining={width <= 248} />
          </TimeIndicator>
        </SongInfo>
        <ProgressBar />
        <Controls>
          <Button
            type="button"
            onClick={handlePrev}
            disabled={currentPlaylistPosition === 0}
            aria-label="Previous song"
          >
            <SkipPrevIcon enabled={currentPlaylistPosition > 0} size={18} />
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            disabled={currentPlaylistPosition === playlist.length - 1}
            aria-label="Next song"
          >
            <SkipNextIcon
              enabled={currentPlaylistPosition < playlist.length - 1}
              size={18}
            />
          </Button>
        </Controls>
      </Secondary>
    </Container>
  )
}

export default AudioPlayer

const Container = styled.div`
  padding: 6px;
  background-color: #f2f2f2;
  color: black;
  display: flex;
`
const PlayButton = styled.button`
  width: 70px;
  height: 70px;
  border: 1px solid white;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d7d7d5;
  flex-shrink: 0;
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
`
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 7px;
  border: 1px solid #fff;
  margin-right: 5px;
  background-color: #d7d7d5;
`
