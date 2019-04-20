module.exports = (rolls) => {
  const isStryke = ([firstRoll] = rolls) => firstRoll === 10;
  const isSpare = ([firstRoll, secondRoll] = rolls) => firstRoll !== 10 && firstRoll + secondRoll === 10;
  const isLastFrameInGame = (index) => index === 9;

  const groupByFrames = (rolls) => {
    return rolls.reduce((frames, pins) => {
      let frameIndex = frames.length - 1;
      const rollsInFrame = frames[frameIndex];
      let lastRollInFrame = rollsInFrame.length === 2;

      const isCurrentFrameFinished = !isLastFrameInGame(frameIndex) && (lastRollInFrame || isStryke(rollsInFrame));

      if (!isCurrentFrameFinished)
        rollsInFrame.push(pins);
      else
        frames.push([pins]);

      return frames;
    }, [[]]);
  };

  const score = (frames) => {
    const sumNextRolls = (amount, index) => {
      return frames
        .filter((f, frameIndex) => frameIndex > index)
        .reduce((acc, f) => acc.concat(f))
        .slice(0, amount)
        .reduce((acc, r) => acc + r);
    };

    return frames.map((rolls, index) => {
      let frameScore = rolls.reduce((acc, r) => acc + r);

      if (!isLastFrameInGame(index)) {
        frameScore += isStryke(rolls) ? sumNextRolls(2, index) : 0;
        frameScore += isSpare(rolls) ? sumNextRolls(1, index) : 0;
      }

      return frameScore;
    }).reduce((acc, score) => acc + score);
  };
  return score(groupByFrames(rolls));
};