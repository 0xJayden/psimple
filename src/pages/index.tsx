import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import { useEffect, useState } from "react";

import bg from "~/assets/images/bg.png";
import logo from "~/assets/images/logo.png";
import redCap from "~/assets/images/red-cap.png";
import blueCap from "~/assets/images/blue-cap.png";
import purpleCap from "~/assets/images/purple-cap.png";
import whiteMushLogo from "~/assets/images/mush-logo-white.png";
import riddle from "~/assets/images/riddle.png";
import tricolorLogo from "~/assets/images/tricolor-logo.png";
import redPill from "~/assets/images/red-pill.png";
import Socials from "~/components/Socials";

const myFont = localFont({ src: "../assets/fonts/Bugaki-Regular.ttf" });

const Home: NextPage = () => {
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHide(true);
    }, 9300);

    setTimeout(() => {
      setHide2(true);
    }, 7000);
  }, []);

  return (
    <>
      <Head>
        <title>Psimple</title>
        <meta name="description" content="pSimple Site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={myFont.style}
        className="relative flex min-h-screen flex-col items-center bg-black"
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
        <div className="animate-show">
          <div className="fixed top-0 z-10 flex w-full justify-between p-2 lg:p-5 lg:px-10">
            <Image className=" h-full max-w-[150px]" src={logo} alt="" />
            <Image className="h-full max-w-[50px]" src={whiteMushLogo} alt="" />
          </div>
          <div className="height-bg1 height-bg2 height-bg3 relative flex h-[440px] items-center justify-center overflow-hidden">
            <Image
              className="scale-2_1 scale-bg1 scale-bg2 scale-[2.5] brightness-90"
              src={bg}
              alt=""
            />
            <div className="absolute space-y-4 p-2 text-center">
              <h1 className="bg-gradient-to-b from-[rgb(255,224,112)] via-[rgb(255,249,210)] to-[rgb(255,224,112)] bg-clip-text text-4xl font-bold text-transparent drop-shadow-[0_10px_10px_rgba(0,0,0,1)] sm:text-5xl xl:text-6xl">
                A GOLDEN AGE OF WELLNESS AWAITS...
              </h1>
            </div>
            <div className="bottom-p1 absolute bottom-5 left-5 lg:left-20 xl:left-[300px]">
              <p className="bg-gradient-to-b from-[rgb(228,201,101)] via-[rgb(255,249,210)] to-[rgb(228,201,101)] bg-clip-text text-5xl text-transparent drop-shadow-[0_10px_10px_rgba(0,0,0,1)] sm:text-7xl">
                25% OFF
              </p>
            </div>
          </div>
          <div className="relative flex min-h-[725px] flex-col items-center overflow-hidden bg-gradient-to-r from-[rgb(214,189,90)] via-[rgb(248,236,187)] to-[rgb(214,189,90)] p-2 py-10 sm:min-h-[620px] md:min-h-[550px] lg:max-h-[650px] lg:py-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="scale-5_8 scale-[7.1] brightness-[80%] sm:scale-[2.4] md:scale-[1.8] lg:scale-105"
            >
              <source
                src="https://d1uc5ptgdyrytu.cloudfront.net/liquid-gold-1080.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute flex flex-col items-center p-2 text-center lg:p-10">
              <div className="relative pb-3">
                <h1 className=" absolute -top-[2px] text-2xl font-bold text-cyan-400 drop-shadow-[0_10px_10px_rgba(0,0,0,1)] sm:text-4xl">
                  Welcome to pSimple.
                </h1>
                <h1 className=" absolute top-[2px] text-2xl font-bold text-red-500 drop-shadow sm:text-4xl">
                  Welcome to pSimple.
                </h1>
                <h1 className="text-2xl font-bold text-white drop-shadow sm:text-4xl">
                  Welcome to pSimple.
                </h1>
              </div>
              <div className="relative pb-5">
                <h1 className="absolute -top-[2px] text-2xl font-bold text-cyan-400 drop-shadow-[0_10px_10px_rgba(0,0,0,1)] sm:text-4xl">
                  Making psilocybin, simple.
                </h1>
                <h1 className="absolute top-[2px] text-2xl font-bold text-red-500 drop-shadow sm:text-4xl">
                  Making psilocybin, simple.
                </h1>
                <h1 className="text-2xl font-bold text-white drop-shadow sm:text-4xl">
                  Making psilocybin, simple.
                </h1>
              </div>
              <div className="relative pb-5">
                <p className="absolute -top-[1px] text-lg font-semibold leading-5 text-cyan-400 drop-shadow-[0_10px_10px_rgba(0,0,0,1)]">
                  Empowering people to unlock their full potential through
                  subtle microdoses of organic & adaptogenic mushroom compounds.
                </p>
                <p className="absolute top-[1px] text-lg font-semibold leading-5 text-red-500 drop-shadow">
                  Empowering people to unlock their full potential through
                  subtle microdoses of organic & adaptogenic mushroom compounds.
                </p>
                <p className=" text-lg font-semibold leading-5 text-white drop-shadow">
                  Empowering people to unlock their full potential through
                  subtle microdoses of organic & adaptogenic mushroom compounds.
                </p>
              </div>
              <div className="relative">
                <p className="absolute -top-[1px] text-lg font-semibold leading-5 text-cyan-400 drop-shadow-[0_10px_10px_rgba(0,0,0,1)]">
                  Our Matrix color coding system makes finding the perfect dose,
                  pSimple!
                </p>
                <p className="absolute top-[1px] text-lg font-semibold leading-5 text-red-500 drop-shadow">
                  Our Matrix color coding system makes finding the perfect dose,
                  pSimple!
                </p>
                <p className="text-lg font-semibold leading-5 text-white drop-shadow">
                  Our Matrix color coding system makes finding the perfect dose,
                  pSimple!
                </p>
              </div>
              <div className="flex w-full justify-between px-3 py-5 md:px-20">
                <div className="relative">
                  <Image
                    className="max-w-[120px] drop-shadow-[0_10px_10px_rgba(0,0,0,1)] lg:max-w-[200px]"
                    src={blueCap}
                    alt=""
                  />
                  {/* <div className="absolute bottom-0 left-0 right-0 top-5"> */}
                  {/* <h1 className="text-4xl font-bold italic text-[rgb(106,150,200)] drop-shadow-[0_10px_10px_rgba(0,0,0,1)] sm:text-5xl">
                    Blue
                  </h1>
                  <p className="text-xl font-bold italic text-[rgb(106,150,200)] drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                    100
                  </p> */}
                  {/* </div> */}
                </div>
                <div className="relative">
                  <Image
                    className="max-w-[120px] drop-shadow-[0_10px_10px_rgba(0,0,0,1)] lg:max-w-[200px]"
                    src={redCap}
                    alt=""
                  />
                  {/* <div className="absolute bottom-0 left-0 right-0 top-5">
                  <h1 className=" text-4xl font-bold italic text-[rgb(203,75,69)] drop-shadow-[0_10px_10px_rgba(0,0,0,1)] sm:text-5xl">
                    Red
                  </h1>
                  <p className="text-xl font-bold italic text-[rgb(203,75,69)] drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                    300
                  </p>
                </div> */}
                </div>
                <div className="relative">
                  <Image
                    className="max-w-[120px] drop-shadow-[0_10px_10px_rgba(0,0,0,1)] lg:max-w-[200px]"
                    src={purpleCap}
                    alt=""
                  />
                  {/* <div className="absolute bottom-0 left-0 right-0 top-5">
                  <h1 className=" text-4xl font-bold italic text-[rgb(140,109,195)] drop-shadow-[0_10px_10px_rgba(0,0,0,1)] sm:text-5xl">
                    Purple
                  </h1>
                  <p className="text-xl font-bold italic text-[rgb(140,109,195)] drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                    500
                  </p>
                </div> */}
                </div>
              </div>
              <div className="relative pb-10">
                <p className="absolute -top-[1px] text-lg font-semibold leading-5 text-cyan-400 drop-shadow-[0_10px_10px_rgba(0,0,0,1)]">
                  Find a Golden Capsule to win huge prizes, including 25% off
                  for life!
                </p>
                <p className="absolute top-[1px] text-lg font-semibold leading-5 text-red-500 drop-shadow">
                  Find a Golden Capsule to win huge prizes, including 25% off
                  for life!
                </p>
                <p className="text-lg font-semibold leading-5 text-white drop-shadow">
                  Find a Golden Capsule to win huge prizes, including 25% off
                  for life!
                </p>
              </div>
              <div className="relative">
                <p className="absolute -top-[2px] text-4xl font-semibold text-cyan-400 drop-shadow-[0_10px_10px_rgba(0,0,0,1)]">
                  {`FIND GOLD, WIN BIG. IT'S THAT PSIMPLE.`}
                </p>
                <p className="absolute top-[2px] text-4xl font-semibold text-red-500 drop-shadow">
                  {`FIND GOLD, WIN BIG. IT'S THAT PSIMPLE.`}
                </p>
                <p className="text-4xl font-semibold text-white drop-shadow">
                  {`FIND GOLD, WIN BIG. IT'S THAT PSIMPLE.`}
                </p>
              </div>
            </div>
            <div className="absolute bottom-10 flex w-full items-center justify-center">
              <Socials />
            </div>
          </div>
          <div className="flex w-full items-center justify-center overflow-hidden bg-[rgb(133,93,238)] p-2 py-10">
            <div className="relative w-full max-w-[1250px]">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="max-w-sphere absolute -left-5 bottom-10 max-w-[300px] sm:bottom-[40px] sm:max-w-[510px] md:bottom-5 md:max-w-[700px] lg:-bottom-5 lg:left-16 lg:max-w-[850px] xl:-bottom-20 xl:max-w-[1100px]"
              >
                <source
                  src="https://d1uc5ptgdyrytu.cloudfront.net/golden-sphere-purple.mp4"
                  type="video/mp4"
                />
              </video>
              <h1 className=" bg-gradient-to-b from-[rgb(228,201,101)] via-[rgb(255,249,210)] to-[rgb(228,201,101)] bg-clip-text text-center text-4xl font-bold text-transparent drop-shadow-[0_3px_10px_rgba(150,150,0,1)] sm:text-6xl sm:drop-shadow-[0_5px_13px_rgba(150,150,0,1)]">
                THE GOLDEN AGE
              </h1>
              <div className="relative flex w-full justify-end">
                <Image
                  className="w-[80%] max-w-[600px] lg:mr-20"
                  src={riddle}
                  alt=""
                />
                {/* <div className="radial-gradient absolute right-5 h-[200px] w-[200px] rounded-full opacity-50"></div>
                <p className="w-2/3 p-5 text-center font-semibold italic text-[rgb(251,221,112)] drop-shadow">
                {`"With a shiny hue and a heart of gold, you may find me among the fold. For those who behold, riches untold. 3 of me, one unto each, a golden treat, just within reach."`}
                </p> */}
              </div>
              <p className="textLg bg-gradient-to-b from-[rgb(228,201,101)] via-[rgb(255,249,210)] to-[rgb(228,201,101)] bg-clip-text pt-10 text-center text-sm text-transparent drop-shadow-[0_0_5px_rgba(150,150,0,1)] sm:text-3xl sm:drop-shadow-[0_3px_10px_rgba(150,150,0,1)] md:text-4xl">
                25% OFF UNTIL ALL 3 ARE FOUND!
              </p>
            </div>
          </div>
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
                <div className="space-y-3 text-end text-sm lg:text-base">
                  <p className="text-white">
                    Psilocybin is a naturally occurring psychoactive compound
                    found in certain species of mushrooms. Over the years,
                    psilocybin has been widely studied for its therapeutic
                    potential, particularly in the treatment of mental health
                    disorders such as depression, anxiety, and PTSD. In recent
                    times, microdosing, or taking small amounts of psilocybin at
                    regular intervals, has gained popularity as a method of
                    enhancing mental health and cognitive function.
                  </p>

                  <p className="text-white">
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
                <div className="space-y-3 text-sm lg:text-base">
                  <p className="text-white">
                    {`Furthermore, psilocybin has been found to have a unique
                    ability to affect brain function by increasing neural
                    plasticity, or the brain's ability to adapt and change in
                    response to new experiences. This increase in plasticity has
                    been linked to the positive effects of psilocybin on mental
                    health, as it can help individuals to break out of negative
                    patterns of thought and behavior.`}
                  </p>

                  <p className="text-white">
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
              <div className="flex w-full items-center justify-center">
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
