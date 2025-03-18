import { FaMapMarkerAlt } from "react-icons/fa";

type Props = {
  key: string;
  space: Space;
};

export default function SpaceCard({ key, space }: Props) {

  return (
    <div
      className="cursor-pointer w-64 h-80 p-4 rounded-2xl overflow-hidden shadow-md border border-stone-400
       bg-stone-50 transition-transform transform duration-300 hover:scale-[102%] hover:shadow-lg"
      key={key}
    >
      <img
        src={space.photo_url}
        alt={space.name}
        className="w-full h-44 object-cover rounded-xl"
      />

      <div className="flex flex-col h-full mt-3">
        <p className="text-xl font-semibold text-gray-800 truncate">
          {space.name}
        </p>

        <div className="flex items-center mt-2">
          <FaMapMarkerAlt className="text-gray-600 mr-2 ml-[-2px]" />
          <p className="text-sm text-gray-600 truncate">{space.locate}</p>
        </div>

        <div className="mt-3 flex items-center">
          <span
            className={`w-3 h-3 rounded-full ${space.is_available ? "bg-green-500" : "bg-red-500"
              }`}
          ></span>
          <p className="text-sm ml-2 text-gray-600">
            {space.is_available ? "Disponível" : "Indisponível"}
          </p>
        </div>

      </div>
    </div>
  );
}