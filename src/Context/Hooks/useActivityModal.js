import { useGlobalState } from '@Context/GlobalStateContext';
import { Actions } from '@Context/Actions';

export const useActivityModal = () => {
  const { dispatch } = useGlobalState();

  const openActivityModal = (activityId, dayId = null) => {
    dispatch(Actions.toggleActivityModal(true, activityId, dayId));
  };

  const closeActivityModal = () => {
    dispatch(Actions.toggleActivityModal(false, null, null));
  };

  return {
    openActivityModal,
    closeActivityModal,
  };
};
