import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

import { myFont } from ".";

export default function Success() {
  return (
    <div
      style={myFont.style}
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-yellow-400 to-yellow-300"
    >
      <div className="flex h-[400px] w-[95%] animate-popUp flex-col items-center justify-center rounded-lg bg-white/50 p-2">
        <CheckCircleIcon className="h-[120px] w-[120px] text-green-500" />
        <p className="pb-2 pt-5 text-center text-3xl">Order Success!</p>
        <p className="text-center">Check your email for confirmation</p>
        <p className="text-center">Thank you and mush love</p>
        <Link href={"/"} className="mt-10 rounded-full bg-yellow-300 p-2 px-4">
          <p>Back</p>
        </Link>
      </div>
    </div>
  );
}
