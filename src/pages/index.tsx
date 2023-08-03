import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import { useEffect, useState } from "react";

import merchBg from "~/assets/images/merchbg.png";
import giveaway from "~/assets/images/giveaway.png";
import logo from "~/assets/images/logo.png";
import tricolorLogo from "~/assets/images/tricolor-logo.png";
import redPill from "~/assets/images/red-pill.png";
import goldCap from "~/assets/images/gold-cap.png";
import goldInfo from "~/assets/images/goldInfo.png";
import Socials from "~/components/Socials";
import bluePill from "~/assets/images/bluePill.png";
import blueInfo from "~/assets/images/blueInfo.png";
import redInfo from "~/assets/images/redInfo.png";
import purplePill from "~/assets/images/purplePill.png";
import purpleInfo from "~/assets/images/purpleInfo.png";
import { api } from "~/utils/api";
import TopNavbar from "~/components/TopNavbar";
import MerchPopup from "~/components/MerchPopup";
import goldCopy from "~/assets/images/goldCopy.png";
import blueCopy from "~/assets/images/blueCopy.png";
import redCopy from "~/assets/images/redCopy.png";
import purpleCopy from "~/assets/images/purpleCopy.png";
import { cartAtom } from "~/components/MerchPopup";
import { useAtom } from "jotai";
import { PlusIcon } from "@heroicons/react/24/outline";

export const myFont = localFont({ src: "../assets/fonts/Bugaki-Regular.ttf" });

const openSauce = localFont({
  src: "../assets/fonts/OpenSauceSans-Regular.ttf",
});

const Home: NextPage = () => {
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [merchItem, setMerchItem] = useState<any>(null);
  const [cart, setCart] = useAtom(cartAtom);
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);

  const merchItems = api.example.getItems.useQuery(undefined, {
    onSuccess: (data) => {
      console.log(data, "data");
    },
    onError: (err) => {
      console.log(err, "error");
    },
    refetchOnWindowFocus: false,
  });

  function playVideoOnLowPower() {
    try {
      const videoElements = document.querySelectorAll("video");
      // console.log(videoElements, "videoElements");

      for (let i = 0; i < videoElements.length; i++) {
        if (videoElements[i]?.played.length !== 0) {
          // video is already playing so do nothing
          console.log("Playing", videoElements[i]?.played);
        } else {
          // video is not playing so play video now
          videoElements[i]?.play().catch((err) => console.log(err));
          console.log("Not Playing");
        }
      }
    } catch (err) {
      console.log(err, "playing video error");
    }
  }

  const openMerchPopup = (item: any) => {
    console.log("item", item);
    setPopupOpen(true);
    setMerchItem(item);
  };

  const renderMerchItems = () => {
    return merchItems.isLoading ? (
      <div className="absolute flex h-full w-full items-center justify-center pb-5">
        <div className="flex flex-col items-center justify-center">
          <Image
            className="max-w-[150px] animate-float"
            src={tricolorLogo}
            alt=""
          />
          <p className="pt-5 text-center text-2xl text-white">
            Loading merch...
          </p>
        </div>
      </div>
    ) : merchItems.isError ? (
      <p>Error loading merch</p>
    ) : merchItems.data && merchItems.data.result ? (
      merchItems.data.result.map((item: any) => {
        return (
          <div
            key={item.name}
            onClick={() => {
              openMerchPopup(item);
            }}
            className="flex flex-col items-center space-y-1 overflow-hidden text-white"
          >
            <Image
              className="rounded-lg shadow-lg lg:h-[200px] lg:w-[200px]"
              width={150}
              height={150}
              src={item.thumbnail_url}
              alt=""
            />
            <p className="text-center sm:text-2xl">{item.name}</p>
          </div>
        );
      })
    ) : (
      <p>
        Something went wrong. Make sure the internet connection is solid and
        refresh the page.
      </p>
    );
  };

  useEffect(() => {
    document.body.addEventListener("click", playVideoOnLowPower);
    document.body.addEventListener("touchstart", playVideoOnLowPower);

    setTimeout(() => {
      setHide(true);
    }, 9300);

    setTimeout(() => {
      setHide2(true);
    }, 6700);
  }, []);

  return (
    <>
      <Head>
        <title>pSimple</title>
        <meta name="description" content="pSimple" />
        <link rel="icon" href="/myfavicon.ico" />
      </Head>
      <main
        style={myFont.style}
        className={`relative flex min-h-screen flex-col items-center ${
          hide ? "bg-yellow-400" : "bg-black"
        }`}
      >
        {!hide2 && (
          <div className="fixed inset-0 z-20 flex flex-col items-center justify-center p-5 sm:p-20">
            <Image
              className="max-w-[200px] animate-show2"
              src={tricolorLogo}
              alt=""
            />
            <Image className="max-w-[200px] animate-show3" src={logo} alt="" />
          </div>
        )}
        {!hide && (
          <div className="fixed inset-0 z-10 flex animate-hide items-center justify-center overflow-hidden">
            <video
              autoPlay
              muted
              playsInline
              className="scale-[4.5] sm:scale-[2.8] md:scale-[2]"
            >
              <source
                src="https://d1uc5ptgdyrytu.cloudfront.net/open-720.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        )}
        <div
          className={`fixed bottom-2 z-[70] flex h-20 w-[95%] max-w-[600px] items-center justify-center space-x-4 rounded-lg bg-green-500/80 text-white backdrop-blur-xl ${
            addToCartSuccess
              ? "animate-popUp"
              : "opacity-0 transition-all duration-500 ease-in-out"
          }`}
        >
          <div className="flex items-center">
            <PlusIcon className="h-8 w-8" />
            <p className="text-2xl">1</p>
          </div>
          <h1>Secret item added to cart...</h1>
        </div>
        <div className="animate-show">
          <TopNavbar setPopupOpen={setPopupOpen} />
          {popupOpen && (
            <MerchPopup item={merchItem} setPopupOpen={setPopupOpen} />
          )}
          <div className="height-bg1 height-bg2 height-768 height-bg3 relative flex h-[440px] items-center justify-center overflow-hidden sm:h-[600px]">
            <Image
              className="scale-375 scale-1650 scale-640 scale-1024 scale-1280 scale-768 scale-[2.7] brightness-90"
              src={merchBg}
              alt=""
            />
            <Image
              className="absolute w-[90%] max-w-[800px] pb-12"
              src={giveaway}
              alt=""
            />
            <div className="absolute bottom-20 w-full">
              <div className="absolute left-0 right-0 mx-auto h-8 w-[290px] rounded-full bg-blue-500 opacity-50 blur sm:h-10 sm:w-[430px]"></div>
              <h1 className="text-center text-2xl font-bold text-[#fffefe] drop-shadow sm:text-4xl">
                ENTER THE MATRIX
              </h1>
            </div>
            <div className="absolute bottom-5 animate-show">
              <Socials />
            </div>
          </div>
          <div className="relative flex min-h-[300px] flex-col items-center space-y-4 bg-gradient-to-b from-[rgb(213,187,59)] via-[#f0da32] to-[rgb(220,197,83)] p-2 py-4 sm:p-5 md:p-10">
            <div className="relative">
              <h1 className="absolute -top-[2px] text-5xl font-bold text-cyan-400 drop-shadow sm:text-4xl lg:text-5xl">
                MERCH
              </h1>
              <h1 className="absolute top-[2px] text-5xl font-bold text-red-500 drop-shadow sm:text-4xl lg:text-5xl">
                MERCH
              </h1>
              <h1 className="text-5xl font-bold text-white drop-shadow sm:text-4xl lg:text-5xl">
                MERCH
              </h1>
            </div>
            <div className="relative grid min-h-[300px] grid-cols-2 gap-4 py-4 pb-10 lg:gap-8">
              {renderMerchItems()}
            </div>
            <div className="absolute bottom-3 flex w-full animate-show items-center justify-center">
              <Socials />
            </div>
          </div>
          <div className="hidden w-full lg:flex">
            <div className="relative w-1/2 bg-gradient-to-r from-[rgb(214,189,90)] via-[rgb(248,236,187)] to-[rgb(214,189,90)]">
              <Image
                className="absolute bottom-0 top-0 my-auto opacity-50"
                src={goldCap}
                alt=""
              />
              <h1 className="relative pt-5 text-center text-4xl font-bold text-[#fff8f8] drop-shadow-lg">
                THE GOLDEN AGE
              </h1>
              <Image
                // onClick={() => {
                //   const itemExists = cart.find((item) => item.name === "Golds");
                //   if (itemExists) {
                //     itemExists.quantity += 1;
                //     setCart([...cart]);
                //     setAddToCartSuccess(true);
                //     return setTimeout(() => setAddToCartSuccess(false), 3000);
                //   }
                //   setCart((prev) => [
                //     ...prev,
                //     { name: "Golds", quantity: 1, price: "30.00" },
                //   ]);
                //   setAddToCartSuccess(true);
                //   setTimeout(() => setAddToCartSuccess(false), 3000);
                // }}
                src={goldCopy}
                alt=""
                className="absolute bottom-0 top-0 my-auto drop-shadow-lg"
              />
              <div className="absolute bottom-3 flex w-full animate-show items-center justify-center">
                <Socials />
              </div>
            </div>
            <Image className="w-1/2" src={goldInfo} alt="" />
          </div>
          <div className="relative flex min-h-[400px] flex-col items-center overflow-hidden bg-gradient-to-r from-[rgb(214,189,90)] via-[rgb(248,236,187)] to-[rgb(214,189,90)] p-2 py-4 sm:min-h-[750px] lg:hidden lg:py-0">
            <Image
              className="absolute bottom-0 top-0 my-auto opacity-50"
              src={goldCap}
              alt=""
            />
            <h1 className="relative text-center text-4xl font-bold text-[#fff8f8] drop-shadow-lg sm:text-5xl">
              THE GOLDEN AGE
            </h1>
            <Image
              // onClick={() => {
              //   const itemExists = cart.find((item) => item.name === "Golds");
              //   if (itemExists) {
              //     itemExists.quantity += 1;
              //     setCart([...cart]);
              //     setAddToCartSuccess(true);
              //     return setTimeout(() => setAddToCartSuccess(false), 3000);
              //   }

              //   setCart((prev) => [
              //     ...prev,
              //     { name: "Golds", quantity: 1, price: "30.00" },
              //   ]);
              //   setAddToCartSuccess(true);
              //   setTimeout(() => setAddToCartSuccess(false), 3000);
              // }}
              src={goldCopy}
              alt=""
              className="absolute bottom-0 top-0 my-auto drop-shadow-lg"
            />
            <div className="absolute bottom-3 flex w-full animate-show items-center justify-center">
              <Socials />
            </div>
          </div>
          <div className="relative flex min-h-[300px] flex-col items-center justify-center lg:hidden">
            <Image src={goldInfo} alt="" />
          </div>
          <div className="hidden w-full lg:flex">
            <Image className="w-1/2" src={blueInfo} alt="" />
            <div className="flex w-1/2 items-center justify-center bg-[rgb(93,181,249)]">
              <Image
                className="absolute opacity-50 md:max-w-[600px] lg:max-w-[490px]"
                src={bluePill}
                alt=""
              />

              <Image
                // onClick={() => {
                //   const itemExists = cart.find((item) => item.name === "Blues");
                //   if (itemExists) {
                //     itemExists.quantity += 1;
                //     setCart([...cart]);
                //     setAddToCartSuccess(true);
                //     return setTimeout(() => setAddToCartSuccess(false), 3000);
                //   }
                //   setCart((prev) => [
                //     ...prev,
                //     { name: "Blues", quantity: 1, price: "20.00" },
                //   ]);
                //   setAddToCartSuccess(true);
                //   setTimeout(() => setAddToCartSuccess(false), 3000);
                // }}
                src={blueCopy}
                alt=""
                className="relative drop-shadow-lg"
              />
            </div>
          </div>
          <div className="relative flex min-h-[350px] items-center justify-center bg-[rgb(93,181,249)] p-2 sm:min-h-[550px] sm:p-5 md:min-h-[650px] md:p-10 lg:hidden">
            <Image
              className="absolute w-4/5 opacity-50 md:max-w-[600px] lg:max-w-[490px]"
              src={bluePill}
              alt=""
            />
            <Image
              // onClick={() => {
              //   const itemExists = cart.find((item) => item.name === "Blues");
              //   if (itemExists) {
              //     itemExists.quantity += 1;
              //     setCart([...cart]);
              //     setAddToCartSuccess(true);
              //     return setTimeout(() => setAddToCartSuccess(false), 3000);
              //   }
              //   setCart((prev) => [
              //     ...prev,
              //     { name: "Blues", quantity: 1, price: "20.00" },
              //   ]);
              //   setAddToCartSuccess(true);
              //   setTimeout(() => setAddToCartSuccess(false), 3000);
              // }}
              src={blueCopy}
              alt=""
              className="relative drop-shadow-lg"
            />
          </div>
          <Image className="lg:hidden" src={blueInfo} alt="" />
          <div className="hidden w-full lg:flex">
            <div className="flex w-1/2 items-center justify-center bg-[rgb(236,99,94)]">
              <Image
                className="absolute opacity-50 md:max-w-[600px] lg:max-w-[490px]"
                src={redPill}
                alt=""
              />

              <Image
                // onClick={() => {
                //   const itemExists = cart.find((item) => item.name === "Reds");
                //   if (itemExists) {
                //     itemExists.quantity += 1;
                //     setCart([...cart]);
                //     setAddToCartSuccess(true);
                //     return setTimeout(() => setAddToCartSuccess(false), 3000);
                //   }
                //   setCart((prev) => [
                //     ...prev,
                //     { name: "Reds", quantity: 1, price: "40.00" },
                //   ]);
                //   setAddToCartSuccess(true);
                //   setTimeout(() => setAddToCartSuccess(false), 3000);
                // }}
                src={redCopy}
                alt=""
                className="relative drop-shadow-lg"
              />
            </div>
            <Image className="w-1/2" src={redInfo} alt="" />
          </div>
          <div className="relative flex min-h-[350px] items-center justify-center bg-[rgb(236,99,94)] p-2 sm:min-h-[550px] sm:p-5 md:min-h-[650px] md:p-10 lg:hidden">
            <Image
              className="absolute w-4/5 opacity-50 md:max-w-[600px] lg:max-w-[490px]"
              src={redPill}
              alt=""
            />
            <Image
              // onClick={() => {
              //   const itemExists = cart.find((item) => item.name === "Reds");
              //   if (itemExists) {
              //     itemExists.quantity += 1;
              //     setCart([...cart]);
              //     setAddToCartSuccess(true);
              //     return setTimeout(() => setAddToCartSuccess(false), 3000);
              //   }
              //   setCart((prev) => [
              //     ...prev,
              //     { name: "Reds", quantity: 1, price: "40.00" },
              //   ]);
              //   setAddToCartSuccess(true);
              //   setTimeout(() => setAddToCartSuccess(false), 3000);
              // }}
              src={redCopy}
              alt=""
              className="relative drop-shadow-lg"
            />
          </div>
          <Image className="lg:hidden" src={redInfo} alt="" />
          <div className="hidden w-full lg:flex">
            <Image className="w-1/2" src={purpleInfo} alt="" />
            <div className="flex w-1/2 items-center justify-center bg-[rgb(159,52,209)]">
              <Image
                className="absolute opacity-50 md:max-w-[600px] lg:max-w-[490px]"
                src={purplePill}
                alt=""
              />

              <Image
                // onClick={() => {
                //   const itemExists = cart.find(
                //     (item) => item.name === "Purples"
                //   );
                //   if (itemExists) {
                //     itemExists.quantity += 1;
                //     setCart([...cart]);
                //     setAddToCartSuccess(true);
                //     return setTimeout(() => setAddToCartSuccess(false), 3000);
                //   }
                //   setCart((prev) => [
                //     ...prev,
                //     { name: "Purples", quantity: 1, price: "60.00" },
                //   ]);
                //   setAddToCartSuccess(true);
                //   setTimeout(() => setAddToCartSuccess(false), 3000);
                // }}
                src={purpleCopy}
                alt=""
                className="relative px-2 drop-shadow-lg"
              />
            </div>
          </div>
          <div className="relative flex min-h-[350px] items-center justify-center bg-[rgb(159,52,209)] p-4 px-6 sm:p-5 md:p-10 lg:hidden">
            <Image className="w-4/5 opacity-50" src={purplePill} alt="" />
            <Image
              // onClick={() => {
              //   const itemExists = cart.find((item) => item.name === "Purples");
              //   if (itemExists) {
              //     itemExists.quantity += 1;
              //     setCart([...cart]);
              //     setAddToCartSuccess(true);
              //     return setTimeout(() => setAddToCartSuccess(false), 3000);
              //   }
              //   setCart((prev) => [
              //     ...prev,
              //     { name: "Purples", quantity: 1, price: "60.00" },
              //   ]);
              //   setAddToCartSuccess(true);
              //   setTimeout(() => setAddToCartSuccess(false), 3000);
              // }}
              src={purpleCopy}
              alt=""
              className="absolute px-2 drop-shadow-lg"
            />
          </div>
          <Image className="lg:hidden" src={purpleInfo} alt="" />
          <div className="relative flex items-center justify-center bg-[rgb(236,99,94)] p-2 sm:p-5 md:p-10">
            <Image
              className="absolute w-4/5 opacity-40 md:max-w-[600px] lg:max-w-[490px]"
              src={redPill}
              alt=""
            />
            <div className="max-w-[1200px] space-y-5">
              <div className="relative text-end">
                <h1 className="absolute -top-[2px] right-0 text-2xl font-bold text-cyan-400 drop-shadow sm:text-4xl lg:text-5xl">
                  THE PSCIENCE
                </h1>
                <h1 className="absolute right-0 top-[2px] text-2xl font-bold text-red-500 drop-shadow sm:text-4xl lg:text-5xl">
                  THE PSCIENCE
                </h1>
                <h1 className="text-2xl font-bold text-white drop-shadow sm:text-4xl lg:text-5xl">
                  THE PSCIENCE
                </h1>
              </div>
              <div className="relative space-y-5">
                <div
                  style={openSauce.style}
                  className="space-y-3 text-end text-sm lg:text-base"
                >
                  <p className="text-white drop-shadow">
                    Psilocybin is a naturally occurring psychoactive compound
                    found in certain species of mushrooms. Over the years,
                    psilocybin has been widely studied for its therapeutic
                    potential, particularly in the treatment of mental health
                    disorders such as depression, anxiety, and PTSD. In recent
                    times, microdosing, or taking small amounts of psilocybin at
                    regular intervals, has gained popularity as a method of
                    enhancing mental health and cognitive function.
                  </p>

                  <p className="text-white drop-shadow">
                    {`Studies have shown that psilocybin microdosing can have a
                positive effect on mental health, including reducing symptoms of
                anxiety and depression, improving mood and creativity, and
                increasing overall well-being. In a randomized, double-blind,
                placebo-controlled study, conducted by Fadiman and Korb (2019),
                98 participants reported a significant improvement in their
                mental health after microdosing psilocybin for four weeks. The
                participants reported feeling more open, creative, focused, and
                productive, while also experiencing a reduction in anxiety and
                depression symptoms.`}
                  </p>
                </div>
                <div
                  style={openSauce.style}
                  className="space-y-3 text-sm lg:text-base"
                >
                  <p className="text-white drop-shadow">
                    {`Furthermore, psilocybin has been found to have a unique
                    ability to affect brain function by increasing neural
                    plasticity, or the brain's ability to adapt and change in
                    response to new experiences. This increase in plasticity has
                    been linked to the positive effects of psilocybin on mental
                    health, as it can help individuals to break out of negative
                    patterns of thought and behavior.`}
                  </p>

                  <p className="text-white drop-shadow">
                    {`In a study published in the Journal of Psychopharmacology,
                Stamets et al. (2018) found that psilocybin microdosing could
                have profound effects on mental health, stating that
                "microdosing with psilocybin may improve psychological
                well-being, increase cognitive flexibility, enhance creativity,
                and facilitate emotional regulation." They went on to note that
                these effects may be due to the modulation of the serotonin
                system, which is involved in regulating mood, anxiety, and
                cognitive function.`}
                  </p>
                </div>
              </div>
              <div className="flex w-full animate-show items-center justify-center">
                <Socials />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
