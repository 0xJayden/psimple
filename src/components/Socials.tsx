import Image from "next/image";

import Twitterpng from "~/assets/images/Twitterpng.png";
import IGpng from "~/assets/images/IGpng.png";
import Telegram from "~/assets/images/Telegram.png";

export default function Socials() {
  return (
    <div className="flex space-x-4">
      <a href="https://twitter.com/psimplemind">
        <Image className="w-[50px]" src={Twitterpng} alt="" />
      </a>
      <a href="https://instagram.com/psimplemind">
        <Image className="w-[50px]" src={IGpng} alt="" />
      </a>
      <a href="https://t.me/+24A411tyfutkZTAx">
        <Image className="w-[50px]" src={Telegram} alt="" />
      </a>
    </div>
  );
}
