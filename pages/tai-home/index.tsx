// pages/HousingForm.tsx
import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';

interface Person {
    firstName: string;
    lastName: string;
    gender: string;
    birthdate: string;
}

const HousingForm: React.FC = () => {
    const [address, setAddress] = useState<string>('');
    const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
    const [monthlyPrice, setMonthlyPrice] = useState<number>(0);
    const [charges, setCharges] = useState<number>(0);
    const [numberOfKeys, setNumberOfKeys] = useState<number>(0);
    const [date, setDate] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [people, setPeople] = useState<Person[]>([
        {
            firstName: '',
            lastName: '',
            gender: '',
            birthdate: '',
        },
    ]);

    const addPerson = () => {
        setPeople([...people, { firstName: '', lastName: '', gender: '', birthdate: '' }]);
    };

    const removePerson = (index: number) => {
        setPeople(people.filter((_, i) => i !== index));
    };

    const updatePerson = (index: number, field: keyof Person, value: string) => {
        const newPeople = [...people];
        newPeople[index][field] = value;
        setPeople(newPeople);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your form submit logic here
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
                            <label htmlFor="address" className="block text-gray-700">Address:</label>
                            <input
                                id="address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full mt-1 p-2 border rounded"
                            />
                        </div>

                        {/* Number of people */}
                        <div className='mb-3'>
                            <label htmlFor="numberOfPeople" className="block text-gray-700">Number of people:</label>
                            <input
                                id="numberOfPeople"
                                type="number"
                                value={numberOfPeople}
                                onChange={(e) => setNumberOfPeople(+e.target.value)}
                                className="w-full mt-1 p-2 border rounded"
                            />
                        </div>

                        {/* Monthly price */}
                        <div className='mb-3'>
                            <label htmlFor="monthlyPrice" className="block text-gray-700">Monthly price (€):</label>
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
                            <label htmlFor="numberOfKeys" className="block text-gray-700">Number of keys:</label>
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
                            <label htmlFor="date" className="block text-gray-700">Date (DD/MM):</label>
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
                            <label htmlFor="startDate" className="block text-gray-700">Start date:</label>
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
                            <label htmlFor="endDate" className="block text-gray-700">End date:</label>
                            <input
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full mt-1 p-2 border rounded"
                            />
                        </div>

                        {/* People */}
                        {people.map((person, index) => (
                            <div key={index} className="space-y-2">
                                <h2 className="text-lg font-semibold mb-2">Person {index + 1}</h2>
                                {/* Firstname */}
                                <div className='mb-3'>
                                    <label htmlFor={`firstname-${index}`} className="block text-gray-700">Firstname:</label>
                                    <input
                                        // id={firstname - ${index}}
                                        type="text"
                                        value={person.firstName}
                                        onChange={(e) => updatePerson(index, 'firstName', e.target.value)}
                                        className="w-full mt-1 p-2 border rounded"
                                    />
                                </div>
                                {/* Lastname */}
                                <div className='mb-3'>
                                    <label htmlFor={`lastname-${index}`} className="block text-gray-700">Lastname:</label>
                                    <input
                                        id={`lastname-${index}`}
                                        type="text"
                                        value={person.lastName}
                                        onChange={(e) => updatePerson(index, 'lastName', e.target.value)}
                                        className="w-full mt-1 p-2 border rounded"
                                    />
                                </div>

                                {/* Gender */}
                                <div className='mb-3'>
                                    <label htmlFor={`gender-${index}`} className="block text-gray-700">Gender:</label>
                                    <select
                                        id={`gender-${index}`}
                                        value={person.gender}
                                        onChange={(e) => updatePerson(index, 'gender', e.target.value)}
                                        className="w-full mt-1 p-2 border rounded"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Birthdate */}
                                <div className='mb-3'>
                                    <label htmlFor={`birthdate-${index}`} className="block text-gray-700">Birthdate:</label>
                                    <input
                                        id={`birthdate-${index}`}
                                        type="date"
                                        value={person.birthdate}
                                        onChange={(e) => updatePerson(index, 'birthdate', e.target.value)}
                                        className="w-full mt-1 p-2 border rounded"
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="mt-6 flex justify-end">
                            <button
                                // disabled={isLoading}
                                // onClick={onSubmit}
                                className={`bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 disabled:opacity-50`}
                            >
                                Soumettre
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default HousingForm;
