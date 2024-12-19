import Link from "next/link";
import Image from "next/image";

import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className=" fixed top-0 left-0 right-0 z-10 bg-gradient-to-r from-[#000] to-[#0A1428]">
      <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        {/* 왼쪽부분 세션 */}
        <div className="left-side flex items-center space-x-4">
          <Image
            src="/images/lol-logo.png"
            alt="리그오브레전드 로고"
            width={40}
            height={40}
          />
          <Link
            href="/"
            className="text-xl text-[#C89B3C] font-bold hover:text-yellow-300"
          >
            League of Legend
          </Link>
        </div>

        {/* 오른쪽 부분 세션 */}
        <div className="right-side hidden md:flex text-[#C89B3C] font-bold flex space-x-6">
          <Link href="/rotation" className="hover:text-yellow-300">
            챔피언 로테이션
          </Link>
          <Link href="/champions" className="hover:text-yellow-300">
            챔피언 목록
          </Link>
          <Link href="/items" className="hover:text-yellow-300">
            아이템 목록
          </Link>
          <ThemeToggle />
        </div>

        {/* 모바일 메뉴 토글 버튼 */}
        <div className="md:hidden flex items-center">
          <button className="text-[#C89B3C] font-bold hover:text-yellow-300">
            ☰
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      <div className="md:hidden bg-gradient-to-r from-[#000] to-[#0A1428] p-4 space-y-4">
        <Link
          href="/rotation"
          className="block text-[#C89B3C] font-bold hover:text-yellow-300"
        >
          챔피언 로테이션
        </Link>
        <Link
          href="/champions"
          className="block text-[#C89B3C] font-bold hover:text-yellow-300"
        >
          챔피언 목록
        </Link>
        <Link
          href="/items"
          className="block text-[#C89B3C] font-bold hover:text-yellow-300"
        >
          아이템 목록
        </Link>
      </div>
    </header>
  );
}
