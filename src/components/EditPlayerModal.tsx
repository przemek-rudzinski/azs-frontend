import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, TypeOf } from "zod";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { Player } from "../models/Player";

const updatePlayerSchema = z.object({
  name: z.string().optional(),
  number: z.number().optional(),
  isGoalkeeper: z.boolean().optional(),
});

type UpdatePlayerInput = TypeOf<typeof updatePlayerSchema>;

type EditPlayerModalProps = {
  player: Player;
  onClose: () => void;
  refetch: () => void;
};

const EditPlayerModal = ({
  player,
  onClose,
  refetch,
}: EditPlayerModalProps) => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePlayerInput>({
    resolver: zodResolver(updatePlayerSchema),
    defaultValues: {
      name: player.name,
      number: player.number,
      isGoalkeeper: player.isGoalkeeper,
    },
  });

  async function onSubmit(values: UpdatePlayerInput) {
    try {
      await axios.patch(`/player/${player.playerId}`, values, {
        withCredentials: true,
      });
      toast.success("Player updated successfully!");
      refetch();
      onClose();
    } catch (error: any) {
      toast.error(error?.message);
      setError(error?.message);
    }
  }

  async function onDelete() {
    try {
      await axios.delete(`/player/${player.playerId}`, {
        withCredentials: true,
      });
      toast.success("Player deleted successfully!");
      refetch();
      onClose();
    } catch (error: any) {
      toast.error(error?.message);
      setError(error?.message);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-gray-900 opacity-75"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-md shadow-md p-6 z-10">
        <div className="flex flex-row items-center justify-center space-x-4">
          <h2 className="text-2xl font-bold mb-4">Edit Player</h2>
          <div className="flex items-center">
            <button
              className="bg-red-200 shadow z-50 flex-none h-10 m-2 p-1 px-2 rounded-lg text-red-600 font-bold text-lg hover:bg-red-500 hover:text-white"
              onClick={() => {
                const confirmDelete = window.confirm(
                  "Are you sure you want to delete this player?"
                );
                if (confirmDelete) {
                  // Proceed with the delete operation
                  onDelete();
                }
              }}
            >
              delete
            </button>
          </div>
        </div>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block font-semibold text-gray-800">Name</label>
            <input
              type="text"
              {...register("name")}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-800">Number</label>
            <input
              type="number"
              {...register("number", {
                setValueAs: (v) => parseInt(v, 10), // Parse to a number before setting the value
              })}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
            {errors.number && (
              <p className="text-red-600 text-sm mt-1">
                {errors.number.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-800">
              Is Goalkeeper
            </label>
            <select
              {...register("isGoalkeeper", {
                setValueAs: (v) => v === "true", // Parse to a boolean before setting the value
              })}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            {errors.isGoalkeeper && (
              <p className="text-red-600 text-sm mt-1">
                {errors.isGoalkeeper.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              type="button"
              className="ml-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlayerModal;
