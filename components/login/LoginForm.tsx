import { GoogleButton } from 'components/ui/GoogleButton';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import styles from './styles/LoginForm.module.scss'

interface LoginFormPops {
  providers?: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

const LoginForm:React.FC<LoginFormPops> = ({ providers  }) => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h2>Login</h2>
        <em>Log in to start managing your invoices</em>
      </header>
      {providers && Object.values(providers).map((provider) => {
        switch(provider.name) {
          case 'Google' :
            return <GoogleButton key={provider.name} onClick={() => signIn(provider.id)} />
          default :
            return (
              <div key={provider.name}>
                <button onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
                </button>
              </div>
            )
        }
      })}
    </div>
  );
}

export default LoginForm;