import { BsPlus, BsDashLg } from "react-icons/bs";

import { CartItemType } from "../../types/product";

import { RxCross1 } from "react-icons/rx";
import { getCapitalizeString } from "../../utils/getCapitalizeString";
import { toIndianCurrency } from "../../utils";
import { useAppDispatch } from "../../store/hooks";
import { deleteCart } from "../../features/cart/helpers/deleteCart";
import { getCart } from "../../features/cart/helpers/getCart";

import { updateCart } from "../../features/cart/helpers/updateCart";

export const CartCard = ({
  productDetails,
}: {
  productDetails: CartItemType;
}) => {
  const {
    avatar: imageUrl,
    category,
    name,
    price,
    cartQty,
    id,
  } = productDetails;
  const dispatch = useAppDispatch();

  return (
    <div className="relative">
      <button
        className="absolute top-3 right-3 z-10 border rounded-full h-5 w-5 flex justify-center items-center hover:bg-white bg-gray-100 ease-in duration-300"
        onClick={async () => {
          await dispatch(deleteCart(id));
          dispatch(getCart());
        }}
      >
        <RxCross1 size={"0.5rem"} />
      </button>
      <a className="block relative h-48 rounded overflow-hidden">
        <img
          alt=""
          className="object-cover object-center w-full h-full block"
          src={imageUrl}
        />
      </a>
      <div className="flex items-baseline justify-between mt-4">
        <div>
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {getCapitalizeString(category)}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {name}
          </h2>
          <p className="mt-1">{toIndianCurrency(price)}</p>
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="border rounded-full h-9 w-9 flex justify-center items-center hover:bg-white bg-gray-100 ease-in duration-300"
            onClick={() =>
              dispatch(updateCart({ ...productDetails, cartQty: cartQty - 1 }))
            }
            disabled={cartQty === 1}
          >
            <BsDashLg />
          </button>
          {cartQty}
          <button
            className="border rounded-full h-9 w-9 flex justify-center items-center hover:bg-white bg-gray-100 ease-in duration-300 "
            onClick={() =>
              dispatch(updateCart({ ...productDetails, cartQty: cartQty + 1 }))
            }
          >
            <BsPlus />
          </button>
        </div>
      </div>
    </div>
  );
};
