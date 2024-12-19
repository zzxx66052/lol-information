import Link from "next/link";

import { FaHome } from "react-icons/fa";
import { FaRegRectangleList } from "react-icons/fa6";
import { GiChampions } from "react-icons/gi";
import { RiFileListFill } from "react-icons/ri";

export default function Nav() {
  return (
    // 홈 페이지 아래 아이콘 session
    <div className="flex space-x-4 mt-3">
      <Link href="/">
        <button className="relative group bg-[#C89B3C] text-black text-center text-sm md:text-base font-bold py-2 px-4 rounded-full transition-transform hover:scale-105">
          <FaHome size={20} />
          <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 invisible whitespace-nowrap group-hover:visible bg-black text-yellow-300 text-xs rounded py-1 px-2">
            홈
          </span>
        </button>
      </Link>

      <Link href="/champions">
        <button className="relative group bg-[#C89B3C] text-black text-center text-sm md:text-base font-bold py-2 px-4 rounded-full transition-transform hover:scale-105">
          <FaRegRectangleList size={20} />
          <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 invisible whitespace-nowrap group-hover:visible bg-black text-yellow-300 text-xs rounded py-1 px-2">
            챔피언 목록
          </span>
        </button>
      </Link>

      <Link href="/rotation">
        <button className="relative group bg-[#C89B3C] text-black text-center text-sm md:text-base font-bold py-2 px-4 rounded-full transition-transform hover:scale-105">
          <GiChampions size={20} />
          <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 invisible whitespace-nowrap group-hover:visible bg-black text-yellow-300 text-xs rounded py-1 px-2">
            챔피언 로테이션
          </span>
        </button>
      </Link>

      <Link href="/items">
        <button className="relative group bg-[#C89B3C] text-black text-sm md:text-base font-bold py-2 px-4 rounded-full transition-transform hover:scale-105">
          <RiFileListFill size={20} />
          <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 invisible whitespace-nowrap group-hover:visible bg-black text-yellow-300 text-xs rounded py-1 px-2">
            아이템 목록
          </span>
        </button>
      </Link>
    </div>
  );
}
