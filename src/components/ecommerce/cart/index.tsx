import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Button from '~/components/button';
import Container from '~/components/container';
import QuantityInput from '~/components/inputs/quantity-input';
import { APP_ROUTE } from '~/constants';
import { useAppContext } from '~/contexts/app-context';
import { useCartContext } from '~/contexts/cart-context';
import { formatter } from '~/helpers';
import useWindowSize from '~/hooks/useWindowResize';
import styles from './cart.module.scss';

type Props = {
  product: any;
};

const Cart = ({ product }: Props) => {
  const { count, carts, updateItem, removeItem } = useCartContext();
  const { headers } = useAppContext();

  const handleOnChange = (id, count) => updateItem(id, count);

  const totalAmount = carts.reduce((acc, { item, count }) => {
    return acc + item.price * count;
  }, 0);

  const router = useRouter();

  const [windowType] = useWindowSize();

  return (
    <Container className={styles.container}>
      <div
        className={clsx(styles.carts, {
          [styles.cartsFull]: count > 0,
          [styles.cartsEmpty]: !count,
        })}
      >
        {count ? (
          <>
            {carts.map(({ item, count }) => (
              <Fragment key={item.id}>
                <div className={styles.cart}>
                  <div className={styles.cartName}>
                    <picture>
                      <img alt={item.name} loading="lazy" src={item.image} />
                    </picture>

                    <div className={styles.cartNameInfo}>
                      <div className="body3">{item.name}</div>
                      <div className="body4">{formatter.format(item.price)}</div>
                    </div>
                  </div>
                  {!windowType.isMobile && (
                    <div className={styles.cartToolbar}>
                      <QuantityInput
                        defaultValue={count}
                        handleOnChange={(value) => {
                          handleOnChange(item.id, value);
                        }}
                        classname={styles.cartInput}
                      />
                      <span className="body3">{formatter.format(item.price * count)}</span>
                      <div className={styles.removeBtn} onClick={() => removeItem(item.id)}>
                        <Image src="/trash-2.png" height={24} width={24} alt="trash" />
                      </div>
                    </div>
                  )}
                </div>
                {windowType.isMobile && (
                  <div className={styles.cartToolbar}>
                    <QuantityInput
                      initValue={count}
                      handleOnChange={(value) => {
                        handleOnChange(item.id, value);
                      }}
                      classname={styles.cartInput}
                    />
                    <span className="body3">{formatter.format(item.price * count)}</span>
                    <div className={styles.removeBtn} onClick={() => removeItem(item.id)}>
                      <Image src="/trash-2.png" height={24} width={24} alt="trash" />
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
          </>
        ) : (
          <>
            <h4>Your Cart Is Empty</h4>
            <Button
              onClick={() => {
                const url = `${APP_ROUTE.ECOMMERCE}/${headers?.[0]?.slug}`;
                router.push(url);
              }}
            >
              SHOPPING NOW
            </Button>
          </>
        )}
      </div>
      <div className={styles.info}>
        <div className={clsx('body1', styles.infomation)}>Infomation</div>
        <div className={styles.divider} />
        <div className={styles.subInfo}>
          <span className="body1">Sub Total:</span>
          <span className="body1">{formatter.format(totalAmount)}</span>
        </div>
        <div className={styles.subInfo}>
          <span className="body1">Shipping Free: </span>
          <span className="body1">{formatter.format(0)}</span>
        </div>
        <div className={clsx(styles.subInfo, styles.subInfoTotal)}>
          <span className="body1" />
          <span className="body1">{formatter.format(totalAmount)}</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.subInfoButton}>
          <Button
            disabled={!count}
            onClick={() => {
              window.prompt('payment ');
            }}
          >
            Payment
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
