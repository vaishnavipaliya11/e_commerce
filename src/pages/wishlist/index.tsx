import { useSelector } from "react-redux";
import { Card, Header } from "../../components";
import { RootState } from "../../store/store";

export const Wishlist = () => {
  const { wishListItems, itemIdMap: wishListItemMap } = useSelector(
    (store: RootState) => store.wishlist
  );
  const { itemIdMap } = useSelector((store: RootState) => store.cart);

  return (
    <>
      <Header heading="Wishlist"/>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {wishListItems.map(details => (
              <Card
                key={details.id}
                productDetails={details}
                isPresentInCart={itemIdMap[details.id]}
                isPresentInWishlist={wishListItemMap[details.id]}
                hideCart={true}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
