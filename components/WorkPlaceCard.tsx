type Props = {
  day: string;
  hours: number;
  minutes: number;
  place: string;

  onPlaceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHoursChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMinutesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const WorkPlaceCard = ({
  day,
  hours = 8,
  minutes = 0,
  place = "",

  onPlaceChange,
  onHoursChange,
  onMinutesChange,
}: Props) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">{day.toUpperCase()}</h3>

      <div className="mb-3">
        <label className="block text-gray-700">Chantier:</label>
        <input
          className="w-full mt-1 p-2 border rounded"
          type="text"
          placeholder="Nom du chantier"
          value={place}
          onChange={onPlaceChange}
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
            value={String(hours)}
            onChange={onHoursChange}
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
            value={String(minutes)}
            onChange={onMinutesChange}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkPlaceCard;
