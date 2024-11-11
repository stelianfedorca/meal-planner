import { NavLinks } from '@/ui/NavLinks/NavLinks';
import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '../../../public/icons';

export function Header() {
  return (
    <header className={styles.container}>
      <Link href="/" className={styles['logo-container']}>
        <Image
          alt="Logo"
          src={Logo}
          height={0}
          width={0}
          className={styles.logo}
        />
      </Link>
      <NavLinks />
    </header>
  );
}
