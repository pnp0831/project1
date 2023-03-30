import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import AutoAffix from '~/components/auto-affix';
import Button from '~/components/button';
import Container from '~/components/container';
import QuantityInput from '~/components/inputs/quantity-input';
import { useCartContext } from '~/contexts/CartContext';
import { useSnackbarContext } from '~/contexts/SnackbarContext';
import { formatter, onImageError } from '~/helpers';
import useWindowSize from '~/hooks/useWindowResize';
import Snackbar from '../snackbar';
import styles from './product-detail.module.scss';

type Props = {
  product: any;
};

const ProductDetail = ({ product }: Props) => {
  const { addItem } = useCartContext();
  const { showMessage } = useSnackbarContext();

  const refContainer = useRef({});
  const refInfo = useRef({});
  const refQuantity = useRef();

  const onClick = () => {
    const quantity = refQuantity.current.value;
    addItem(product, Number(quantity));
    showMessage('You cool product is in the cart!');
  };

  const [windowType] = useWindowSize();

  const components = (
    <div className={styles.info} ref={refInfo}>
      <h4>{product.name}</h4>
      <div className={styles.divider} />
      <h5>{formatter.format(product.price)}</h5>
      <div className={styles.divider} />

      <QuantityInput ref={refQuantity} />

      <div className={styles.wrapperBtn}>
        <Button onClick={onClick}>Add to cart</Button>
      </div>
    </div>
  );

  const width = refInfo.current.clientWidth;

  return (
    <Container>
      <section className={styles.productDetail} ref={refContainer}>
        <div className={styles.image}>
          <picture>
            {' '}
            <img alt={product.name} loading="lazy" src={product.image} onError={onImageError} />
          </picture>
        </div>
        {components}
        {/* {windowType.isMobile ? (
          components
        ) : (
          <AutoAffix offsetTop={110} container={refContainer} width={width}>
            {components}
          </AutoAffix>
        )} */}
      </section>
    </Container>
  );
};

export default ProductDetail;
