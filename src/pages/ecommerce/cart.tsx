import Head from 'next/head';
import CartCom from '~/components/ecommerce/cart';

const Cart = () => {
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Cart" unique="true" />
      </Head>
      <CartCom />
    </>
  );
};

export default Cart;
