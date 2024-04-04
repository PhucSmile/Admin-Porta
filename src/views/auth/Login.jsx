import { useIntl } from 'react-intl';
import { Layout } from './components/Layout';
import { LoginForm } from './components/LoginForm';

export default function Login() {
  const intl = useIntl();

  return (
    <Layout title={intl.formatMessage({ id: 'views.auth.login.welcomeTitle' })}>
      <LoginForm />
    </Layout>
  );
}
