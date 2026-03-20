'use client';

import Link, {type LinkProps} from 'next/link';
import {type ReactNode} from 'react';

type TrackedLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  eventName: string;
  section?: string;
  label?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function TrackedLink({
  children,
  className,
  eventName,
  section,
  label,
  ...props
}: TrackedLinkProps) {
  function handleClick() {
    window.dataLayer?.push({
      event: eventName,
      section,
      label,
    });

    window.gtag?.('event', eventName, {
      section,
      label,
    });
  }

  return (
    <Link {...props} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}