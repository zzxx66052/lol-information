"useClient";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[500px] overflow-hidden mt-[8px]">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/video/cinematic.webm"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
        <p className="hidden md:block mb-3 text-yellow-300 font-bold">
          리그 오브 레전드에서 당신의 실력을 증명하세요.
        </p>
        <Link
          href="https://www.leagueoflegends.com/ko-kr/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-yellow-300 text-black text-sm md:text-base font-bold py-2 px-4 rounded-full transition-transform hover:scale-105"
        >
          무료로 플레이하기
        </Link>
      </div>
    </section>
  );
}
