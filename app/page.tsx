import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col mx-auto items-center h-full">
      <div className="flex items-center gap-2 py-6">
        <Image
          src={"/logo.png"}
          alt="logo track-dev-time"
          width={80}
          height={80}
        />
        <h1 className="text-4xl text-primary">Track-dev-time</h1>
      </div>
    </main>
  );
}
