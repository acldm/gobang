import WhitePng from './images/white.png';
import BlackPng from './images/black.png';
import JohnPng from './images/John.png';
import RobotPng from './images/robot.png';


export const CAMP = {
  WHITE: 0,
  BLACK: 1,
  NONE: 2
}

const CAMP_IMAGE = [
  WhitePng,
  BlackPng
]

const CAMPS = [
  CAMP.WHITE,
  CAMP.BLACK
];

const playersConfig = {
  'john': {
    avatar: JohnPng,
    name: 'John'
  },
  'robot': {
    avatar: RobotPng,
    name:'Robot'
  }
}

export function getPlayerConfig(name) {
  return playersConfig[name] || {};
}

export function getNextCamp(nowCamp) {
  return CAMPS[(nowCamp + 1) % CAMPS.length];
} 

export function getCampImage(camp) {
  return CAMP_IMAGE[camp] || null;
}
