import { useSelector } from "react-redux";
import { Card, Header } from "../../components";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { getProducts } from "../../features/product/helpers/getProducts";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCart } from "../../features/cart/helpers/getCart";

export const ProductListing = () => {
  const { itemIdMap } = useAppSelector((store) => store.cart);
  const { itemIdMap: wishListItemMap } = useAppSelector(
    (store) => store.wishlist
  );
  const { allProducts } = useAppSelector((store) => store.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      dispatch(getProducts());
      dispatch(getCart())
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {allProducts.map((details) => (
              <Card
                key={details.id}
                productDetails={details}
                isPresentInCart={itemIdMap[details.id]}
                isPresentInWishlist={wishListItemMap[details.id]}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
