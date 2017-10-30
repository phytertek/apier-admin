const OPEN_MODAL = 'OPEN_MODAL';
export const openModal = name => ({ type: OPEN_MODAL, payload: name });

const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModal = () => ({ type: CLOSE_MODAL });

const initState = {
  currentOpenModal: null
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case OPEN_MODAL:
      return Object.assign({}, state, { currentOpenModal: payload });
    case CLOSE_MODAL:
      return Object.assign({}, state, { currentOpenModal: null });
    default:
      return state;
  }
};
