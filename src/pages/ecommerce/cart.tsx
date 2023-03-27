import Head from 'next/head';
import CartCom from '~/components/ecommerce/cart';

const Cart = () => {
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <CartCom />
    </>
  );
};

export default Cart;
