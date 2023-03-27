import { AppItem } from "@/components/AppItem";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tai Tools</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-100 min-h-screen">
        {/* App's title */}
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <Image
            src={"/images/tai-tools-icon.png"}
            alt={"tools logo"}
            width={52}
            height={52}
          />
          <h1 className="text-3xl font-bold text-center">Tai Tools</h1>
        </div>

        {/* Links to tools */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AppItem
              title={"Tai Time"}
              description={"Suivi du temps de travail dans la semaine"}
              href={"/tai-times"}
              image={"/images/tai-time-icon.png"}
              alt={"clock logo"}
            />
          </div>
        </div>
      </main>
    </>
  );
}
