import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white fixed top-0 left-0 right-0 z-10 shadow-lg">
      <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="left-side flex items-center space-x-4">
          <Image
            src="/images/lol-logo.png"
            alt="리그오브레전드 로고"
            width={40}
            height={40}
          />
          <Link href="/" className="text-xl font-bold hover:text-yellow-300">
            홈
          </Link>
        </div>

        <div className="right-side font-bold flex space-x-6">
          <Link href="/rotation" className="hover:text-yellow-300">
            챔피언 로테이션
          </Link>
          <Link href="/champions" className="hover:text-yellow-300">
            챔피언 목록
          </Link>
          <Link href="/items" className="hover:text-yellow-300">
            아이템 목록
          </Link>
        </div>
      </nav>
    </header>
  );
}
