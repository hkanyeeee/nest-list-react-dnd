const initialData = {
  id: "cardboardA",
  title: "cardboardA",
  nextFreeCardId: 9,
  nextFreeCardboardId: "D",
  cards: [
    {
      id: "card1",
      title: "Card 1"
    },
    {
      id: "card2",
      title: "Card 2"
    },
    {
      id: "cardboardB",
      title: "Cardboard B",
      cards: [
        {
          id: "card3",
          title: "Card 3"
        },
        {
          id: "card4",
          title: "Card 4"
        },
        {
          id: "cardboardC",
          title: "Cardboard C",
          cards: [
            {
              id: "card5",
              title: "Card 5"
            },
            {
              id: "card6",
              title: "Card 6"
            }
          ]
        },
        {
          id: "card7",
          title: "Card 7"
        }
      ]
    },
    {
      id: "card8",
      title: "Card 8"
    },
    {
      id: "cardboardD",
      title: "Cardboard D",
      cards: [
        {
          id: "card9",
          title: "Card 9"
        }
      ]
    }
  ]
};

export default initialData;
