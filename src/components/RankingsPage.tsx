import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SortableList from "./SortableList";
import { DeaneryModel } from "../models/deanery";
import { useState } from "react";

export default function RankingsPage() {
  const [ranking, setRanking] = useState<DeaneryModel[]>([]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <SortableList ranking={ranking} setRanking={setRanking} />
      </DndProvider>
    </>
  );
}
