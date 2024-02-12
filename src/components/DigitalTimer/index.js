import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    time: 25,
    isStart: false,

    running: 0,
  }

  componentWillUnmount = () => {
    this.clearTimer()
  }

  clearTimer = () => {
    clearInterval(this.intervalId)
  }

  onReset = () => {
    this.setState({time: 25, isStart: false, running: 0})
    this.clearTimer()
  }

  startTimerCountDown = () => {
    const {running, time} = this.state
    const isTimeCompleted = running === time * 60
    if (isTimeCompleted) {
      this.setState({time: false, running: 0})
      this.clearTimer()
    } else {
      this.setState(prevState => ({
        running: prevState.running + 1,
      }))
    }
  }

  increaseTime = () => {
    const {isStart} = this.state
    if (!isStart) {
      this.setState(prevState => {
        const {time} = prevState
        return {
          time: time + 1,
        }
      })
    }
  }

  convertTimeToTimerFormat = () => {
    const {time, running} = this.state
    const timeInSeconds = time * 60 - running
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    const minutesInStringFormat = minutes > 9 ? minutes : `0${minutes}`
    const secondsInStringFormat = seconds > 9 ? seconds : `0${seconds}`
    return `${minutesInStringFormat}:${secondsInStringFormat}`
  }

  onStart = () => {
    const {isStart, running, time} = this.state
    // console.log(isStart, running, time)
    this.setState(prevState => ({isStart: !prevState.isStart}))
    // console.log(isStart, running, time * 60)

    const isTimeCompleted = running === time * 60

    if (isTimeCompleted) {
      this.setState((isStart: false))
      this.clearTimer()
    }
    ///  console.log(isStart)
    if (isStart) {
      this.clearTimer()
      this.setState({isStart: false})
    } else {
      this.intervalId = setInterval(() => {
        this.startTimerCountDown()
      }, 1000)
    }
  }

  decreaseTime = () => {
    const {isStart} = this.state
    if (!isStart) {
      this.setState(prevState => {
        const {time} = prevState
        return {
          time: time - 1,
        }
      })
    }
  }

  render() {
    const {time, isStart} = this.state
    const paused = isStart ? 'Running' : 'Paused'
    const altname = isStart ? 'pause icon' : 'play icon'
    const startOrPause = isStart
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const nameStart = isStart ? 'Pause' : 'Start'
    // console.log(time)
    return (
      <div className="main-container">
        <h1 className="digital-heading">Digital Timer</h1>
        <div className="paused-time-container">
          <div className="timer-con">
            <h1 className="num-count">{this.convertTimeToTimerFormat()}</h1>
            <p className="paused-para">{paused}</p>
          </div>
          <div className="start-container">
            <div className="row-arrange">
              <button
                onClick={this.onStart}
                type="button"
                className="img-start"
              >
                <img src={startOrPause} alt={altname} className="images" />
                <p className="start-para">{nameStart}</p>
              </button>
              <button
                type="button"
                onClick={this.onReset}
                className="img-start"
              >
                <img
                  className="images"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <p className="start-para">Reset</p>
              </button>
            </div>
            <div className="set-container">
              <p className="set-head">Set Timer limit</p>
              <div className="minus-div">
                <button
                  type="button"
                  className="start-para minus"
                  onClick={this.decreaseTime}
                >
                  -
                </button>
                <p className="start-para minus twenty">{time}</p>
                <button
                  type="button"
                  className="start-para"
                  onClick={this.increaseTime}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
