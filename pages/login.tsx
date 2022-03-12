import LoginForm from "components/login/LoginForm";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, getProviders, LiteralUnion } from "next-auth/react";
import styles from 'styles/LoginPage.module.scss'

interface LoginProps {
  providers?: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

const LoginPage: React.FC<LoginProps> = ({ providers }) => {
  return (
    <main role="main" className={styles.main}>
      <LoginForm providers={providers} />
    </main>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers }
  }
}

export default LoginPage;