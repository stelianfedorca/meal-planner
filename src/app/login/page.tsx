import { Button } from '@/components/ui/button';
import { login, signup } from './actions';
import styles from './page.module.scss';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default async function LoginPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form} action={signup}>
        <div className={styles['form-group']}>
          <Label htmlFor="email" className={styles['form-label']}>
            Email
          </Label>
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
          <Label htmlFor="password" className={styles['form-label']}>
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
        </div>

        <div className={styles['buttons-group']}>
          <Button formAction={login} className="bg-sky-500 hover:bg-sky-700">
            Sign In
          </Button>
          <Button formAction={signup} className="bg-sky-500 hover:bg-sky-700">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
