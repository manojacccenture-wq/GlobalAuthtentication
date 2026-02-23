import { useSelector, useDispatch } from 'react-redux';
import AppRouter from "./app/router";
import ErrorBoundary from "./shared/components/ErrorBoundary/ErrorBoundary";
import Toast from "./shared/components/Toast/Toast";
import { selectToastMessage, selectToastType, selectToastDuration, clearToast } from "./shared/components/Toast/api/toastSlice";

const App = () => {
  const dispatch = useDispatch();
  const toastMessage = useSelector(selectToastMessage);
  const toastType = useSelector(selectToastType);
  const toastDuration = useSelector(selectToastDuration);

  const handleToastClose = () => {
    dispatch(clearToast());
  };

  return (
    <ErrorBoundary>
      <AppRouter />
      <Toast 
        message={toastMessage} 
        type={toastType} 
        duration={toastDuration}
        onClose={handleToastClose}
      />
    </ErrorBoundary>
  );
};

export default App;
