import { useEffect, useRef, useState } from "react";
import moment from "moment";

import mp3 from "./audio/beep.mp3";
import momentDurationFormatSetup from "moment-duration-format";

import "./App.scss";

const App = () => {
  const beepAudio = useRef(null);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [intervalId, setIntervalId] = useState(null);
  const [activeState, setActiveState] = useState("Session");

  // Change Timer on end of session or break
  useEffect(() => {
    if (timeLeft < 1) {
      beepAudio.current.play();
      if (activeState === "Session") {
        setTimeLeft(breakLength * 60);
        setActiveState("Break");
      } else {
        setTimeLeft(sessionLength * 60);
        setActiveState("Session");
      }
    }
  }, [timeLeft, activeState, breakLength, sessionLength]);

  // Handle start stop of timer
  const pausePlayTime = () => {
    if (intervalId == null) {
      const newInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) {
            return prev - 1;
          }
        });
      }, 1000);
      setIntervalId(newInterval);
    } else {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  // handle reset
  const handleReset = () => {
    beepAudio.current.load();
    setSessionLength(25);
    setBreakLength(5);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setTimeLeft(sessionLength * 60);
    setActiveState("Session");
  };

  // Reset on change in values
  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setTimeLeft(sessionLength * 60);
    setActiveState("Session");
  }, [sessionLength, breakLength]);

  const formattedTime = moment.duration(timeLeft, "s").format("mm:ss", { trim: false });
  return (
    <div id="app">
      <h1>Pomodoro Clock</h1>
      {/* Session */}
      <div>
        <div className="row">
          <p id="session-label">Session :</p>
          <p id="session-length">{sessionLength}</p>
        </div>
        <div className="row">
          <button
            className="btn"
            id="session-decrement"
            onClick={() => {
              setSessionLength((prev) => {
                if (prev < 60 && prev > 1) {
                  return prev - 1;
                } else return prev;
              });
            }}
          >
            -
          </button>
          <button
            className="btn"
            id="session-increment"
            onClick={() => {
              setSessionLength((prev) => {
                if (prev < 60 && prev > 1) {
                  return prev + 1;
                } else return prev;
              });
            }}
          >
            +
          </button>
        </div>
      </div>
      {/* Break */}
      <div>
        <div className="row">
          <p id="break-label">Break :</p>
          <p id="break-length">{breakLength}</p>
        </div>
        <div className="row">
          <button
            className="btn"
            id="break-decrement"
            onClick={() => {
              setBreakLength((prev) => {
                if (prev < 60 && prev > 1) {
                  return prev - 1;
                } else return prev;
              });
            }}
          >
            -
          </button>
          <button
            className="btn"
            id="break-increment"
            onClick={() => {
              setBreakLength((prev) => {
                if (prev < 60 && prev > 1) {
                  return prev + 1;
                } else return prev;
              });
            }}
          >
            +
          </button>
        </div>
      </div>
      {/* Timer */}
      <div className="row">
        <p id="timer-label">{activeState}</p>
        <p id="time-left">{formattedTime}</p>
      </div>
      <div className="row">
        <button className="end-btn" id="start_stop" onClick={pausePlayTime}>
          {intervalId ? "Pause" : "Play"}
        </button>
        <button className="end-btn" id="reset" onClick={handleReset}>
          reset
        </button>
      </div>
      <audio id="beep" ref={beepAudio} src={mp3} />
    </div>
  );
};

export default App;
