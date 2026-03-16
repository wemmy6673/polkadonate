import { clsx } from 'clsx'

/**
 * Merge Tailwind class names safely
 * Usage: cn('base-class', condition && 'conditional-class', 'other-class')
 */
export const cn = (...inputs) => clsx(...inputs)
