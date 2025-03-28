import { useCallback, useEffect } from "react";
import update from "immutability-helper";
import { DraggableCard } from "./DraggableCard";
import { getOptions } from "../lib/rankingOptions";
import { DeaneryModel } from "../models/deanery";

const style = {};

export interface ContainerState {
  cards: DeaneryModel[];
}

type SortableListProps = {
  ranking: DeaneryModel[];
  setRanking: React.Dispatch<React.SetStateAction<DeaneryModel[]>>;
};

export default function SortableList(props: SortableListProps) {
  useEffect(() => {
    getOptions().then((options: DeaneryModel[] | null) => {
      if (options) {
        props.setRanking(options);
      }
    });
  }, []);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    props.setRanking((prevCards: DeaneryModel[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as DeaneryModel],
        ],
      }),
    );
  }, []);

  const renderCard = useCallback(
    (
      card: { deaneryId: number; deaneryName: string; ratio: number },
      index: number,
    ) => {
      return (
        <DraggableCard
          key={card.id}
          index={index}
          maxIndex={props.ranking.length - 1}
          id={card.deaneryId}
          text={card.deaneryName}
          ratio={card.ratio}
          moveCard={moveCard}
        />
      );
    },
    [],
  );

  return (
    <>
      <div style={style}>
        {props.ranking.map((card, i) => renderCard(card, i))}
      </div>
    </>
  );
}
