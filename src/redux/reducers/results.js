function reducer(state = [], { type } = {}) {
  switch (type) {
    case 'findResults': {
      return [
        {
          id: 'id',
          text: 'asdas',
        },
      ];
    }
    default:
      return state;
  }
}

export default reducer;
