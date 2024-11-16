'use client';

import Link from 'next/link';
import styles from './NavLinks.module.scss';

export function NavLinks() {
  return (
    <nav className={styles.container}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
