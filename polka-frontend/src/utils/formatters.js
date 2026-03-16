/**
 * Format a token amount with thousand separators
 * @param {number} amount
 * @param {number} decimals
 */
export const formatToken = (amount, decimals = 0) =>
  Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

/**
 * Shorten an Ethereum address
 * @param {string} address
 */
export const shortAddress = (address) =>
  address ? `${address.slice(0, 6)}…${address.slice(-4)}` : ''

/**
 * Calculate fundraise percentage (capped at 100)
 * @param {number} raised
 * @param {number} goal
 */
export const calcPct = (raised, goal) =>
  goal > 0 ? Math.min(Math.round((raised / goal) * 100), 100) : 0

/**
 * Format a unix timestamp or date string to readable form
 * @param {number|string} date
 */
export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
