import { useEffect } from "react";
import { io } from "socket.io-client";
import { JobProgress } from "../../models/simultation";

const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000");

/**
 * Custom hook to subscribe to job progress updates via WebSocket.
 * @param jobId The ID of the job to subscribe to updates for.
 * @param onUpdate Callback function to handle job updates.
 */
export function useJobProgress(
  jobId: string | null,
  onUpdate: (update: JobProgress) => void,
) {
  useEffect(() => {
    if (!jobId) return;
    socket.emit("subscribeToJob", jobId);
    socket.on("jobUpdate", onUpdate);

    return () => {
      socket.off("jobUpdate", onUpdate);
      socket.emit("unsubscribeFromJob", jobId);
    };
  }, [jobId, onUpdate]);
}
