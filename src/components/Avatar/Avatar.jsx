import { getCampImage, getPlayerConfig } from '../../config';
import './Avatar.css';

function Avatar({
  playerType,
  camp,
  doCamp,
  flexReverse = false
}) {

  const playerConfig = getPlayerConfig(playerType);
  const campImg = getCampImage(camp);
  const doing = doCamp === camp;
  const classNames = ['avatar', flexReverse ? 'row-reverse' : ''].join(' ');
  return (
    <div className={classNames}>
      <div className="avatar-img">
        <img className="img-fruit" src={playerConfig.avatar} alt="" />
      </div>
      <div className="avatar-name">{playerConfig.name}</div>
      {
        doing
          ?
          (
            <div className="camp-img">
              <img className="img-fruit" src={campImg} alt="" />
            </div>
          )
          :
          <div className="camp-state"></div>
      }
    </div>
  )
}

export default Avatar;
