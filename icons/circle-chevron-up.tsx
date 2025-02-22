'use client';

import type { Transition } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface CircleChevronUpIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CircleChevronUpIconProps extends HTMLAttributes<HTMLDivElement> {
  size: number;
};

const defaultTransition: Transition = {
  times: [0, 0.4, 1],
  duration: 0.5,
};

const CircleChevronUpIcon = forwardRef<
  CircleChevronUpIconHandle,
  CircleChevronUpIconProps
>(({ onMouseEnter, onMouseLeave, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);
    const size = props.size || 28;

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: () => controls.start('animate'),
      stopAnimation: () => controls.start('normal'),
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        controls.start('animate');
      } else {
        onMouseEnter?.(e);
      }
    },
    [controls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        controls.start('normal');
      } else {
        onMouseLeave?.(e);
      }
    },
    [controls, onMouseLeave]
  );

  return (
    <div
      className={cn(`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`, props.className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <motion.path
          variants={{
            normal: { y: 0 },
            animate: {
              y: [0, -2, 0],
            },
          }}
          transition={defaultTransition}
          animate={controls}
          d="m8 14 4-4 4 4"
        />
      </svg>
    </div>
  );
});

CircleChevronUpIcon.displayName = 'CircleChevronUpIcon';

export { CircleChevronUpIcon };
