import { Button } from '@/components/ui/button';
import { login, signup } from './actions';
import styles from './page.module.scss';
import { Input } from '@/components/ui/input';

export default async function LoginPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form} action={signup}>
        <div className={styles['form-group']}>
          <label htmlFor="email" className={styles['form-label']}>
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@gmail.com"
            autoComplete="new-text"
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="password" className={styles['form-label']}>
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
        </div>

        <div className={styles['buttons-group']}>
          <Button formAction={login} className="bg-sky-700">
            Sign In
          </Button>
          <Button formAction={signup} className="bg-sky-700">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
