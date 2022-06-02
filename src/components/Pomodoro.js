import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Break from "./Break.jsx";
import Session from "./Session.jsx";

const Pomodoro = () => {
  //states
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [time, setTime] = useState(1500);
  const [onBreak, setOnBreak] = useState(false);
  const [timerOn, setTimerOn] = useState(false);
  const [intervalId, setIntervalId] = useState("");
  const [id, setId] = useState("session");

  const intervalValue = (fn, time) => {
    let newDate = new Date().getTime() + time;
    var timeout = null;
    const wrapper = () => {
      newDate += time;
      timeout = setTimeout(wrapper, newDate - new Date().getTime());
      return fn();
    };
    const cancel = () => {
      return clearTimeout(timeout);
    };
    timeout = setTimeout(wrapper, newDate - new Date().getTime());
    return {
      cancel: cancel,
    };
  };

  const startTimer = () => {
    setIntervalId(
      intervalValue(() => {
        if (minutes === 0 && seconds === 0) {
          if (onBreak) {
            setId("session");
            setTime(() => sessionLength * 60);
          } else {
            setId("break");
            setTime(() => breakLength * 60);
          }
          setOnBreak(!onBreak);
        }
      }, 1000)
    );
  };

  //Pause play button
  const handlePausePlay = () => {
    if (!timerOn) {
      startTimer();
    } else {
      intervalId.cancel();
    }
    setTimerOn(!timerOn);
  };

  //reset button
  const handleReset = () => {
    setSessionLength(25);
    setBreakLength(5);
    setTime(1500);
    setId("session");
    setOnBreak(false);
    setTimerOn(false);
  };

  //set display
  const minutes =
    Math.floor(time / 60) >= 10
      ? Math.floor(time / 60)
      : "0" + Math.floor(time / 60);
  const seconds = time % 60 >= 10 ? time % 60 : "0" + (time % 60);
  const display = minutes + ":" + seconds;

  //render
  return (
    <div>
      <Session
        sessionLength={sessionLength}
        setSessionLength={setSessionLength}
        setTime={setTime}
        timerOn={timerOn}
        onBreak={onBreak}
      />
      <Break
        breakLength={breakLength}
        setBreakLength={setBreakLength}
        setTime={setTime}
        timerOn={timerOn}
        onBreak={onBreak}
      />
      <p id="timer-label">{id}</p>
      <h1 id="time-left">{display}</h1>
      <div className="row">
        <button
          className="btn col"
          id="start_stop"
          onClick={() => handlePausePlay()}
        >
          pause play
        </button>
        <button className="btn col" id="reset" onClick={() => handleReset()}>
          reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
