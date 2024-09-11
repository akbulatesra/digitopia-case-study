import HomeComponent from '@/components/Home';
import { unstable_setRequestLocale } from 'next-intl/server';

const Home = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);

  return <HomeComponent />;
};
export default Home;
