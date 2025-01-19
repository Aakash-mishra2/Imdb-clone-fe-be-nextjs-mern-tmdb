//This component will show the popup on error and success state
import { Snackbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../store/reducerLogic";

function CustomSnackbar() {
  const dispatch = useDispatch();
  const snackbar = useSelector((state: any) => state.account.snackbar);
  const { vertical, horizontal, open, message } = snackbar;

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => dispatch(setSnackbar({ open: false }))}
        message={message}
        key={vertical + horizontal}
        sx={{
          '& .css-1gz1y6s': {
            backgroundColor: '#161D2F',
            color: '#FFFFFF',
            fontFamily: "'Poppins', sans-serif",
          }
        }}
      />
    </>
  );
}

export default CustomSnackbar;
