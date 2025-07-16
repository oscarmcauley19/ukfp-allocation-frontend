import update from "immutability-helper";
import { DraggableCard } from "./DraggableCard";
import { DeaneryModel } from "../models/deanery";

const style = {};

export interface ContainerState {
  cards: DeaneryModel[];
}

type SortableListProps = {
  ranking: DeaneryModel[];
  updateRanking: (newRanking: DeaneryModel[]) => void;
};

export default function SortableList({
  ranking,
  updateRanking,
}: SortableListProps) {
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const updated = update(ranking, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, ranking[dragIndex] as DeaneryModel],
      ],
    });
    console.log(ranking);
    console.log("Updated ranking:", updated);
    updateRanking(updated);
  };

  const renderCard = (card: DeaneryModel, index: number) => {
    return (
      <DraggableCard
        key={card.deaneryId}
        index={index}
        maxIndex={ranking.length - 1}
        id={card.deaneryId}
        text={card.deaneryName}
        ratio={card.ratio}
        moveCard={moveCard}
      />
    );
  };

  return (
    <>
      <div style={style}>{ranking.map((card, i) => renderCard(card, i))}</div>
    </>
  );
}
