import { useEffect, useState } from 'react';

/**
 * Hook to defer animations until after first contentful paint
 * Improves initial page load performance
 */
export const useDeferredAnimations = () => {
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    // Defer animations until after first contentful paint
    const timer = setTimeout(() => {
      setCanAnimate(true);
    }, 100); // Small delay to ensure critical content renders first

    return () => clearTimeout(timer);
  }, []);

  return canAnimate;
};

/**
 * Memoized animation variants for better performance
 */
export const animationVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.68, -0.55, 0.265, 1.55] as const,
      },
    },
  },
};

/**
 * Optimized hover effects that don't trigger on every hover
 */
export const optimizedHoverEffects = {
  gentle: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  moderate: {
    scale: 1.05,
    boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)",
    transition: { duration: 0.2 },
  },
  strong: {
    scale: 1.08,
    boxShadow: "0 12px 30px rgba(59, 130, 246, 0.25)",
    transition: { duration: 0.2 },
  },
};

/**
 * Viewport configuration for better performance
 */
export const viewportConfig = {
  once: true,
  margin: "-100px",
  amount: 0.1,
};

/**
 * Prefers reduced motion detection
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

/**
 * Performance-optimized intersection observer
 */
export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-50px',
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [ref, hasIntersected, options]);

  return { isIntersecting, hasIntersected };
}; 