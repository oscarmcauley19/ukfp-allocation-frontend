import { Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getSimulationResults } from "../lib/simulation";
import { getOptions } from "../lib/rankingOptions";
import {
  DetailedSimulationResult,
  SimulationResults,
} from "../models/simultation";
import { DeaneryModel } from "../models/deanery";
import { DndProvider } from "react-dnd";
import SortableList from "./SortableList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ResultDisplay } from "./ResultDisplay";

import styles from "../styles/RunPage.module.css";

export default function RunPage() {
  const [deaneries, setDeaneries] = useState<DeaneryModel[]>([]);
  const [response, setResponse] = useState<DetailedSimulationResult[]>([]);
  const [ranking, setRanking] = useState<DeaneryModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getOptions().then((options) => options && setDeaneries(options));
  }, []);

  const handleClick = async () => {
    const runs = 100;
    if (ranking) {
      setLoading(true);
      const ids = ranking.map((opt) => opt.deaneryId);
      const simResults: SimulationResults | null =
        await getSimulationResults(ids);
      if (simResults) {
        const ids: string[] = Object.keys(simResults);
        const detailedResults: DetailedSimulationResult[] = ids.map(
          (id: string) => {
            const intId: number = parseInt(id);
            return {
              id: intId,
              name: deaneries[intId].deaneryName,
              chance: (1.0 * simResults[intId]) / runs,
            };
          },
        );
        setResponse(detailedResults);
      }
      setLoading(false);
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
        <Button onClick={handleClick}>Perform Simulation</Button>
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
        {loading ? (
          <CircularProgress />
        ) : (
          response?.length > 0 && <ResultDisplay results={response} />
        )}
      </div>
    </div>
  );
}
