import WorkPlaceCard from "@/components/WorkPlaceCard";
import dayjs from "dayjs";
import Head from "next/head";
import { useReducer, useState } from "react";
import { ACTIONS } from "../../types";
import {
  computeTotalHours,
  defaultState,
  formatStateToSend,
  formReducer,
} from "../../helpers/taiTimesUtils";

const LAMBDA_URL =
  "https://zqabvhac9i.execute-api.eu-west-1.amazonaws.com/default/generateTimesheet-dev";

export default function TaiTime() {
  const [isLoading, setIsLoading] = useState(false);

  const [state, dispatch] = useReducer(formReducer, defaultState());
  const { hours, minutes } = computeTotalHours(state.days);

  const onSubmit = async () => {
    setIsLoading(true);
    const formattedData = formatStateToSend(state);

    const res = await fetch(LAMBDA_URL, {
      method: "POST",
      headers: {
        Accept: "application/pdf",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    setIsLoading(false);

    if (res.ok) {
      const json = await res.json();
      const body = JSON.parse(json.body);
      const { url } = body;

      // open the pdf in a new tab
      window.open(url, "_blank");
    } else {
      alert("Une erreur s'est produite");
    }
  };

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700">Semaine du:</label>
                <input
                  className="w-full mt-1 p-2 border rounded"
                  type="date"
                  value={state.start}
                  onChange={(e) =>
                    dispatch({
                      type: ACTIONS.SET_START_DATE,
                      payload: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700">Au:</label>
                <input
                  className="w-full mt-1 p-2 border rounded"
                  type="date"
                  value={state.end}
                  onChange={(e) =>
                    dispatch({
                      type: ACTIONS.SET_END_DATE,
                      payload: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {Object.entries(state.days).map(([day, val], _index) => (
                <WorkPlaceCard
                  key={day}
                  day={dayjs(day).format("dddd DD MMMM")}
                  hours={val.hours}
                  minutes={val.minutes}
                  place={val.project}
                  onPlaceChange={(e) =>
                    dispatch({
                      type: ACTIONS.SET_PROJECT,
                      payload: { day, project: e.target.value },
                    })
                  }
                  onHoursChange={(e) =>
                    dispatch({
                      type: ACTIONS.SET_HOURS,
                      payload: { day, hours: e.target.value },
                    })
                  }
                  onMinutesChange={(e) =>
                    dispatch({
                      type: ACTIONS.SET_MINUTES,
                      payload: { day, minutes: e.target.value },
                    })
                  }
                />
              ))}

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
                <p className="text-lg font-medium">
                  {hours} heures {minutes} minutes
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  disabled={isLoading}
                  onClick={onSubmit}
                  className={`bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 disabled:opacity-50`}
                >
                  {isLoading ? <>Chargement...</> : <>Soumettre</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
