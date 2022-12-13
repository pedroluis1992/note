
function reducer(state = [], { type, payload }) {
  switch (type) {
    case "findResults" : {
      return [
        {
          id: "id",
          text: "asdas"
        }
      ]
    }
    default: 
      return state;
  }
}

export default reducer;