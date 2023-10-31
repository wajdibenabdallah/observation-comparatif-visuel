import { PairImages } from "../types/Image";

const randomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getTwoDifferentAlgo = (): [number, number] => {
  let algo1 = randomIntFromInterval(1, 3);
  let algo2 = randomIntFromInterval(1, 3);
  while (algo1 === algo2) {
    algo1 = randomIntFromInterval(1, 3);
    algo2 = randomIntFromInterval(1, 3);
  }
  return [algo1, algo2];
};

export const loadImages = (): PairImages => {
  // Choix aléatoire d'un pair d'images
  // En se basant sur les data qu'on a dans le public/store
  const [randomAlgo1, randomAlgo2] = getTwoDifferentAlgo();
  const imageToCompare = `0${randomIntFromInterval(
    0,
    3
  )}_000${randomIntFromInterval(0, 3)}`;

  return {
    left: `./store/algo_${randomAlgo1}/${imageToCompare}.png`,
    right: `./store/algo_${randomAlgo2}/${imageToCompare}.png`,
  };
};
