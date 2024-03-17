"use client";
import { useRouter } from "next/navigation";

export default function notFound() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-semibold text-gray-700">404</h1>
        <p className="text-gray-500 mt-4 mb-8">
          Sorry, the page you are looking for could not be found
        </p>
        <button
          className="px-4 py-2 font-semibold text-white bg-green-600 rounded hover:bg-green-800"
          onClick={() => router.push("/")}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
