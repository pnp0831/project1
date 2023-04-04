/* eslint-disable react/display-name */
import Image from 'next/image';
import React, { memo, useRef, useState } from 'react';
import { APP_ROUTE, MAIN_MENU } from '~/constants';
import Container from '~/components/container';
import styles from './header.module.scss';
import drawerStyles from '~/components/drawer/drawer.module.scss';
import Link from 'next/link';
import Drawer from '~/components/layout/drawer';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { useCartContext } from '~/contexts/cart-context';
import Modal from '~/components/modal';
import TextInput from '~/components/inputs/text-input';
import Button from '~/components/button';
import CheckBoxInput from '~/components/inputs/checkbox-input';
import SigninForm from '../signin-form';
import { useAuthContext } from '~/contexts/auth-context';
import useWindowSize from '~/hooks/useWindowResize';

const LandingPageHeader = memo(() => {
  const router = useRouter();

  const handleClickItem = (item) => {
    if (typeof func === 'function') {
      func();
    }

    if (item.url) {
      return null;
    }
    const section = document.getElementById(item.id);

    window.scrollTo({
      top: section?.offsetTop - 100,
      left: 0,
      behavior: 'smooth',
    });
  };

  const isDemon = [APP_ROUTE.DEMONSTRATION, '/sso'].includes(router.pathname);

  const menuRender = isDemon
    ? MAIN_MENU.filter((i) => ['Home', 'Demonstration'].includes(i.name))
        .map((item) => ({
          ...item,
          url: item.name === 'Home' ? '/' : item.url,
          id: item.name,
        }))
        .concat({
          name: 'Signle Sign On',
          url: '/sso',
        })
    : MAIN_MENU;

  const renderItem = (item, isTablet, func) => {
    let className = item.id ? `menu-${item.id}` : '';

    if (isTablet && className) {
      className = `t-${className}`;
    }
    const isActive = router.pathname === item.url;

    if (isActive) {
      className = `${className} active`;
    }

    return (
      <li key={item.name} onClick={() => handleClickItem(item, func)} className={className}>
        {item.url ? (
          <Link href={item.url}>
            <h6>{item.name}</h6>
          </Link>
        ) : (
          <nav>
            <h6>{item.name}</h6>
          </nav>
        )}
      </li>
    );
  };

  return (
    <>
      <menu className={styles.mainMenu}>
        <ul>{menuRender.map((item) => renderItem(item))}</ul>
      </menu>
      <Drawer>
        {({ styles: drawerStyles, toggleDrawer }) => {
          return (
            <menu className={drawerStyles.mainMenu}>
              <ul>{menuRender.map((item) => renderItem(item, toggleDrawer, true))}</ul>
            </menu>
          );
        }}
      </Drawer>
    </>
  );
});

const EcPageHeader = memo(({ headers }: Props) => {
  const [user, setUser] = useState({});

  const { count } = useCartContext();

  const [windowType] = useWindowSize();

  const modalRef = useRef();
  const drawerRef = useRef();

  const {
    query: { category },
  } = useRouter();

  const isActive = (name) => category === name;

  const renderItem = (item, func, isTablet) => {
    return (
      <li
        key={item.name}
        onClick={() => {
          if (typeof func === 'function') {
            func();
          }
        }}
        className={isActive(item.slug) ? 'active' : null}
      >
        <Link href={`${APP_ROUTE.ECOMMERCE}/${item.slug}`}>
          <h6>{item.name}</h6>
        </Link>
      </li>
    );
  };

  const [openModal, setOpenModal] = useState(false);

  const handleLoginSuccess = () => {
    modalRef.current();
  };

  const handleSignout = () => {
    setUser([]);
    if (!windowType.isDesktop) {
      drawerRef.current();
    }
  };

  return (
    <>
      <menu className={styles.mainMenu}>
        <ul>{headers.map((item) => renderItem(item))}</ul>
      </menu>

      <menu className={clsx(styles.mainMenu, styles.menuUser)}>
        <ul>
          <li className={styles.menuBar}>
            {user.name ? (
              <div className={styles.dropDownUser}>
                <div className="body2"> {user.name}</div>

                <div className={styles.dropDownUserContent} onClick={handleSignout}>
                  <span className="body5">Sign Out</span>
                </div>
              </div>
            ) : (
              <Image
                alt="user"
                src="/user.png"
                width={32}
                height={32}
                loading="lazy"
                onClick={() => {
                  setOpenModal(true);
                }}
              />
            )}
            <Link href={`${APP_ROUTE.ECOMMERCE}/cart`} className={styles.shoppingCart}>
              <Image
                alt="shopping-cart"
                src="/shopping-cart.png"
                width={32}
                height={32}
                loading="lazy"
              />
              {count > 0 && <span className="body3">{count}</span>}
            </Link>
          </li>
        </ul>
      </menu>

      {openModal && (
        <Modal open={openModal} onClose={() => setOpenModal(false)} title="sign in" ref={modalRef}>
          <SigninForm handleSuccess={handleLoginSuccess} user={user} setUser={setUser} />
        </Modal>
      )}

      <Drawer ref={drawerRef}>
        {({ styles: drawerStyles, toggleDrawer }) => {
          return (
            <menu className={drawerStyles.mainMenu}>
              <ul>
                {headers.map((item) => renderItem(item, toggleDrawer))}
                <li className={drawerStyles.menuBar}>
                  {user.name ? (
                    <div className={drawerStyles.menuUser}>
                      <span className="body2">{user.name}</span>
                    </div>
                  ) : (
                    <Image
                      alt="user"
                      src="/user.png"
                      width={32}
                      height={32}
                      loading="lazy"
                      onClick={() => {
                        setOpenModal(true);
                      }}
                    />
                  )}

                  <Link
                    href={`${APP_ROUTE.ECOMMERCE}/cart`}
                    onClick={toggleDrawer}
                    className={drawerStyles.shoppingCart}
                  >
                    <Image
                      alt="shopping-cart"
                      src="/shopping-cart.png"
                      width={32}
                      height={32}
                      loading="lazy"
                    />
                    {count > 0 && <span className="body3">{count}</span>}
                  </Link>
                </li>
              </ul>
              {user.name && (
                <div>
                  <Button onClick={handleSignout}>SIGN OUT</Button>
                </div>
              )}
            </menu>
          );
        }}
      </Drawer>
    </>
  );
});

type Props = {
  headers: string[];
};

const Header = ({ headers = [] }: Props) => {
  const router = useRouter();

  const backHome = () => {
    router.push(APP_ROUTE.HOME);
  };

  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <Image
          alt="logo"
          className={styles.logo}
          src="/logo.png"
          width={268}
          height={99}
          loading="lazy"
          onClick={backHome}
        />
        {!headers.length ? <LandingPageHeader /> : <EcPageHeader headers={headers} />}
      </Container>
    </header>
  );
};

export default Header;
