/**
 * Greenhouse 3.0 motion tokens
 * https://www.figma.com/design/xmPqv4UtHk7wfZfLA7Ds4a/?node-id=19394-87276
 *
 * Pairs:
 * - 100ms + linear — functional (links, dots)
 * - 300ms + ease.in-out-1 — semi-frequent (tabs, carousels)
 * - 600ms + ease.in-out-2 — expressive (primary moments)
 * Enter longer than exit; keep text travel short.
 */

export const easeLinear = [0, 0, 1, 1] as const;
export const easeIn = [0.5, 0, 1, 1] as const;
export const easeOut = [0, 0, 0.5, 1] as const;
export const easeInOut1 = [0.7, 0, 0.3, 1] as const;
export const easeInOut2 = [0.85, 0, 0.15, 1] as const;

export const dur = {
  functional: 0.1,
  moderate: 0.3,
  expressive: 0.6,
} as const;

/** Scene enter — expressive, short distance */
export const sceneEnter = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: {
    duration: dur.expressive,
    ease: easeInOut2,
  },
  exitTransition: {
    duration: dur.moderate,
    ease: easeIn,
  },
};

/** Staggered content — short fade travel */
export const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: dur.moderate, ease: easeOut },
};
