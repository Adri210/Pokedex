import bug from "../assets/images/badges/bug.jpg";
import ice from '../assets/images/badges/ice.jpg';
import dark from '../assets/images/badges/dark.jpg';
import fire from '../assets/images/badges/fire.jpg';
import rock from '../assets/images/badges/rock.jpg';
import fairy from '../assets/images/badges/fairy.jpg';
import ghost from '../assets/images/badges/ghost.jpg';
import grass from '../assets/images/badges/grass.jpg';
import steel from '../assets/images/badges/steel.jpg';
import water from '../assets/images/badges/water.jpg';
import dragon from '../assets/images/badges/dragon.jpg';
import flying from '../assets/images/badges/flying.jpg';
import ground from '../assets/images/badges/ground.jpg';
import normal from '../assets/images/badges/normal.jpg';
import poison from '../assets/images/badges/poison.jpg';
import psychic from '../assets/images/badges/psychic.jpg';
import fighting from '../assets/images/badges/fighting.jpg';
import electric from '../assets/images/badges/electric.jpg';

const badges = {
  bug,
  ice,
  dark,
  fire,
  rock,
  fairy,
  ghost,
  grass,
  steel,
  water,
  dragon,
  flying,
  ground,
  normal,
  poison,
  psychic,
  fighting,
  electric
}

export const getBadgeType = (type) => {
  return badges[type] || water;
}