module.exports = rolls => {
  const isStrike = ([firstRoll] = rolls) => firstRoll === 10;

  const groupByFrames = rolls => rolls.reduce((framesAccumulator, roll) => {
    const framesAccumulatorHead = framesAccumulator.length - 1;
    const currentRolls = framesAccumulator[framesAccumulatorHead];

    const hasReachedMaxAttempts = currentRolls.length === 2;
    const hasFrameFinished = hasReachedMaxAttempts || isStrike(currentRolls);
    const isLastFrameInGame = framesAccumulatorHead === 9;

    if (hasFrameFinished && !isLastFrameInGame)
      return framesAccumulator.concat([[roll]]);
    else
      return framesAccumulator.map((rollAccumulator, index )=> {
        if(index === framesAccumulatorHead){
          return rollAccumulator.concat([roll]);
        }
        return rollAccumulator;
      });
  }, [[]]);

  const calculateScore = frames => frames.map((currentRolls, frameIndex) => {
    const isSpare = ([firstRoll, secondRoll] = currentRolls) => firstRoll + secondRoll === 10;
    const sumNextRolls = (rollsAmount, currentFrameIndex) =>
      frames
        .filter((frame, index) => index > currentFrameIndex)
        .reduce((rollsAccumulator, roll) => rollsAccumulator.concat(roll), [])
        .slice(0, rollsAmount)
        .reduce((total, roll) => total + roll, 0);

    const frameScore = currentRolls.reduce((total, roll) => total + roll);
    const strikeScore = isStrike(currentRolls) ? sumNextRolls(2, frameIndex) : 0;
    const spareScore = isSpare(currentRolls) ? sumNextRolls(1, frameIndex) : 0;

    return frameScore + strikeScore + spareScore;
  }).reduce((total, score) => total + score);

  return calculateScore(groupByFrames(rolls));
};