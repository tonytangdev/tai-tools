import Head from "next/head";
import Link from "next/link";

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
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Tai Tools</h1>
        </div>

        {/* Links to tools */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href={"/tai-times"}>
              <div className="bg-white rounded shadow p-6">
                <h2 className="text-xl font-semibold mb-4">WorkTimeTracker</h2>
                <p className="text-gray-700">
                  Suivi du temps de travail sur un chantier
                </p>
              </div>
            </Link>
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-xl font-semibold mb-4">WorkTimeTracker</h2>
              <p className="text-gray-700">
                Suivi du temps de travail sur un chantier
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
