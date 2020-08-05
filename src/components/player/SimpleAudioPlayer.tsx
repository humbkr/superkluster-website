import React, { useState, useRef } from 'react'
import ReactHowler from 'react-howler'
import styled from 'styled-components'
import { PlaylistItem } from '@src/types/Playlist'
import ProgressBar from './ProgressBar'
import PauseIcon from './PauseIcon'
import PlayIcon from './PlayIcon'
import SkipPrevIcon from './SkipPrevIcon'
import SkipNextIcon from './SkipNextIcon'
import Loader from './Loader'
import { useInterval } from './timer'

const formatTime = (seconds: number) => {
  const floored = Math.floor(seconds)
  let from = 14
  let length = 5
  if (floored >= 3600) {
    from = 11
    length = 8
  }
  return new Date(floored * 1000).toISOString().substr(from, length)
}

const SimpleAudioPlayer: React.FC<{
  playlist: PlaylistItem[]
}> = ({ playlist }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [position, setPosition] = useState(undefined)
  const [duration, setDuration] = useState<number>(0)
  const [currentPlaylistPosition, setCurrentPlaylistPosition] = useState<
    number
  >(0)

  const player = useRef<HTMLAudioElement>()

  const renderSeekPos = () => {
    if (isLoaded) {
      // @ts-ignore
      setPosition(player.current.seek())
    }
  }

  useInterval(renderSeekPos, 100)

  const handleOnLoad = () => {
    setIsLoaded(true)
    // @ts-ignore
    setDuration(player.current.duration())
  }

  const handleOnPlay = () => {
    setIsPlaying(true)
    renderSeekPos()
  }

  const handleOnEnd = () => {
    if (currentPlaylistPosition + 1 < playlist.length) {
      handleNext()
    } else {
      setIsPlaying(false)
      setPosition(undefined)
    }
  }

  const handlePrev = () => {
    if (currentPlaylistPosition - 1 >= 0) {
      setPosition(undefined)
      setIsLoaded(false)
      setCurrentPlaylistPosition(currentPlaylistPosition - 1)
    }
  }

  const handleNext = () => {
    if (currentPlaylistPosition + 1 < playlist.length) {
      setPosition(undefined)
      setIsLoaded(false)
      setCurrentPlaylistPosition(currentPlaylistPosition + 1)
    }
  }

  const handleOnSeek = (seek) => {
    setPosition(seek)
    // @ts-ignore
    player.current.seek(seek)
  }

  let PlayPauseIcon
  switch (isPlaying) {
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
      <ReactHowler
        src={[playlist[currentPlaylistPosition].url]}
        playing={isPlaying}
        onLoad={handleOnLoad}
        onPlay={handleOnPlay}
        onEnd={handleOnEnd}
        ref={player}
      />
      {!isLoaded && (
        <PlayButton as="div">
          <Loader size={40} />
        </PlayButton>
      )}
      {isLoaded && (
        <PlayButton
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label="Play"
        >
          <PlayPauseIcon size={40} />
        </PlayButton>
      )}
      <Secondary>
        <SongInfo>
          <SongTitle>{playlist[currentPlaylistPosition].title}</SongTitle>
          <SongPlaybackStatus>
            {isLoaded && position !== undefined
              ? formatTime(position)
              : '00:00'}
            {' / '}
            {isLoaded && duration ? formatTime(duration) : '00:00'}
          </SongPlaybackStatus>
        </SongInfo>
        <ProgressBar current={position} max={duration} onSeek={handleOnSeek} />
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

export default SimpleAudioPlayer

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
`
const Secondary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`
const SongInfo = styled.div`
  display: flex;
  align-items: flex-end;
`
const SongTitle = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin: 0;
`
const SongPlaybackStatus = styled.p`
  font-size: 14px;
  line-height: 18px;
  color: #686868;
  margin: 0 0 0 15px;
`
const Controls = styled.div`
  display: flex;
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
