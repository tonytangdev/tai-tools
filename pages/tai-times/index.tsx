import Head from "next/head";

export default function TaiTime() {
  return (
    <>
      <Head>
        <title>Tai Time</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/tai-time-favicon.ico" />
      </Head>
      <main className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Tai Time</h1>

          <div className="bg-white rounded shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700">Semaine du:</label>
                <input className="w-full mt-1 p-2 border rounded" type="date" />
              </div>
              <div>
                <label className="block text-gray-700">Au:</label>
                <input className="w-full mt-1 p-2 border rounded" type="date" />
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Suivi quotidien</h2>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-100 p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-2">Lundi</h3>

                <div className="mb-3">
                  <label className="block text-gray-700">Chantier:</label>
                  <input
                    className="w-full mt-1 p-2 border rounded"
                    type="text"
                    placeholder="Nom du chantier"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-700">Heures:</label>
                    <input
                      className="w-full mt-1 p-2 border rounded"
                      type="number"
                      min="0"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Minutes:</label>
                    <input
                      className="w-full mt-1 p-2 border rounded"
                      type="number"
                      min="0"
                      max="59"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
                  onClick="addNewProject()"
                >
                  Ajouter un chantier
                </button>
              </div>

              <div id="newProjectSection" className="hidden mt-6">
                <h2 className="text-xl font-semibold mb-4">Nouveau chantier</h2>

                <div className="mb-3">
                  <label className="block text-gray-700">
                    Nom du chantier:
                  </label>
                  <input
                    className="w-full mt-1 p-2 border rounded"
                    type="text"
                    placeholder="Nom du chantier"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">
                  Total des heures travaillées
                </h2>
                <p className="text-lg font-medium">XX heures YY minutes</p>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
                  Soumettre
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
