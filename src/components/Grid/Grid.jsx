import { getCampImage, CAMP } from "../../config";
import './Grid.css';

function Grid({
  onClick,
  index,
  state,
  flag
}) {

  const handleClick = () => {
    if (state === CAMP.NONE) {
      onClick(index);
    }
  }

  const imgSrc = getCampImage(state);
  return (
    <div className="grid" onClick={handleClick} >
      <div className="pos">
        {imgSrc ? <img alt="" src={imgSrc} /> : ''}
      </div>
      {flag && <div className="flag">+</div>}
    </div>
  );
}

export default Grid;