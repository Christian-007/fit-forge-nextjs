import Image from "next/image";
import { Button } from "./login/components/buton";

export default function Home() {
  return (
    <main className="flex pt-14 min-h-screen flex-col items-center bg-[#152119]">
      <Image
        src="/landing-page-illustration.png"
        alt="Picture of someone explaining something"
        width={300}
        height={200}
      />
      <div className="px-4">
        <h1 className="text-[28px] font-bold text-center">Organize your life, one task at a time</h1>
        <p className="text-center">Fit Forge helps you manage your daily tasks, earn rewards, and stay productive. Sign up or log in to get started!</p>
        <button
          className="mt-24 w-full rounded-full p-4 bg-[#38E078] hover:opacity-70 text-[#122117] text-[16px] font-bold"
        >
          Sign up now!
        </button>
        <button
          className="mt-2 w-full rounded-full p-4 bg-[#29382E] hover:opacity-70 text-[16px] font-bold"
        >
          Login
        </button>
      </div>
    </main>
  );
}
