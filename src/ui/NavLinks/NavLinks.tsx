'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavLinks.module.scss';

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className={styles.container}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
