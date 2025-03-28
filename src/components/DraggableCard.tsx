import type { Identifier, XYCoord } from "dnd-core";
import type { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from "../styles/DraggableCard.module.css";
import chroma from "chroma-js";
import { ItemTypes } from "../lib/ItemTypes";
import { Card, IconButton, Tooltip, Typography } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

const scale = chroma.scale(["green", "orange", "red"]).domain([0, 2]);

export interface CardProps {
  id: string;
  text: string;
  ratio: number;
  index: number;
  maxIndex: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const DraggableCard: FC<CardProps> = ({
  id,
  text,
  ratio,
  index,
  maxIndex,
  moveCard,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <Card
      sx={{
        opacity: opacity,
        padding: "10px",
        marginBottom: "15px",
        cursor: isDragging ? "grab" : "pointer",
      }}
    >
      <div ref={ref} data-handler-id={handlerId}>
        <div className={styles.cardContent}>
          <Typography textAlign={"left"} className={styles.name}>
            {text}
          </Typography>
          <div className={styles.actionArea}>
            <div className={styles.ratio}>
              <Tooltip
                title={`For every place available in ${text}, ${ratio} people put it as their first choice.`}
              >
                <Typography color={scale(ratio).toString()}>{ratio}</Typography>
              </Tooltip>
            </div>
            <Tooltip title="Send to the top">
              <IconButton onClick={() => moveCard(index, 0)}>
                <ArrowUpward />
              </IconButton>
            </Tooltip>
            <Tooltip title="Send to the bottom">
              <IconButton onClick={() => moveCard(index, maxIndex)}>
                <ArrowDownward />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </Card>
  );
};
