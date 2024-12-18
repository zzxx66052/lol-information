"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled Error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex items-center justify-center h-screen bg-red-50">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-500">에러 발생!</h1>
            <p className="text-lg text-red-700 mt-4">{error.message}</p>
            <button
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => reset()}
            >
              재시도
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
