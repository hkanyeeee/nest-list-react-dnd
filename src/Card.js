import React, { Component } from "react";
import { Grid, IconButton, Typography, withStyles } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = (theme) => ({
  root: {
    border: "1px solid lightgrey",
    borderRadius: "2px",
    padding: "8px",
    marginBottom: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "space-between",
    display: "flex"
  },
  title: {
    display: "flex",
    justifyContent: "center"
  }
});

class Card extends Component {
  render() {
    const { classes, provided, card, removeCard } = this.props;
    return (
      <div
        className={classes.root}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <Grid container direction="column" className={classes.title}>
          <Typography variant="subtitle1">{card.title}</Typography>
        </Grid>
        <IconButton onClick={() => removeCard(card.id)}>
          <HighlightOffIcon />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(useStyles)(Card);
