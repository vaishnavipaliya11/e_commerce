import {
  BsCartPlus,
  BsCartPlusFill,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import { ProductType } from "../../types/product";

import { toggleWishListItem } from "../../features/wishlist/wishListSlice";
import { getCapitalizeString } from "../../utils/getCapitalizeString";
import { toIndianCurrency } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { postCart } from "../../features/cart/helpers/postCart";


export const Card = ({
  productDetails,
  isPresentInCart,
  isPresentInWishlist,
  hideCart = false,
}: {
  productDetails: ProductType;
  isPresentInCart: boolean;
  isPresentInWishlist: boolean;
  hideCart?: boolean;
}) => {
  const { avatar: imageUrl, category, name, price } = productDetails;
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((store) => store.cart);

  const prodNameInCart = cartItems?.map((product) => product?.name);

  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
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
        <div className="flex gap-2">
          <button
            className="border rounded-full h-9 w-9 flex justify-center items-center hover:bg-white bg-gray-100 ease-in duration-300"
            onClick={() => dispatch(toggleWishListItem(productDetails))}
          >
            {isPresentInWishlist ? (
              <BsHeartFill color="#7c3aed" />
            ) : (
              <BsHeart color={""} />
            )}
          </button>
          {!hideCart ? (
            <button
              className="border rounded-full h-9 w-9 flex justify-center items-center hover:bg-white bg-gray-100 ease-in duration-300 "
              onClick={async () => {
                dispatch(postCart({ ...productDetails, cartQty: 1 }));
                // await dispatch(getCart());
              }}
            >
              {prodNameInCart?.includes(name) ? (
                <BsCartPlusFill color="#7c3aed" />
              ) : (
                <BsCartPlus />
              )}
              {/* {isPresentInCart ? <BsCartPlusFill color="#7c3aed" /> : <BsCartPlus />} */}
              {/* {isInCart ? "hai" :"nahi hai"} */}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
