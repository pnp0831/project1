import React, { ReactNode, useContext, useState } from 'react';

type Props = {
  children: ReactNode;
};

const CartContext = React.createContext();

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider = ({ children }: Props) => {
  const [carts, setCarts] = useState({});

  const addItem = (item, count = 1) => {
    setCarts({
      ...carts,
      [item.id]: {
        item,
        count: (carts[item.id]?.['count'] || 0) + count,
      },
    });
  };

  const updateItem = (id, count) => {
    setCarts({ ...carts, [id]: { ...carts[id], count } });
  };

  const removeItem = (id) => {
    const tmpCart = { ...carts };

    delete tmpCart[id];

    setCarts(tmpCart);
  };

  return (
    <CartContext.Provider
      value={{
        carts: Object.values(carts),
        count: Object.keys(carts).length,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
