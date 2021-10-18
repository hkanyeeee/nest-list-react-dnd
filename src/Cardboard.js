import React, { Component, useEffect, useState } from "react";
import { makeStyles, Theme, Typography, withStyles } from "@material-ui/core";
import Card from "./Card";
import { Draggable, Droppable } from "react-beautiful-dnd";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "8px",
    border: "1px solid lightgrey",
    borderRadius: "2px",
    //backgroundColor: `rgb(${getRandomInt(0, 256)},${getRandomInt(0, 256)},${getRandomInt(0, 256)})`
    display: "flex",
    flexDirection: "column"
  },
  title: {
    padding: "8px"
  },
  list: {
    padding: "8px 8px 0 8px",
    flexGrow: 1,
    minHeight: "75px"
  }
}));

function Cardboard(props) {
  const { provided, cardboard, removeCard } = props;
  const classes = useStyles();
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    setBackgroundColor(
      `rgb(${getRandomInt(0, 256)},${getRandomInt(0, 256)},${getRandomInt(
        0,
        256
      )})`
    );
  }, []);

  return (
    <div
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      ref={provided?.innerRef}
    >
      <div
        className={classes.root}
        style={{ backgroundColor: backgroundColor }}
      >
        <Typography variant="h5" className={classes.title}>
          {props.cardboard.title}
        </Typography>
        <Droppable
          droppableId={cardboard.id}
          renderClone={(provided, snapshot, rubric) => {
            const card = props.cardboard.cards[rubric.source.index];
            if (card.cards !== undefined)
              return (
                <Cardboard
                  cardboard={card}
                  provided={provided}
                  removeCard={removeCard}
                />
              );
            else
              return (
                <Card card={card} provided={provided} removeCard={removeCard} />
              );
          }}
        >
          {(provided) => (
            <div
              className={classes.list}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.cardboard.cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided2) => {
                    if (card.cards !== undefined)
                      return (
                        <Cardboard
                          cardboard={card}
                          provided={provided2}
                          removeCard={removeCard}
                        />
                      );
                    else
                      return (
                        <Card
                          card={card}
                          provided={provided2}
                          removeCard={removeCard}
                        />
                      );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}

export default Cardboard;
