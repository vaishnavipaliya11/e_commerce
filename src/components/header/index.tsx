import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsCart2, BsHeart, BsArrowLeft } from "react-icons/bs";
import { useAppSelector } from "../../store/hooks";

export const Header = ({ heading }: { heading?: string }) => {
  const { cartItems } = useAppSelector((store) => store.cart);
  const { wishListItems } = useAppSelector((store) => store.wishlist);
  const numberOfItemsInCart = cartItems?.length;
  const numberOfItemsInWishList = wishListItems.length;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHomePage = pathname === "/";

  return (
    <header className="text-gray-600 body-font sticky top-0 bg-white z-50">
      <div className="container mx-auto flex flex-wrap p-5 items-center justify-between">
        {isHomePage ? (
          <Link
            to={"/"}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <span className="ml-3 text-xl">E-commerce</span>
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)}>
              <BsArrowLeft size={"1.5rem"} />
            </button>
            <span className="flex title-font font-medium items-center text-gray-900">
              {heading}
            </span>
          </div>
        )}
        <nav className="md:ml-auto flex flex-wrap items-center text-base gap-6 justify-center">
          <Link to={"/wishlist"} className="relative">
            <BsHeart size="1.25rem" />
            {numberOfItemsInWishList > 0 ? (
              <span className="absolute bg-violet-600 text-white rounded-full flex justify-center items-center h-5 w-5 -top-3 -right-3">
                {numberOfItemsInWishList}
              </span>
            ) : null}
          </Link>
          <Link to={"/cart"} className="relative">
            <BsCart2 size="1.25rem" />
            {numberOfItemsInCart > 0 ? (
              <span className="absolute bg-violet-600 text-white rounded-full flex justify-center items-center h-5 w-5 -top-3 -right-3">
                {numberOfItemsInCart}
              </span>
            ) : null}
          </Link>
        </nav>
      </div>
    </header>
  );
};
