import { useEffect, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DndProvider } from "react-dnd";

import styles from "../styles/RunPage.module.css";
import { createSimulationJob, getSimulationResults } from "../lib/simulation";
import { useJobProgress } from "../lib/hooks/useJobProgress";
import { getOptions } from "../lib/rankingOptions";
import { DetailedSimulationResult, JobProgress } from "../models/simultation";
import { DeaneryModel } from "../models/deanery";
import { ResultDisplay } from "./ResultDisplay";
import SortableList from "./SortableList";
import { set } from "zod";

export default function RunPage() {
  const runOptions = [10, 25, 50, 100];
  const [runs, setRuns] = useState<number>(10);
  const [deaneries, setDeaneries] = useState<DeaneryModel[]>([]);
  const [results, setResults] = useState<DetailedSimulationResult[]>([]);
  const [ranking, setRanking] = useState<DeaneryModel[]>([]);
  const [jobId, setJobId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useJobProgress(jobId, (update: JobProgress) => {
    setProgress(Math.round(update.progress));
  });

  useEffect(() => {
    getOptions().then((options) => options && setDeaneries(options));
  }, []);

  useEffect(() => {
    if (progress >= 100 && jobId) {
      getSimulationResults(jobId, runs, deaneries)
        .then((detailedResults) => {
          setJobId(null);
          setProgress(0);
          setResults(detailedResults);
        })
        .catch((error) => {
          setError(
            "An error occurred while fetching results. Please try again.",
          );
          console.error("Error fetching results:", error);
        });
    }
  }, [progress]);

  const handlePerformSimClicked = async () => {
    if (ranking) {
      const ids = ranking.map((opt) => opt.deaneryId);
      try {
        // Reset state before starting a new job
        setError(null);
        setJobId(null);
        setProgress(0);
        setResults([]);

        // Create a new simulation job
        const jobId = await createSimulationJob(ids, runs);
        setJobId(jobId);
      } catch (error) {
        setError(
          "An error occurred while starting the simulation. Please try again.",
        );
        console.error("Error creating simulation job:", error);
      }
    }
  };

  return (
    <div className={styles.splitView}>
      <div className={styles.textArea}>
        <Typography textAlign={"left"} variant="h5">
          1. Pick your ranking
        </Typography>
        <Typography textAlign={"left"} variant="body1">
          Re-order the deaneries below to select your favoured ranking. The
          number attached to each represents the application ratio for that
          deanery.
        </Typography>
      </div>
      <div className={styles.textArea}>
        <Typography textAlign={"left"} variant="h5">
          2. Run a simulation
        </Typography>
        <Typography textAlign={"left"} variant="body1">
          Re-order the deaneries below and click &apos;run similation&apos; to
          get your results.
        </Typography>
        <div className={styles.runSimulationControls}>
          <FormControl sx={{ minWidth: 80 }}>
            <InputLabel id="number-of-runs-label">Runs</InputLabel>
            <Select
              labelId="number-of-runs-label"
              id="number-of-runs-select"
              label="Runs"
              value={runs}
              onChange={(e) => {
                const newValue = e.target.value;
                if (typeof newValue === "number") {
                  setRuns(newValue);
                }
              }}
            >
              {runOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={handlePerformSimClicked}>Perform Simulation</Button>
        </div>
      </div>
      <div className={styles.leftSide}>
        <div className={styles.rankingPanel}>
          {ranking && (
            <DndProvider backend={HTML5Backend}>
              <SortableList ranking={ranking} setRanking={setRanking} />
            </DndProvider>
          )}
        </div>
      </div>

      <div className={styles.rightSide}>
        {error ? (
          <Alert severity="error" sx={{ marginX: 4 }}>
            {error}
          </Alert>
        ) : jobId ? (
          <div>
            <CircularProgress variant="determinate" value={progress} />
            <Typography
              sx={{ color: "primary" }}
              variant="body1"
            >{`${progress}%`}</Typography>
          </div>
        ) : (
          results?.length > 0 && <ResultDisplay results={results} />
        )}
      </div>
    </div>
  );
}
