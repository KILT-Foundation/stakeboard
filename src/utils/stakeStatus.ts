export function getStatus(newStake: number | undefined, staked: number) {
  if (!newStake) return 'unstake'
  if (newStake === 0) {
    return 'unstake'
  } else if (staked === 0 && newStake > staked) {
    return 'stake'
  } else if (newStake < staked) {
    return 'decreaseStake'
  } else if (newStake > staked) {
    return 'increaseStake'
  }
  return 'unchanged'
}
