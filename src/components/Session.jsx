const Session = ({
  sessionLength,
  setSessionLength,
  setTime,
  timerOn,
  onBreak,
}) => {
  const handleIncrement = () => {
    if (sessionLength < 60 && !timerOn) {
      if (!onBreak) {
        setTime((sessionLength + 1) * 60);
      }
      setSessionLength(sessionLength + 1);
    }
  };
  const handleDecrement = () => {
    if (sessionLength > 1 && !timerOn) {
      if (!onBreak) {
        setTime((sessionLength - 1) * 60);
      }
      setSessionLength(sessionLength - 1);
    }
  };
  return (
    <div className="col">
      <h5 className="row" id="session-label">
        Session
      </h5>
      <h3 className="row" id="session-length">
        {sessionLength}
      </h3>
      <div className="row">
        <button
          className="col btn"
          onClick={() => handleDecrement()}
          id="session-decrement"
        >
          -
        </button>
        <button
          className="col btn"
          id="session-increment"
          onClick={() => handleIncrement()}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Session;
