import React, { useReducer, useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { defaultState, formatTaiHomeData, HOUSES, taiHomeFormReducer } from '@/helpers/taiHomeUtils';
import { Address, TAI_HOME_ACTIONS } from '@/types';
import dayjs from 'dayjs';

interface Person {
    firstName: string;
    lastName: string;
    gender: string;
    birthdate: string;
}

const HousingForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);


    const [address, setAddress] = useState<keyof typeof HOUSES | "">("");
    const [monthlyPrice, setMonthlyPrice] = useState<number>(0);
    const [charges, setCharges] = useState<number>(0);
    const [numberOfKeys, setNumberOfKeys] = useState<number>(2);
    const [date, setDate] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const [people, dispatch] = useReducer(taiHomeFormReducer, defaultState)

    const handleSubmit = async () => {
        setIsLoading(true);
        if (!address) {
            alert('Veuillez renseigner une adresse');
            return;
        }

        const formattedData = formatTaiHomeData(
            address,
            monthlyPrice,
            charges,
            numberOfKeys,
            date,
            dayjs(startDate, 'YYYY-MM-DD').toDate(),
            dayjs(endDate, 'YYYY-MM-DD').toDate(),
            people.people
        );

        const res = await fetch("/api/housing-contracts", {
            method: "POST",
            headers: {
                Accept: "application/pdf",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedData),
        });

        // Download the pdf from res.body
        const blob = await res.blob();

        // open the pdf in a new tab
        window.open(URL.createObjectURL(blob), "_blank");
        setIsLoading(false);
    };

    return (
        <>
            <Head>
                <title>Tai Home</title>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/tai-time-favicon.ico" />
            </Head>
            <Navbar />
            <main className="bg-gray-100 min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6 text-center">Tai Home</h1>
                    <div className="bg-white rounded shadow p-6">
                        {/* Address */}
                        <div className='mb-3'>
                            <label htmlFor="address" className="block text-gray-700">Adresse:</label>
                            <select id="address" name="input-select" onChange={
                                (e) => setAddress(e.target.value as keyof typeof HOUSES)
                            }
                                className="w-full mt-1 p-2 border rounded"
                                value={address} >
                                <option value="">Choisissez une adresse</option>
                                {Object.entries(HOUSES).map(([id, house]) => (
                                    <option key={id} value={id}>{house}</option>
                                ))}
                            </select>

                        </div>

                        {/* Number of people */}
                        <div className='mb-3'>
                            <label htmlFor="numberOfPeople" className="block text-gray-700">Nombre de personnes:</label>
                            <input
                                id="numberOfPeople"
                                type="number"
                                value={people.people.length}
                                onChange={(e) => dispatch(
                                    {
                                        type: TAI_HOME_ACTIONS.SET_NUMBER_OF_PEOPLE,
                                        payload: +e.target.value
                                    }
                                )}
                                className="w-full mt-1 p-2 border rounded"
                            />
                        </div>

                        {/* Monthly price */}
                        <div className='mb-3'>
                            <label htmlFor="monthlyPrice" className="block text-gray-700">Loyer mensuel (€):</label>
                            <input
                                id="monthlyPrice"
                                type="number"
                                value={monthlyPrice}
                                onChange={(e) => setMonthlyPrice(+e.target.value)}
                                className="w-full mt-1 p-2 border rounded"
                            />
                        </div>

                        {/* Charges */}
                        <div className='mb-3'>
                            <label htmlFor="charges" className="block text-gray-700">Charges (€):</label>
                            <input
                                id="charges"
                                type="number"
                                value={charges}
                                onChange={(e) => setCharges(+e.target.value)}
                                className="w-full mt-1 p-2 border rounded"
                            />
                        </div>

                        {/* Number of keys */}
                        <div className='mb-3'>
                            <label htmlFor="numberOfKeys" className="block text-gray-700">Nombre de clés:</label>
                            <input
                                id="numberOfKeys"
                                type="number"
                                value={numberOfKeys}
                                onChange={(e) => setNumberOfKeys(+e.target.value)}
                                className="w-full mt-1 p-2 border rounded"
                            />
                        </div>

                        {/* Date */}
                        <div className='mb-3'>
                            <label htmlFor="date" className="block text-gray-700">Le loyer sera révisé chaque année le (DD/MM):</label>
                            <input
                                id="date"
                                type="text"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full mt-1 p-2 border rounded"
                            />
                        </div>

                        {/* Start date */}
                        <div className='mb-3'>
                            <label htmlFor="startDate" className="block text-gray-700">Le contrat prendra effet le:</label>
                            <input
                                id="startDate"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full mt-1 p-2 border rounded"
                            />
                        </div>

                        {/* End date */}
                        <div className='mb-3'>
                            <label htmlFor="endDate" className="block text-gray-700">Pour se finir le:</label>
                            <input
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full mt-1 p-2 border rounded"
                            />
                        </div>

                        {/* People */}
                        {people.people.map((person, index) => (
                            <div key={index} className="space-y-2 mb-3">
                                <h2 className="text-lg font-semibold mb-2">Personne {index + 1}</h2>
                                {/* Firstname */}
                                <div className='mb-3'>
                                    <label htmlFor={`firstname-${index}`} className="block text-gray-700">Prénom:</label>
                                    <input
                                        // id={firstname - ${index}}
                                        type="text"
                                        value={person.firstname}
                                        onChange={(e) => dispatch(
                                            {
                                                type: TAI_HOME_ACTIONS.SET_FIRSTNAME,
                                                payload: {
                                                    index,
                                                    firstname: e.target.value
                                                }
                                            }

                                        )}
                                        className="w-full mt-1 p-2 border rounded"
                                    />
                                </div>
                                {/* Lastname */}
                                <div className='mb-3'>
                                    <label htmlFor={`lastname-${index}`} className="block text-gray-700">Nom:</label>
                                    <input
                                        id={`lastname-${index}`}
                                        type="text"
                                        value={person.lastname}
                                        onChange={(e) => dispatch(
                                            {
                                                type: TAI_HOME_ACTIONS.SET_LASTNAME,
                                                payload: {
                                                    index,
                                                    lastname: e.target.value
                                                }
                                            }
                                        )}
                                        className="w-full mt-1 p-2 border rounded"
                                    />
                                </div>

                                {/* Gender */}
                                <div className='mb-3'>
                                    <label htmlFor={`gender-${index}`} className="block text-gray-700">Genre:</label>
                                    <select
                                        id={`gender-${index}`}
                                        value={person.gender}
                                        onChange={(e) => dispatch(
                                            {
                                                type: TAI_HOME_ACTIONS.SET_GENDER,
                                                payload: {
                                                    index,
                                                    gender: e.target.value
                                                }
                                            }
                                        )}
                                        className="w-full mt-1 p-2 border rounded"
                                    >
                                        <option value="male">Homme</option>
                                        <option value="female">Femme</option>
                                    </select>
                                </div>

                                {/* Birthdate */}
                                <div className='mb-3'>
                                    <label htmlFor={`birthdate-${index}`} className="block text-gray-700">Date de naissance:</label>
                                    <input
                                        id={`birthdate-${index}`}
                                        type="date"
                                        value={dayjs(person.birthdate).format('YYYY-MM-DD')}
                                        onChange={(e) => dispatch(
                                            {
                                                type: TAI_HOME_ACTIONS.SET_BIRTHDATE,
                                                payload: {
                                                    index,
                                                    birthdate: dayjs(e.target.value, 'YYYY-MM-DD').toDate()
                                                }
                                            }
                                        )}
                                        className="w-full mt-1 p-2 border rounded"
                                    />
                                </div>

                                {/* Birthplace */}
                                <div className='mb-3'>
                                    <label htmlFor={`birthplace-${index}`} className="block text-gray-700">Lieu de naissance:</label>
                                    <input
                                        id={`birthplace-${index}`}
                                        type="text"
                                        value={person.birthplace}
                                        onChange={(e) => dispatch(
                                            {
                                                type: TAI_HOME_ACTIONS.SET_BIRTHPLACE,
                                                payload: {
                                                    index,
                                                    birthplace: e.target.value
                                                }
                                            }
                                        )}
                                        className="w-full mt-1 p-2 border rounded"
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="mt-6 flex justify-end">
                            <button
                                disabled={isLoading}
                                onClick={handleSubmit}
                                className={`bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 disabled:opacity-50`}
                            >
                                {isLoading ? <>Chargement...</> : <>Soumettre</>}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default HousingForm;
