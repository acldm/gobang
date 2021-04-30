import './ResultMask.css';

function ResultMask({
  message,
  onReset
}) {
  return (
    <div className="result-mask">
      <div className="message">
        {message}
      </div>
      <div className="reset-btn" onClick={onReset}></div>
    </div>
  );
}

export default ResultMask;