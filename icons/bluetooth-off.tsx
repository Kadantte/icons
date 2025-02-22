'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface BluetoothOffIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BluetoothOffIconProps extends HTMLAttributes<HTMLDivElement> {
  size: number;
};

const pathVariants: Variants = {
  normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0],
  },
};

const offlineVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
  },
};

const BluetoothOffIcon = forwardRef<
  BluetoothOffIconHandle,
  BluetoothOffIconProps
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
        <motion.path
          variants={pathVariants}
          animate={controls}
          transition={{
            duration: 0.3,
          }}
          d="m17 17-5 5V12l-5 5"
        />
        <motion.path
          variants={offlineVariants}
          animate={controls}
          transition={{
            duration: 0.2,
            delay: 0.3,
          }}
          d="m2 2 20 20"
        />
        <motion.path
          variants={pathVariants}
          animate={controls}
          transition={{
            duration: 0.3,
          }}
          d="M14.5 9.5 17 7l-5-5v4.5"
        />
      </svg>
    </div>
  );
});

BluetoothOffIcon.displayName = 'BluetoothOffIcon';

export { BluetoothOffIcon };
