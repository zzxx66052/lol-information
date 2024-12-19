프로젝트 이름
리그 오브 레전드 데이터 대시보드

설명
이 프로젝트는 리그 오브 레전드(LoL) 게임의 정보를 제공하는 웹 애플리케이션입니다. 무료 챔피언 로테이션, 아이템 정보, 챔피언 상세 정보 등을 시각적으로 확인할 수 있도록 설계되었습니다.


📂 프로젝트 구조
주요 디렉터리 및 역할
📦src
 ┣ 📂app         # Next.js의 App Router 구조. 페이지별 라우팅 관리
 ┣ 📂components  # 재사용 가능한 UI 컴포넌트 모음
 ┣ 📂styles      # 글로벌 스타일 및 Tailwind CSS 설정
 ┣ 📂types       # 타입스크립트 타입 정의 파일
 ┣ 📂utils       # API 호출 및 유틸리티 함수

📂상세 구조

📂 app

api/rotation/route.ts: 무료 챔피언 로테이션 데이터를 제공하는 API 엔드포인트.
champions/: 챔피언 목록과 상세 페이지 관련 라우팅.
items/: 아이템 목록과 상세 페이지 관련 라우팅.
rotation/page.tsx: 무료 챔피언 로테이션 페이지.
global-error.tsx: 애플리케이션 전역 에러 처리 컴포넌트.
layout.tsx: 공통 레이아웃 설정.
page.tsx: 홈 페이지.
📂 components

champions/Card.tsx: 챔피언 정보를 시각적으로 표시하는 카드 컴포넌트.
error/: 에러와 로딩 상태를 처리하는 컴포넌트.
ErrorBoundary.tsx: 에러 경계 처리.
Loading.tsx: 로딩 화면 표시.
layout/: 레이아웃 관련 컴포넌트.
Header.tsx: 헤더.
Footer.tsx: 푸터.
ThemeToggle.tsx: 다크/라이트 테마 전환 토글 버튼.
ui/home/: 홈 화면의 히어로 섹션과 네비게이션.
📂 styles

globals.css: Tailwind CSS와 글로벌 스타일 설정.
📂 types

Champion.ts: 챔피언 관련 타입 정의.
ChampionRotation.ts: 챔피언 로테이션 타입 정의.
Item.ts: 아이템 데이터 타입 정의.
📂 utils

riotApi.ts: 리그 오브 레전드 API와 상호작용하는 함수.
serverApi.ts: 서버 데이터 가져오기 유틸리티 함수.

🛠 주요 기능
홈 페이지

간단한 소개 및 네비게이션 제공.
무료 챔피언 로테이션

로테이션 중인 무료 챔피언 정보를 표시.
챔피언 상세 정보

개별 챔피언의 능력치 및 스킬 정보 확인.
아이템 정보

게임 내 아이템의 상세 정보 제공.
다크/라이트 모드

테마 전환 가능.
🔧 기술 스택
프레임워크: Next.js
스타일링: Tailwind CSS
데이터 페칭: React Query
언어: TypeScript
API: Riot Games API
