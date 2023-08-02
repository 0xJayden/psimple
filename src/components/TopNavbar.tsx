import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeftIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

import logo from "~/assets/images/logo.png";
import whiteMushLogo from "~/assets/images/mush-logo-white.png";
import { api } from "~/utils/api";
import { cartAtom } from "./MerchPopup";
import goldCap from "~/assets/images/gold-cap.png";
import blueCap from "~/assets/images/bluePill.png";
import redCap from "~/assets/images/red-pill.png";
import purpleCap from "~/assets/images/purplePill.png";
import tricolorLogo from "~/assets/images/tricolor-logo.png";
import { useRouter } from "next/router";

// const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
//   ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
//   : null;

const subtotalAtom = atomWithStorage<number>("subtotal", 0);

type CartProps = {
  setCheckout: Dispatch<SetStateAction<boolean>>;
  setOpenCart: Dispatch<SetStateAction<boolean>>;
  openCart: boolean;
};

type CheckoutProps = {
  setCheckout: Dispatch<SetStateAction<boolean>>;
  setOpenCart: Dispatch<SetStateAction<boolean>>;
  checkout: boolean;
};

type ConfirmationProps = {
  setConfirmation: Dispatch<SetStateAction<boolean>>;
  confirmation: boolean;
  // data: {
  //   clientSecret: any;
  //   shipping: any;
  //   tax: any;
  //   finalOrderAmount: any;
  //   finalAmount: any;
  //   trueFinalAmount: any;
  // };
};

const firstNameAtom = atomWithStorage("firstName", "");
const lastNameAtom = atomWithStorage("lastName", "");
const addressAtom = atomWithStorage("address", "");
const cityAtom = atomWithStorage("city", "");
const stateAtom = atomWithStorage("state", "");
const countryAtom = atomWithStorage("country", "");
const zipAtom = atomWithStorage("zip", "");
const phoneAtom = atomWithStorage("phone", "");
const emailAtom = atomWithStorage("email", "");

// const itemsAtom = atomWithStorage("items", [
//   {
//     id: 0,
//     variant_id: 0,
//     quantity: 0,
//   },
// ]);

const Confirmation = ({
  setConfirmation,
  confirmation,
}: // data,
ConfirmationProps) => {
  // const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>();
  // const [data, setData] = useState<{
  //   // clientSecret: any;
  //   json: any;
  //   shipping: any;
  //   tax: any;
  //   finalOrderAmount: any;
  //   finalAmount: any;
  //   trueFinalAmount: any;
  // }>();
  const [error, setError] = useState<string>();

  const [cart, setCart] = useAtom(cartAtom);
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const [city, setCity] = useAtom(cityAtom);
  const [state, setState] = useAtom(stateAtom);
  const [country, setCountry] = useAtom(countryAtom);
  const [zip, setZip] = useAtom(zipAtom);
  const [phone, setPhone] = useAtom(phoneAtom);
  const [email, setEmail] = useAtom(emailAtom);

  const { data } = api.example.getOrderDetails.useQuery(
    {
      recipient: {
        firstName,
        lastName,
        address1: address,
        city,
        country,
        state,
        zip: +zip,
        phone,
        email,
      },
      items: cart,
    },
    {
      onSuccess: (data) => {
        console.log(data, "get order details data");
      },
      onError: (error) => {
        console.log(error, "get order details error");
      },
      refetchOnWindowFocus: false,
    }
  );
  const sendEmail = api.example.sendEmail.useMutation();
  const createOrder = api.example.createOrder.useMutation();
  const captureOrder = api.example.captureOrder.useMutation();
  const orderItems = api.example.orderItems.useMutation();

  const router = useRouter();

  // useEffect(() => {
  //   let subtotal = 0;
  //   let tax = 0;
  //   let shipping;
  //   let total = 0;

  //   cart.forEach((item) => {
  //     subtotal += item.price * item.quantity;
  //     tax
  //   }

  // }, [cart])

  // const stripe = useStripe();
  // const elements = useElements();

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!stripe || !elements) {
  //     console.log("stripe or elements not loaded");
  //     // Stripe.js hasn't yet loaded.
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return;
  //   }

  //   setIsLoading(true);

  //   const { error } = await stripe.confirmPayment({
  //     elements,
  //     confirmParams: {
  //       // Make sure to change this to your payment completion page
  //       return_url: "http://localhost:3001/success",
  //     },
  //   });

  //   // This point will only be reached if there is an immediate error when
  //   // confirming the payment. Otherwise, your customer will be redirected to
  //   // your `return_url`. For some payment methods like iDEAL, your customer will
  //   // be redirected to an intermediate site first to authorize the payment, then
  //   // redirected to the `return_url`.
  //   if (error) {
  //     setMessage(error.message);
  //   } else {
  //     setMessage("An unexpected error occurred.");
  //   }

  //   setIsLoading(false);
  // };

  return (
    <div
      className={`fixed z-[60] h-full w-screen animate-bgcolorChange overflow-y-scroll p-5 py-20 backdrop-blur-lg ${
        confirmation
          ? "opacity-100 transition duration-500 ease-out"
          : "translate-x-full opacity-0 transition duration-500 ease-out"
      }`}
    >
      <button
        className="self-start pb-4"
        onClick={() => setConfirmation(false)}
      >
        <ChevronLeftIcon className="h-6" />
      </button>
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>
        <div className="space-y-4 overflow-y-scroll border-t border-dashed border-t-[#aaaaaa] pb-12 pt-4">
          {data ? (
            <>
              <div className="flex justify-between">
                <p className="font-bold">Subtotal:</p>
                <p className="font-bold">${data?.orderAmount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold">Tax:</p>
                <p className="font-bold">${data?.tax.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold">Shipping:</p>
                <p className="font-bold">
                  {data?.shipping === 0
                    ? "FREE!"
                    : "$" + data?.shipping.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total:</p>
                <p className="text-lg font-bold">${data?.trueFinalAmount}</p>
              </div>
            </>
          ) : (
            "Loading..."
          )}
        </div>
        {isLoading && (
          <div className=" fixed inset-0 z-[999] flex h-full w-full items-center justify-center backdrop-brightness-[.2]">
            <div className="flex h-[300px] w-[90%] flex-col items-center justify-center">
              <Image
                className="max-w-[200px] animate-float"
                src={tricolorLogo}
                alt=""
              />
              <p className="pt-5 text-2xl text-white">{message}...</p>
            </div>
          </div>
        )}
        <PayPalButtons
          createOrder={(data, actions) => {
            setIsLoading(true);
            setMessage("Creating order");

            return createOrder
              .mutateAsync(
                {
                  recipient: {
                    firstName: firstName,
                    lastName: lastName,
                    address1: address,
                    city,
                    country,
                    state,
                    zip: +zip,
                    phone,
                    email,
                  },
                  items: cart,
                },
                {
                  onSuccess: (res) => {
                    console.log(res, "res");
                    setIsLoading(false);
                  },
                  onError: (err) => {
                    console.log(err, "err");
                    setIsLoading(false);
                    setError(err.message);
                  },
                }
              )
              .then((order) => order.id);
          }}
          onApprove={(data2, actions) => {
            setIsLoading(true);
            setMessage("Approving payment");

            return captureOrder
              .mutateAsync(data2.orderID, {
                onSuccess: (res) => {
                  console.log(res, "res");
                  setIsLoading(false);
                },
                onError: (err) => {
                  console.log(err, "err");
                  setIsLoading(false);
                  setError(err.message);
                },
              })
              .then((orderData) => {
                setIsLoading(true);
                setMessage("Ordering items");
                const items = data?.metadataItems;
                console.log(data?.metadataItems, "metadata items");
                console.log(items, "items to be ordered");

                if (!items) return console.log("no items");

                const payer = {
                  firstName,
                  lastName,
                  address1: address,
                  city,
                  country,
                  state,
                  zip: +zip,
                  phone,
                  email,
                };

                orderItems.mutate(
                  { items, payer },
                  {
                    onSuccess: (res) => {
                      console.log(res, "res");

                      if (res.result) {
                        setMessage("Order placed successfully! Sending email");
                        console.log(res.result, "result");

                        const msg = {
                          to: email,
                          from: "Neo <matrixmerchllc@gmail.com>",
                          subject: "Order Confirmation",
                          html: `<h4>Hello ${firstName},</h4>
                            <p>Thank you for your order! Your order number is ${
                              res.result.result.id
                            }.</p>
                            <p>Order Details:</p>
                            <ul>
                              ${res.result.result.items.map((item: any) => {
                                return `<li>${item.quantity} - ${item.name} - ${item.retail_price}/ea</li>`;
                              })}
                            </ul>
                            <div>
                            <p>Subtotal: $${data.orderAmount}</p>
                            <p>Tax: $${data.tax}</p>
                            <p>Shipping: ${
                              data?.shipping === 0
                                ? "FREE!"
                                : "$" + data?.shipping.toFixed(2)
                            }</p>
                            <p>Total: $${data?.trueFinalAmount}</p>
                            </div>
                            <p>Shipping Address:</p>
                            <p>${firstName} ${lastName}</p>
                            <p>${address}</p>
                            <p>${city}, ${state} ${zip}</p>
                            <p>${country}</p>
                            <p>${phone}</p>
                            <p>${email}</p>
                            <p>If you have any questions or concerns, you may reply to this email. Thank you and mush love.</p>
                            <p>Neo</p>
                            `,
                        };

                        sendEmail.mutate(msg, {
                          onSuccess: (res) => {
                            console.log(res, "res");
                            setIsLoading(false);
                            setCart([]);
                            router.push("/success");
                          },
                          onError: (err) => {
                            console.log(err, "err");
                            setIsLoading(false);
                            setError(err.message);
                          },
                        });
                      }

                      if (res.error) {
                        setIsLoading(false);
                        setError(
                          "Error ordering items, please contact Neo for support"
                        );
                      }
                    },
                    onError: (err) => {
                      console.log(err, "err");
                      setIsLoading(false);
                      setError(err.message);
                    },
                  }
                );
              });
          }}
        />
        {/* {data.clientSecret && (
          <form id="payment-form" onSubmit={(e) => handleSubmit(e)}>
            <LinkAuthenticationElement
              id="link-authentication-element"
              onChange={(e) => setEmail(e.value.email)}
            />
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            <button
              disabled={!stripe || isLoading || !elements}
              className="mt-4 w-full rounded bg-yellow-300 p-2"
              type="submit"
            >
              {isLoading || !stripe || !elements ? "Loading..." : "Pay"}
            </button>
          </form>
        )} */}
      </div>
      {error && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 backdrop-brightness-50">
          <div className="flex w-[95%] flex-col items-center space-y-2 rounded bg-white/80 p-4 text-center">
            <button className="self-start" onClick={() => setError("")}>
              <ChevronLeftIcon className="h-6" />
            </button>
            <XCircleIcon className="h-10 text-red-500" />
            <h1 className="text-xl">Oops...</h1>
            <p>{error ? error : "Something went wrong."}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Checkout = ({ setCheckout, setOpenCart, checkout }: CheckoutProps) => {
  const [confirmation, setConfirmation] = useState(false);
  // const [data, setData] = useState<{
  //   // clientSecret: any;
  //   shipping: any;
  //   tax: any;
  //   finalOrderAmount: any;
  //   finalAmount: any;
  //   trueFinalAmount: any;
  // }>();
  const [error, setError] = useState<string>();
  const [cart, setCart] = useAtom(cartAtom);
  // const [items, setItems] = useAtom(itemsAtom);

  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const [city, setCity] = useAtom(cityAtom);
  const [state, setState] = useAtom(stateAtom);
  const [country, setCountry] = useAtom(countryAtom);
  const [zip, setZip] = useAtom(zipAtom);
  const [phone, setPhone] = useAtom(phoneAtom);
  const [email, setEmail] = useAtom(emailAtom);

  // const createPaymentIntent = api.example.createPaymentIntent.useMutation();

  const countries = api.example.getCountries.useQuery(undefined, {
    onSuccess: (data) => {
      if (data.result) setCountry(data.result[0].code);
    },
    onError: (error) => {
      console.log(error, "error");
    },
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div
        className={`fixed z-[60] h-full w-screen animate-slideIn bg-black/50 p-5 py-20 backdrop-blur sm:flex sm:flex-col sm:items-center sm:justify-center ${
          checkout
            ? "opacity-100 transition duration-500 ease-out"
            : "translate-x-full opacity-0 transition duration-500 ease-out"
        }`}
      >
        <button
          className="self-start pb-4 sm:hidden"
          onClick={() => {
            setOpenCart(true);
            setCheckout(false);
          }}
        >
          <ChevronLeftIcon className=" h-6 text-white" />
        </button>
        {countries.isLoading ? (
          <p>Loading...</p>
        ) : countries.isError ? (
          <p>
            Error loading needed data, make sure the internet connection is
            solid and try again.
          </p>
        ) : (
          <div className="flex w-full max-w-[1000px] flex-col space-y-2">
            <button
              className="hidden pb-4 sm:block"
              onClick={() => {
                setOpenCart(true);
                setCheckout(false);
              }}
            >
              <ChevronLeftIcon className=" h-6 text-white" />
            </button>
            <h1 className="font-bold text-white">Shipping Info</h1>
            <input
              required
              className="rounded p-2 shadow"
              placeholder="First name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required
              className="rounded p-2 shadow"
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              required
              className="rounded p-2 shadow"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              required
              className="rounded p-2 shadow"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
            {/* <select
          className="rounded p-2 shadow"
          onChange={(e: any) => {
            setCountry(e.target.value);
          }}
          >
          <option>Select Country</option>
          {countries.data?.result.map((country: any) => (
            <option key={country.code} value={country.code}>
            {country.name}
            </option>
            ))}
          </select> */}
            <select
              className="rounded p-2 shadow"
              onChange={(e: any) => {
                setState(e.target.value);
              }}
            >
              <option>Select State</option>
              {countries.data?.result[0].states.map((country: any) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            <input
              required
              className="rounded p-2 shadow"
              placeholder="Zip"
              type={"number"}
              onChange={(e) => setZip(e.target.value)}
            />
            <input
              required
              className="rounded p-2 shadow"
              placeholder="Phone"
              type={"tel"}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              required
              className="rounded p-2 shadow"
              placeholder="Email"
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              // disabled={createPaymentIntent.isLoading}
              onClick={() =>
                // createPaymentIntent.mutate(
                //   {
                //     recipient: {
                //       name: `${firstName} ${lastName}`,
                //       address1: address,
                //       city,
                //       country,
                //       state,
                //       zip: +zip,
                //       phone,
                //       email,
                //     },
                //     items: cart,
                //   },
                //   {
                //     onSuccess: (data) => {
                //       setData(data);
                //       console.log(data, "data");
                //       setConfirmation(true);
                //     },
                //     onError: (error) => {
                //       console.log(error, "error");
                //       setError(error.message);
                //     },
                //   }
                // )
                setConfirmation(true)
              }
              className={`rounded-lg bg-yellow-300 p-2 font-bold ${
                ""
                // createPaymentIntent.isLoading ? "opacity-50" : ""
              }`}
            >
              {/* {createPaymentIntent.isLoading ? "Loading..." : "Continue"} */}
              Continue
            </button>
          </div>
        )}
      </div>
      {/* {data && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: data.clientSecret,
            appearance: { theme: "stripe" },
          }}
        >
          <Confirmation
            data={data}
            confirmation={confirmation}
            setConfirmation={setConfirmation}
          />
        </Elements>
      )} */}
      {confirmation && (
        <Confirmation
          // data={data}
          confirmation={confirmation}
          setConfirmation={setConfirmation}
        />
      )}
      {error && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 backdrop-brightness-50">
          <div className="flex w-[95%] flex-col items-center space-y-2 rounded bg-white/80 p-4 text-center">
            <button className="self-start" onClick={() => setError("")}>
              <ChevronLeftIcon className="h-6" />
            </button>
            <XCircleIcon className="h-10 text-red-500" />
            <h1 className="text-xl">Oops...</h1>
            <p className="">{error ? error : "Something went wrong."}</p>
          </div>
        </div>
      )}
    </>
  );
};

const Cart = ({ setCheckout, setOpenCart, openCart }: CartProps) => {
  const [cart, setCart] = useAtom(cartAtom);
  const [subtotal, setSubtotal] = useAtom(subtotalAtom);

  console.log(cart, "cart");

  useEffect(() => {
    setSubtotal(
      cart.reduce((prev, curr) => {
        return (prev += +curr.price * curr.quantity);
      }, 0)
    );
  }, [cart]);

  const renderCart = () => {
    return cart.map((item: any) => (
      <div
        key={item.id ? item.id : item.name}
        className="flex w-full justify-between p-2"
      >
        <div className="flex h-full w-full space-x-2">
          <div className="h-[25%] w-[25%] max-w-[200px] overflow-hidden rounded-lg bg-white shadow">
            <Image
              className="h-full w-full object-contain"
              height={100}
              width={100}
              src={
                item.image
                  ? item.image
                  : item.name === "Golds"
                  ? goldCap
                  : item.name === "Blues"
                  ? blueCap
                  : item.name === "Reds"
                  ? redCap
                  : purpleCap
              }
              alt=""
            />
          </div>
          <div className="w-[70%] p-1">
            <h1 className="font-bold sm:text-xl">{item.name}</h1>
            <p>${item.price}</p>
          </div>
        </div>
        <div className="flex items-center pr-2">
          <button
            onClick={() => {
              const selectedItem = cart.find((i: any) => item.name === i.name);
              if (selectedItem.quantity === 1) {
                return setCart((prev) => {
                  return prev.filter((i: any) => item.name !== i.name);
                });
              }
              selectedItem.quantity -= 1;
              return setCart([...cart]);
            }}
          >
            {item.quantity === 1 ? (
              <TrashIcon className="h-5" />
            ) : (
              <MinusCircleIcon className="w-6" />
            )}
          </button>
          <p className="px-2">{item.quantity}</p>
          <button
            onClick={() => {
              const selectedItem = cart.find((i: any) => item.name === i.name);
              selectedItem.quantity += 1;
              return setCart([...cart]);
            }}
          >
            <PlusCircleIcon className="w-6" />
          </button>
        </div>
        {/* <button
          onClick={() =>
            setCart((prev) => {
              return prev.filter((i: any) => item.name !== i.name);
            })
          }
        >
          <TrashIcon className="h-4" />
        </button> */}
      </div>
    ));
  };

  return (
    <div
      className={`fixed z-50 flex h-full w-screen animate-slideIn flex-col justify-between overflow-y-scroll bg-black/50 py-20 text-white backdrop-blur backdrop-brightness-90 sm:p-5 lg:p-10 ${
        openCart
          ? "opacity-100 transition duration-500 ease-out"
          : "translate-x-full opacity-0 transition duration-500 ease-out"
      }`}
    >
      <button
        className="self-start pl-5 sm:pt-20"
        onClick={() => setOpenCart(false)}
      >
        <ChevronLeftIcon className="h-6" />
      </button>
      <div className="min-h-[250px] space-y-2 overflow-y-scroll sm:mt-5">
        {renderCart()}
      </div>
      <div className="w-full p-5 sm:p-10">
        <div className="space-y-2 border-t border-dashed border-t-[#aaaaaa] pt-3">
          <div className="flex justify-between">
            <h1 className="font-bold">SubTotal:</h1>
            <p className="font-bold">${subtotal.toFixed(2)}</p>
          </div>
          <button
            onClick={() => {
              setCheckout(true);
              setOpenCart(false);
            }}
            className="w-full rounded-lg bg-yellow-300 p-2 font-bold text-black shadow transition-all duration-200 ease-in-out hover:opacity-80"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

type TopNavbarProps = {
  setPopupOpen: Dispatch<SetStateAction<boolean>>;
};

export default function TopNavbar({ setPopupOpen }: TopNavbarProps) {
  const [openCart, setOpenCart] = useState(false);
  const [cart, setCart] = useAtom(cartAtom);
  const [checkout, setCheckout] = useState(false);

  return (
    <>
      <div className="fixed top-0 z-[90] flex w-full justify-between p-2 lg:p-5 lg:px-10">
        <Link href="/">
          <Image
            className="max-w-[170px] animate-slideRight"
            src={logo}
            alt=""
          />
        </Link>
        <div className="flex animate-slideLeft space-x-3">
          <button
            className="relative"
            onClick={() => {
              setPopupOpen(false);
              setOpenCart(!openCart);
            }}
          >
            <div className="absolute -right-2 -top-1 h-auto w-6 rounded-full bg-purple-500 p-[2px] ">
              <p className="text-center text-sm text-white">
                {cart.reduce((prev, curr) => {
                  return prev + curr.quantity;
                }, 0)}
              </p>
            </div>
            <ShoppingCartIcon className="h-10 w-10 text-white" />
          </button>
          <Image className="w-10" src={whiteMushLogo} alt="" />
        </div>
      </div>

      <Cart
        setOpenCart={setOpenCart}
        openCart={openCart}
        setCheckout={setCheckout}
      />
      <Checkout
        setCheckout={setCheckout}
        checkout={checkout}
        setOpenCart={setOpenCart}
      />
    </>
  );
}
