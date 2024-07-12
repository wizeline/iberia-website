import styles from './header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const routes = [
  {
    name: 'Admin',
    href: '/admin/login',
  },
  {
    name: 'Cliente',
    href: '/',
  },
];

const Header = () => {
  const router = useRouter();

  return (
    <div className={styles.header__wrapper + ' iberia-bg-color p-4'}>
      <div className="w-[1200px] m-auto flex justify-between items-end">
        <Image
          src="/iberia-logo.png"
          alt="Iberia logo"
          width={180}
          height={40}
        />
        <div className="pb-2 text-white">
          {routes.map((route, index) => (
            <span key={route.name}>
              <Link
                href={route.href}
                className={router.asPath === route.href ? 'font-bold' : ''}
              >
                {route.name}
              </Link>
              {index < routes.length - 1 && (
                <span className="mx-2 text-white">|</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
