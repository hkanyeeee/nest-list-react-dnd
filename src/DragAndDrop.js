import React, { Component } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import cloneDeep from "lodash/cloneDeep";
import initialData from "./initialData";
import Cardboard from "./Cardboard";
import { Button, Card } from "@material-ui/core";

class DragAndDropPoC extends Component {
  state = initialData;

  searchCard = (data, id) => {
    if (data.cards === undefined) {
      return;
    }

    const foundCard = data.cards.find((card) => card.id === id);

    if (foundCard === undefined) {
      for (var x = 0; x < data.cards.length; x++) {
        var temp = this.searchCard(data.cards[x], id);
        if (temp !== undefined) {
          return temp;
        }
      }
    } else {
      return foundCard;
    }
  };

  onDragEnd = (result) => {
    if (!result.destination) return;

    const { destination, source } = result;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    var stateClone = cloneDeep(this.state);
    var removedBit;

    if (source.droppableId === stateClone.id) {
      removedBit = stateClone.cards[source.index];
      stateClone.cards.splice(source.index, 1);
    } else {
      var sourceCardboard = this.searchCard(stateClone, source.droppableId);
      if (sourceCardboard !== undefined) {
        removedBit = sourceCardboard.cards[source.index];
        sourceCardboard.cards.splice(source.index, 1);
      } else return; //would error if it didn't find the sourceCardboard, don't persist changes
    }

    if (destination.droppableId === stateClone.id) {
      stateClone.cards.splice(destination.index, 0, removedBit);
    } else {
      var destinationCardboard = this.searchCard(
        stateClone,
        destination.droppableId
      );
      if (destinationCardboard !== undefined && removedBit !== undefined) {
        destinationCardboard.cards.splice(destination.index, 0, removedBit);
      } else return; //would error if it didn't find the destinationCardboard, don't persist changes
    }

    this.setState(stateClone);
  };

  addCard = () => {
    var stateCopy = cloneDeep(this.state);
    stateCopy.nextFreeCardId++;
    stateCopy.cards = stateCopy.cards.concat({
      id: `card${stateCopy.nextFreeCardId}`,
      title: `Card ${stateCopy.nextFreeCardId}`
    });
    this.setState(stateCopy);
  };

  deleteCard = (data, cardId) => {
    if (data.cards === undefined) {
      return;
    }

    const foundCard = data.cards.find((card) => card.id === cardId);

    if (foundCard === undefined) {
      for (var index = 0; index < data.cards.length; index++) {
        this.deleteCard(data.cards[index], cardId);
      }
    } else {
      data.cards = data.cards.filter((card) => card.id !== cardId);
    }
  };

  removeCard = (cardId) => {
    var stateCopy = cloneDeep(this.state);
    this.deleteCard(stateCopy, cardId);
    this.setState(stateCopy);
  };

  render() {
    const initialCardboard = this.state;

    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Cardboard
            key={initialCardboard.id}
            cardboard={initialCardboard}
            removeCard={this.removeCard}
          />
        </DragDropContext>
        <Button variant="outlined" color="primary" onClick={this.addCard}>
          Add Card
        </Button>
      </div>
    );
  }
}

export default DragAndDropPoC;
