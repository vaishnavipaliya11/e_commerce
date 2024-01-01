import { CartCard, Header } from "../../components";

import { Link, useNavigate } from "react-router-dom";
import { toIndianCurrency } from "../../utils";
import { CartItemType } from "../../types/product";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCart } from "../../features/cart/helpers/getCart";

export const Cart = () => {
  const { cartItems } = useAppSelector((store) => store.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loadScript = async (url: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpayModal = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      console.log("Something went wrong.");
      return;
    }
    const options = {
      key: "rzp_test_bZE9gTXzid6WZK",
      amount: totalAmount * 100 + deliveryCharges * 100,
      currency: "INR",
      name: "",
      description: "Thanks for shopping with us!",
      image: "/favicon.ico",
      handler: function (response: any) {
        const paymentId = response.razorpay_payment_id;
        console.log(paymentId);
        
        navigate("/");
      },

      prefill: {
        name: "Vaishnavi Paliya",
        email: "vaishnavi@gmail.com",
        contact: "7744552200",
      },
    };
    const paymentObject = (window as any).Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    try {
      dispatch(getCart());
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getCartDetails = (cartItems: CartItemType[]) => {
    return cartItems?.reduce(
      (prev, curr) => {
        return {
          numberOfItems: prev.numberOfItems + curr.cartQty,
          totalAmount: prev.totalAmount + curr.price * curr.cartQty,
          deliveryCharges:
            prev.totalAmount + curr.price * curr.cartQty > 1000 ? 100 : 0,
        };
      },
      {
        numberOfItems: 0,
        totalAmount: 0,
        deliveryCharges: 0,
      }
    );
  };

  const { numberOfItems, totalAmount, deliveryCharges } =
    getCartDetails(cartItems);

  return (
    <>
      <Header heading="Cart" />
      <section className="text-gray-600 body-font ">
        <div className="w-full p-8 flex flex-col md:flex-row">
          <div className="flex flex-1 gap-6 flex-wrap justify-center">
            {cartItems.length > 0 ? (
              cartItems.map((details) => (
                <CartCard key={details.id} productDetails={details} />
              ))
            ) : (
              <div className="flex flex-col gap-3 justify-center items-center w-full">
                <h1 className="text-2xl">Nothing in cart..</h1>
                <Link
                  to="/"
                  className="text-violet-600 hover:text-violet-400 ease-in duration-300"
                >
                  Explore
                </Link>
              </div>
            )}
          </div>

          {numberOfItems > 0 ? (
            <div className="flex-1 flex justify-center items-start">
              <div className="shadow-lg p-3 rounded-md w-full mt-5 md:w-4/5 sticky top-16">
                <h1 className="my-3 text-base font-semibold">Price Details</h1>
                <hr className="h-0 border-b border-gray-200" />

                <div className="flex justify-between my-3 ">
                  <span>Price({numberOfItems} Items)</span>
                  <span>{toIndianCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between my-3  ">
                  <span>Delivery Charges</span>
                  <span>
                    {" "}
                    {deliveryCharges > 0 ? (
                      toIndianCurrency(deliveryCharges)
                    ) : (
                      <span className="text-green-500">Free</span>
                    )}
                  </span>
                </div>
                <hr className="h-0 border-b border-gray-200" />
                <div className="flex justify-between my-6">
                  <span className="text-black font-bold">Total Amount</span>
                  <span className="text-black font-bold">
                    {toIndianCurrency(totalAmount + deliveryCharges)}
                  </span>
                </div>
                <button
                  onClick={displayRazorpayModal}
                  className="bg-violet-600 text-white w-full rounded-md py-2 hover:bg-violet-500 ease-in duration-200"
                >
                  Proceed to pay
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};
