import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import Container from '~/components/container';
import { APP_ROUTE } from '~/constants';
import { useAppContext } from '~/contexts/AppContext';
import styles from './breadcrumb.module.scss';

const Breadcrumb = () => {
  const router = useRouter();
  const { headers, title } = useAppContext();

  const {
    query: { category, slug },
    pathname,
  } = router;

  const items = [{ label: 'Home', href: `${APP_ROUTE.ECOMMERCE}/${headers?.[0]?.slug}` }];

  if (title) {
    items.push({ label: title, href: '/' });
  } else {
    if (pathname === '/ecommerce/cart') {
      items.push({ label: 'Cart', href: `${APP_ROUTE.ECOMMERCE}/cart` });
    }

    if (category) {
      items.push({ label: category, href: `${APP_ROUTE.ECOMMERCE}/${category}` });
    }

    if (slug) {
      items.push({ label: slug, href: `${APP_ROUTE.ECOMMERCE}/${category}/${slug}` });
    }
  }

  return (
    <div className={styles.wrapperBreadcrumb}>
      <nav aria-label="breadcrumb">
        <Container>
          <ol className={styles.breadcrumb}>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              const href = isLast ? null : item.href;
              return (
                <Fragment key={item.label}>
                  <li
                    key={item.label}
                    className={`${!isLast ? styles.active : ''}`}
                    aria-current={isLast ? 'page' : null}
                  >
                    {href ? (
                      <Link href={href}>
                        <h6>{item.label}</h6>
                      </Link>
                    ) : (
                      <h6>{item.label}</h6>
                    )}
                  </li>
                  {!isLast && (
                    <li className={styles.devider}>
                      <h6>/</h6>
                    </li>
                  )}
                </Fragment>
              );
            })}
          </ol>
        </Container>
      </nav>
    </div>
  );
};

export default Breadcrumb;
