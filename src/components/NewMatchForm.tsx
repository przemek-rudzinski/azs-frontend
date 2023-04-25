import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, number, TypeOf } from "zod";
import axios from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const newMatchSchema = object({
  guestTeam: string().min(1, { message: "Guest team is required" }),
  homeTeam: string().min(1, { message: "Home team is required" }),
  description: string().optional(),
  place: string().optional(),
  date: string().optional(),
});

type NewMatchInput = TypeOf<typeof newMatchSchema>;

const NewMatchForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewMatchInput>({
    resolver: zodResolver(newMatchSchema),
  });

  async function onSubmit(values: NewMatchInput) {
    try {
      await axios.post(`/match`, values, {
        withCredentials: true,
      });
      toast.success("Match created successfully!");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.message);
      setError(error?.message);
    }
  }

  return (
    <section className="py-6">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-3xl flex flex-row border border-green-200/50">
        <div className="w-full p-6 m-auto flex flex-col justify-center">
          <h1 className="text-green-600 text-2xl font-bold">
            Fill required field to start new match
          </h1>
          <p>{error}</p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="mb-2">
              <label
                htmlFor="homeTeam"
                className="block text-sm font-semibold text-gray-800"
              >
                Home Team
              </label>
              <input
                type="homeTeam"
                id="homeTeam"
                placeholder="please enter home team"
                {...register("homeTeam")}
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.homeTeam?.message && (
                <a href="#" className="text-xs text-red-600 hover:underline">
                  homeTeam error: {errors.homeTeam?.message}
                </a>
              )}
              <br />
            </div>
            <div className="mb-2">
              <label
                htmlFor="guestTeam"
                className="block text-sm font-semibold text-gray-800"
              >
                Guest Team
              </label>
              <input
                id="guestTeam"
                type="guestTeam"
                placeholder="please enter guest team"
                {...register("guestTeam")}
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="place"
                className="block text-sm font-semibold text-gray-800"
              >
                Place
              </label>
              <input
                type="text"
                id="place"
                placeholder="Please enter place"
                {...register("place")}
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="date"
                className="block text-sm font-semibold text-gray-800"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                placeholder="Please select date"
                {...register("date")}
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-800"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Please enter description"
                {...register("description")}
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                Create new Match
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewMatchForm;
