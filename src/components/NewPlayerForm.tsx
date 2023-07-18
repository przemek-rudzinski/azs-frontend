import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, number, boolean, TypeOf } from "zod";
import axios from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const newPlayerSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  number: z
    .number()
    .refine((n) => !isNaN(n), { message: "Number is required" }),
  isGoalkeeper: z.boolean().refine((b) => typeof b === "boolean", {
    message: "isGoalkeeper is required",
  }),
});

type NewPlayerInput = TypeOf<typeof newPlayerSchema>;

const NewPlayerForm = ({ refetch }: { refetch: () => void }) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPlayerInput>({
    resolver: zodResolver(newPlayerSchema),
  });

  async function onSubmit(values: NewPlayerInput) {
    try {
      await axios.post(`/player`, values, {
        withCredentials: true,
      });
      toast.success("Player created successfully!");
      refetch();
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
            Fill required fields to create a new player
          </h1>
          <p>{error}</p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Please enter name"
                {...register("name")}
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.name?.message && (
                <p className="text-xs text-red-600">
                  Name error: {errors.name?.message}
                </p>
              )}
            </div>
            <div className="mb-2">
              <label
                htmlFor="number"
                className="block text-sm font-semibold text-gray-800"
              >
                Number
              </label>
              <input
                type="number"
                id="number"
                placeholder="Please enter number"
                {...register("number", {
                  setValueAs: (v) => parseInt(v, 10), // Parse to a number before setting the value
                })}
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.number?.message && (
                <p className="text-xs text-red-600">
                  Number error: {errors.number?.message}
                </p>
              )}
            </div>
            <div className="mb-2">
              <label
                htmlFor="isGoalkeeper"
                className="block text-sm font-semibold text-gray-800"
              >
                Is Goalkeeper
              </label>
              <select
                id="isGoalkeeper"
                {...register("isGoalkeeper", {
                  setValueAs: (v) => v === "true", // Parse to a boolean before setting the value
                })}
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

              {errors.isGoalkeeper?.message && (
                <p className="text-xs text-red-600">
                  Is Goalkeeper error: {errors.isGoalkeeper?.message}
                </p>
              )}
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                Create new Player
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewPlayerForm;
