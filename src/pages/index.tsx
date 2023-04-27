import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { api } from "~/utils/api";
import bg from "~/assets/images/bg.png";
import logo from "~/assets/images/logo.png";
import red from "~/assets/images/red.png";
import blue from "~/assets/images/blue.png";
import purple from "~/assets/images/purple.png";
import redCap from "~/assets/images/red-cap.png";
import blueCap from "~/assets/images/blue-cap.png";
import purpleCap from "~/assets/images/purple-cap.png";
import whiteMushLogo from "~/assets/images/mush-logo-white.png";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Psimple</title>
        <meta name="description" content="Psimple Site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        <div className="fixed top-0 z-10 flex w-full justify-between p-2">
          <Image className=" h-full max-w-[150px]" src={logo} alt="" />
          <Image className="h-full max-w-[50px]" src={whiteMushLogo} alt="" />
        </div>
        <div className="relative flex h-[440px] items-center justify-center overflow-hidden">
          <Image className="scale-[2.3] brightness-90" src={bg} alt="" />
          <div className="absolute space-y-4 text-center">
            <h1 className="text-4xl font-bold text-white drop-shadow sm:text-5xl">
              A GOLDEN AGE OF WELLNESS AWAITS...
            </h1>
          </div>
        </div>
        <div className="relative flex min-h-[700px] flex-col items-center overflow-hidden bg-gradient-to-r from-[rgb(214,189,90)] via-[rgb(248,236,187)] to-[rgb(214,189,90)] p-2 py-10">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="scale-[6] brightness-[80%] lg:-bottom-[20px] lg:left-[80px] lg:ml-0 lg:max-w-[412px] xl:left-[208px]"
          >
            <source
              src="https://d1uc5ptgdyrytu.cloudfront.net/liquid-gold.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute flex flex-col items-center p-2 text-center">
            <div className="relative">
              <h1 className=" absolute -top-[2px] text-4xl font-bold text-cyan-400 drop-shadow-[0_10px_10px_rgba(0,0,0,1)] sm:text-5xl">
                Welcome to pSimple.
              </h1>
              <h1 className=" absolute top-[2px] text-4xl font-bold text-red-500 drop-shadow sm:text-5xl">
                Welcome to pSimple.
              </h1>
              <h1 className="text-4xl font-bold text-white drop-shadow sm:text-5xl">
                Welcome to pSimple.
              </h1>
            </div>
            <div className="relative pb-5">
              <h1 className="absolute -top-[2px] text-4xl font-bold text-cyan-400 drop-shadow-[0_10px_10px_rgba(0,0,0,1)] sm:text-5xl">
                Making psilocybin, simple.
              </h1>
              <h1 className="absolute top-[2px] text-4xl font-bold text-red-500 drop-shadow sm:text-5xl">
                Making psilocybin, simple.
              </h1>
              <h1 className="text-4xl font-bold text-white drop-shadow sm:text-5xl">
                Making psilocybin, simple.
              </h1>
            </div>
            <div className="relative pb-3">
              <p className="absolute -top-[1px] text-lg font-semibold leading-5 text-cyan-400 drop-shadow-[0_10px_10px_rgba(0,0,0,1)]">
                Empowering people to unlock their full potential through subtle
                microdoses of organic & adaptogenic mushroom compounds.
              </p>
              <p className="absolute top-[1px] text-lg font-semibold leading-5 text-red-500 drop-shadow">
                Empowering people to unlock their full potential through subtle
                microdoses of organic & adaptogenic mushroom compounds.
              </p>
              <p className=" text-lg font-semibold leading-5 text-white drop-shadow">
                Empowering people to unlock their full potential through subtle
                microdoses of organic & adaptogenic mushroom compounds.
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
            <div className="flex justify-between pb-5 pt-10">
              <div className="relative">
                <Image
                  className="max-w-[110px] drop-shadow"
                  src={blueCap}
                  alt=""
                />
                <div className="absolute bottom-0 left-0 right-0 top-5">
                  <h1 className="text-4xl font-bold italic text-[rgb(106,150,200)] drop-shadow-[0_10px_10px_rgba(0,0,0,1)] sm:text-5xl">
                    Blue
                  </h1>
                  <p className="text-xl font-bold italic text-[rgb(106,150,200)] drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                    100
                  </p>
                </div>
              </div>
              <div className="relative">
                <Image
                  className="max-w-[110px] drop-shadow"
                  src={redCap}
                  alt=""
                />
                <div className="absolute bottom-0 left-0 right-0 top-5">
                  <h1 className=" text-4xl font-bold italic text-[rgb(203,75,69)] drop-shadow-[0_10px_10px_rgba(0,0,0,1)] sm:text-5xl">
                    Red
                  </h1>
                  <p className="text-xl font-bold italic text-[rgb(203,75,69)] drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                    300
                  </p>
                </div>
              </div>
              <div className="relative">
                <Image
                  className="max-w-[110px] drop-shadow"
                  src={purpleCap}
                  alt=""
                />
                <div className="absolute bottom-0 left-0 right-0 top-5">
                  <h1 className=" text-4xl font-bold italic text-[rgb(140,109,195)] drop-shadow-[0_10px_10px_rgba(0,0,0,1)] sm:text-5xl">
                    Purple
                  </h1>
                  <p className="text-xl font-bold italic text-[rgb(140,109,195)] drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                    500
                  </p>
                </div>
              </div>
            </div>
            <div className="relative pb-10">
              <p className="absolute -top-[1px] text-lg font-semibold leading-5 text-cyan-400 drop-shadow-[0_10px_10px_rgba(0,0,0,1)]">
                Find a Golden Capsule to win huge prizes, including 25% off for
                life!
              </p>
              <p className="absolute top-[1px] text-lg font-semibold leading-5 text-red-500 drop-shadow">
                Find a Golden Capsule to win huge prizes, including 25% off for
                life!
              </p>
              <p className="text-lg font-semibold leading-5 text-white drop-shadow">
                Find a Golden Capsule to win huge prizes, including 25% off for
                life!
              </p>
            </div>
            <div className="relative">
              <p className="absolute -top-[2px] text-4xl font-semibold text-cyan-400 drop-shadow-[0_10px_10px_rgba(0,0,0,1)]">
                FIND GOLD, WIN BIG. IT'S THAT PSIMPLE.
              </p>
              <p className="absolute top-[2px] text-4xl font-semibold text-red-500 drop-shadow">
                FIND GOLD, WIN BIG. IT'S THAT PSIMPLE.
              </p>
              <p className="text-4xl font-semibold text-white drop-shadow">
                FIND GOLD, WIN BIG. IT'S THAT PSIMPLE.
              </p>
            </div>
          </div>
          {/* <h1 className="py-10 text-center text-3xl font-bold">
            3 GOLDEN CAPS HIDDEN, FIND ONE TO WIN HUGE PRIZES INCLUDING 25% OFF
            FOR LIFE!
          </h1>
          <div className=" h-[2px] w-[50px] rounded-full bg-[rgb(180,158,74)]"></div>
          <div className="space-y-5 pt-10">
            <div className="flex h-[200px] items-center overflow-hidden shadow-lg">
              <Image src={red} alt="" />
            </div>
            <div className="flex h-[200px] items-center overflow-hidden shadow-lg">
              <Image src={purple} alt="" />
            </div>
            <div className="flex h-[200px] items-center overflow-hidden shadow-lg">
              <Image src={blue} alt="" />
            </div>
          </div>
          <h1 className="py-10 pb-5 text-center text-3xl font-bold">
            PSILOCYBIN MADE SIMPLE.
          </h1>
          <div className="h-[2px] w-[50px] rounded-full bg-[rgb(180,158,74)]"></div>
          <p className="pt-5 text-center font-semibold italic">
            Empowering people to unlock their full potential through subtle
            microdoses of organic & adaptogenic mushroom compounds.
          </p> */}
        </div>
        <div className="relative w-full overflow-hidden bg-[rgb(31,25,44)] p-2">
          <h1 className="text-center text-4xl font-bold text-[rgb(251,221,112)]">
            THE GOLDEN AGE
          </h1>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute -left-20 bottom-12 max-w-[300px] mix-blend-screen"
          >
            <source
              src="https://d1uc5ptgdyrytu.cloudfront.net/golden-sphere.mp4"
              type="video/mp4"
            />
          </video>
          <div className="relative flex w-full justify-end">
            <div className="radial-gradient absolute right-5 h-[200px] w-[200px] rounded-full opacity-50"></div>
            <p className="w-2/3 p-5 text-center font-semibold italic text-[rgb(251,221,112)] drop-shadow">
              {`"With a shiny hue and a heart of gold, you may find me among the fold. For those who behold, riches untold. 3 of me, one unto each, a golden treat, just within reach."`}
            </p>
          </div>
        </div>
        {/* <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div> */}
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
