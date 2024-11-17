import { login, signup } from './actions';
import styles from './page.module.scss';

export default async function LoginPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form} action={signup}>
        <div className={styles['form-group']}>
          <label htmlFor="email" className={styles['form-label']}>
            Email
          </label>
          <input
            className={styles['form-input']}
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
          <input
            className={styles['form-input']}
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
        </div>

        <div className={styles['buttons-group']}>
          <button formAction={login}>Sign In</button>
          <button formAction={signup}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
