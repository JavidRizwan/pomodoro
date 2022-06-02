const Break = ({ breakLength, setBreakLength, setTime, timerOn, onBreak }) => {
  const handleIncrement = () => {
    if (breakLength < 60 && !timerOn) {
      if (onBreak) {
        setTime((breakLength + 1) * 60);
      }
      setBreakLength(breakLength + 1);
    }
  };
  const handleDecrement = () => {
    if (breakLength > 1 && !timerOn) {
      if (onBreak) {
        setTime((breakLength - 1) * 60);
      }
      setBreakLength(breakLength - 1);
    }
  };
  return (
    <div className="row">
      <div className="col">
        <h5 className="row" id="break-label">
          Break
        </h5>
        <h3 className="row" id="break-length">
          {breakLength}
        </h3>
        <div className="row">
          <button
            className="col btn"
            id="break-decrement"
            onClick={() => handleDecrement()}
          >
            -
          </button>
          <button
            className="col btn"
            id="break-increment"
            onClick={() => handleIncrement()}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Break;
