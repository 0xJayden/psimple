import {
  ChevronLeftIcon,
  PhotoIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { api } from "~/utils/api";

interface MerchPopupProps {
  item: any;
  setPopupOpen: Dispatch<SetStateAction<boolean>>;
}

export const cartAtom = atomWithStorage<Array<any>>("cart", []);

export default function MerchPopup({ item, setPopupOpen }: MerchPopupProps) {
  const [image, setImage] = useState("");
  const [index, setIndex] = useState(0);
  const [xsmallItems, setXsmallItems] = useState<Array<any>>([]);
  const [smallItems, setSmallItems] = useState<Array<any>>([]);
  const [mediumItems, setMediumItems] = useState<Array<any>>([]);
  const [largeItems, setLargeItems] = useState<Array<any>>([]);
  const [xlargeItems, setXlargeItems] = useState<Array<any>>([]);
  const [xxlargeItems, setXxlargeItems] = useState<Array<any>>([]);
  const [xxxlargeItems, setXxxlargeItems] = useState<Array<any>>([]);
  const [selectedSize, setSelectedSize] = useState("S");
  const [cart, setCart] = useAtom(cartAtom);
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);

  const query = api.example.getItem.useQuery(
    {
      id: item.id.toString(),
    },
    {
      onSuccess: (data) => {
        data.result.sync_variants[index].files.map((file: any) => {
          if (file.type === "preview") setImage(file.preview_url);
        });

        if (
          xsmallItems.length !== 0 ||
          smallItems.length !== 0 ||
          mediumItems.length !== 0 ||
          largeItems.length !== 0 ||
          xlargeItems.length !== 0 ||
          xxlargeItems.length !== 0 ||
          xxxlargeItems.length !== 0
        )
          return;

        data.result.sync_variants.map((item: any, i: number) => {
          if (item.name.includes("/ XS"))
            setXsmallItems((prev) => [...prev, item]);
          if (item.name.includes("/ S")) {
            setSmallItems((prev) => [...prev, item]);
            setIndex(data.result.sync_variants.indexOf(item));
          }
          if (item.name.includes("/ M"))
            setMediumItems((prev) => [...prev, item]);
          if (item.name.includes("/ L"))
            setLargeItems((prev) => [...prev, item]);
          if (item.name.includes("/ XL"))
            setXlargeItems((prev) => [...prev, item]);
          if (item.name.includes("/ 2XL"))
            setXxlargeItems((prev) => [...prev, item]);
          if (item.name.includes("/ 3XL"))
            setXxxlargeItems((prev) => [...prev, item]);
        });

        console.log(data, "get item data");
      },
      onError: (error) => {
        console.log(error, "get item error");
      },
    }
  );

  return (
    <div className="fixed z-50 flex h-screen w-full items-center justify-center p-2 py-20 backdrop-blur backdrop-brightness-90">
      <div className="flex h-full w-full max-w-[1000px] flex-col items-center space-y-2 overflow-hidden rounded-xl bg-white/70 p-2">
        <button className="self-start" onClick={() => setPopupOpen(false)}>
          <ChevronLeftIcon className="h-6 w-6" />
        </button>

        <div className="flex h-[200px] w-[200px] items-center justify-center overflow-hidden rounded">
          {image ? (
            <Image
              className="h-full w-full object-cover"
              width={100}
              height={100}
              src={image}
              alt=""
            />
          ) : (
            <PhotoIcon className="w-20" />
          )}
        </div>
        {smallItems.length > 0 && (
          <div className="flex w-full flex-col items-center justify-center">
            <h1 className="self-start pl-5">Size: {selectedSize}</h1>
            <div className="flex w-[95%] space-x-2 overflow-x-scroll p-1 text-sm">
              {xsmallItems.length > 0 && (
                <button
                  onClick={() => setSelectedSize("XS")}
                  className={`min-h-[40px] min-w-[40px] rounded-lg border text-center shadow ${
                    selectedSize === "XS" && "border-[2px] border-yellow-300"
                  }`}
                >
                  XS
                </button>
              )}
              {smallItems.length > 0 && (
                <button
                  onClick={() => setSelectedSize("S")}
                  className={`min-h-[40px] min-w-[40px] rounded-lg border text-center shadow ${
                    selectedSize === "S" && "border-[2px] border-yellow-300"
                  }`}
                >
                  S
                </button>
              )}
              {mediumItems.length > 0 && (
                <button
                  onClick={() => setSelectedSize("M")}
                  className={`min-h-[40px] min-w-[40px] rounded-lg border text-center shadow ${
                    selectedSize === "M" && "border-[2px] border-yellow-300"
                  }`}
                >
                  M
                </button>
              )}
              {largeItems.length > 0 && (
                <button
                  onClick={() => setSelectedSize("L")}
                  className={`min-h-[40px] min-w-[40px] rounded-lg border text-center shadow ${
                    selectedSize === "L" && "border-[2px] border-yellow-300"
                  }`}
                >
                  L
                </button>
              )}
              {xlargeItems.length > 0 && (
                <button
                  onClick={() => setSelectedSize("XL")}
                  className={`min-h-[40px] min-w-[40px] rounded-lg border text-center shadow ${
                    selectedSize === "XL" && "border-[2px] border-yellow-300"
                  }`}
                >
                  XL
                </button>
              )}
              {xxlargeItems.length > 0 && (
                <button
                  onClick={() => setSelectedSize("2XL")}
                  className={`min-h-[40px] min-w-[40px] rounded-lg border text-center shadow ${
                    selectedSize === "2XL" && "border-[2px] border-yellow-300"
                  }`}
                >
                  2XL
                </button>
              )}
              {xxxlargeItems.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedSize("3XL");
                  }}
                  className={`min-h-[40px] min-w-[40px] rounded-lg border text-center shadow ${
                    selectedSize === "3XL" && "border-[2px] border-yellow-300"
                  }`}
                >
                  3XL
                </button>
              )}
            </div>
          </div>
        )}
        {selectedSize === "XS" && xsmallItems.length > 0 && (
          <div className="flex w-[97%] space-x-2 overflow-x-scroll p-2">
            {xsmallItems.map((item: any) => (
              <button
                onClick={() => {
                  setIndex(query.data.result.sync_variants.indexOf(item));
                  query.refetch();
                }}
                className={`min-w-[50px] overflow-hidden rounded-lg shadow ${
                  index === query.data.result.sync_variants.indexOf(item) &&
                  "border-[2px] border-yellow-300"
                }`}
                key={item.id}
              >
                <Image width={50} height={50} alt="" src={item.product.image} />
              </button>
            ))}
          </div>
        )}
        {selectedSize === "S" && smallItems.length > 0 && (
          <div className="flex w-[97%] space-x-2 overflow-x-scroll p-2">
            {smallItems.map((item: any) => (
              <button
                onClick={() => {
                  setIndex(query.data.result.sync_variants.indexOf(item));
                  query.refetch();
                }}
                className={`min-w-[50px] overflow-hidden rounded-lg shadow ${
                  index === query.data.result.sync_variants.indexOf(item) &&
                  "border-[2px] border-yellow-300"
                }`}
                key={item.id}
              >
                <Image width={50} height={50} alt="" src={item.product.image} />
              </button>
            ))}
          </div>
        )}
        {selectedSize === "M" && mediumItems.length > 0 && (
          <div className="flex w-[97%] space-x-2 overflow-x-scroll p-2">
            {mediumItems.map((i: any) => (
              <button
                onClick={() => {
                  setIndex(query.data.result.sync_variants.indexOf(i));
                  query.refetch();
                }}
                className={`min-w-[50px] overflow-hidden rounded-lg shadow ${
                  index === query.data.result.sync_variants.indexOf(i) &&
                  "border-[2px] border-yellow-300"
                }`}
                key={i.id}
              >
                <Image width={50} height={50} alt="" src={i.product.image} />
              </button>
            ))}
          </div>
        )}
        {selectedSize === "L" && largeItems.length > 0 && (
          <div className="flex w-[97%] space-x-2 overflow-x-scroll p-2">
            {largeItems.map((i: any) => (
              <button
                onClick={() => {
                  setIndex(query.data.result.sync_variants.indexOf(i));
                  query.refetch();
                }}
                className={`min-w-[50px] overflow-hidden rounded-lg shadow ${
                  index === query.data.result.sync_variants.indexOf(i) &&
                  "border-[2px] border-yellow-300"
                }`}
                key={i.id}
              >
                <Image width={50} height={50} alt="" src={i.product.image} />
              </button>
            ))}
          </div>
        )}
        {selectedSize === "XL" && xlargeItems.length > 0 && (
          <div className="flex w-[97%] space-x-2 overflow-x-scroll p-2">
            {xlargeItems.map((i: any) => (
              <button
                onClick={() => {
                  setIndex(query.data.result.sync_variants.indexOf(i));
                  query.refetch();
                }}
                className={`min-w-[50px] overflow-hidden rounded-lg shadow ${
                  index === query.data.result.sync_variants.indexOf(i) &&
                  "border-[2px] border-yellow-300"
                }`}
                key={i.id}
              >
                <Image width={50} height={50} alt="" src={i.product.image} />
              </button>
            ))}
          </div>
        )}
        {selectedSize === "2XL" && xxlargeItems.length > 0 && (
          <div className="flex w-[97%] space-x-2 overflow-x-scroll p-2">
            {xxlargeItems.map((i: any) => (
              <button
                onClick={() => {
                  setIndex(query.data.result.sync_variants.indexOf(i));
                  query.refetch();
                }}
                className={`min-w-[50px] overflow-hidden rounded-lg shadow ${
                  index === query.data.result.sync_variants.indexOf(i) &&
                  "border-[2px] border-yellow-300"
                }`}
                key={i.id}
              >
                <Image width={50} height={50} alt="" src={i.product.image} />
              </button>
            ))}
          </div>
        )}
        {selectedSize === "3XL" && xxxlargeItems.length > 0 && (
          <div className="flex w-[97%] space-x-2 overflow-x-scroll p-2">
            {xxxlargeItems.map((i: any) => (
              <button
                onClick={() => {
                  setIndex(query.data.result.sync_variants.indexOf(i));
                  query.refetch();
                }}
                className={`min-w-[50px] overflow-hidden rounded-lg shadow ${
                  index === query.data.result.sync_variants.indexOf(i) &&
                  "border-[2px] border-yellow-300"
                }`}
                key={i.id}
              >
                <Image width={50} height={50} alt="" src={i.product.image} />
              </button>
            ))}
          </div>
        )}
        {smallItems.length === 0 && !query.isLoading && (
          <div className="flex w-[97%] space-x-2 overflow-x-scroll p-2">
            {query.data.result.sync_variants.map((variant: any, i: number) => (
              <div
                key={i}
                onClick={() => {
                  setIndex(i);
                  query.refetch();
                }}
                className={`h-[80px] w-[80px] cursor-pointer overflow-hidden rounded shadow ${
                  index === i ? "border-2 border-yellow-300" : ""
                }`}
              >
                <Image
                  className="h-full w-full object-cover"
                  width={50}
                  height={50}
                  src={variant.product.image}
                  alt=""
                />
              </div>
            ))}
          </div>
        )}
        <h1 className="text-xl">
          {query.isLoading
            ? "Loading..."
            : query.data.result.sync_variants[index].name}
        </h1>
        <p className="pb-2 text-xl font-bold">
          {query.isLoading
            ? "Loading..."
            : "$" + query.data.result.sync_variants[index].retail_price}
        </p>
        <button
          onClick={() => {
            const queriedItem = query.data.result.sync_variants[index];
            const itemExists = cart.find((item) => item.id === queriedItem.id);
            if (itemExists) {
              itemExists.quantity += 1;
              setCart((prev) => [...prev]);
              setAddToCartSuccess(true);
              return setTimeout(() => setAddToCartSuccess(false), 3000);
            }

            const item = {
              name: queriedItem.name,
              id: queriedItem.id,
              variant_id: queriedItem.variant_id,
              quantity: 1,
              image: queriedItem.files[1].preview_url,
              price: queriedItem.retail_price,
            };
            setCart((prev) => [...prev, item]);
            setAddToCartSuccess(true);
            setTimeout(() => setAddToCartSuccess(false), 3000);
          }}
          className="w-full max-w-[500px] rounded-full bg-yellow-300 p-2 font-bold transition-all duration-200 ease-in-out hover:bg-yellow-300/60"
        >
          Add to Cart
        </button>
      </div>
      <div
        className={`fixed bottom-2 z-[70] flex h-20 w-[95%] max-w-[300px] items-center justify-center space-x-4 rounded-lg bg-green-500/80 p-2 text-white backdrop-blur-xl ${
          addToCartSuccess
            ? "animate-popUp"
            : "opacity-0 transition-all duration-500 ease-in-out"
        }`}
      >
        <div className="flex items-center">
          <PlusIcon className="h-7 w-7" />
          <p className="text-2xl">1</p>
        </div>
        <div>
          <p>{item.name}</p>
          <h1>added to cart</h1>
        </div>
      </div>
    </div>
  );
}
