import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './header.module.css';

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
        <div className="flex gap-12 items-center">
          <Image
              src="/iberia-logo.png"
              alt="Iberia logo"
              width={180}
              height={40}/>
          <div className="mb-2 text-white">
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
        {/* <span className="text-white w-8">({profile})</span> */}
        <div className="mb-2" id="profile-form"></div>
      </div>
    </div>
  );
};

export default Header;
