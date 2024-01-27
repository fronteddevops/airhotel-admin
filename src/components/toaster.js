import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Snackbar, Alert } from '@mui/material';

const theme = createTheme();

function Toaster(props) {
  const { visiblity, type, title, text } = props;

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={visiblity === 'show'}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
    <Alert severity={type} sx={{ width: '130%', maxHeight: '300px' }}>
          <div className="d-flex align-items-center">
            <i className="bx bx-bell me-2" style={{ fontSize: '1rem' }}></i>
            <div className="me-auto fw-semibold">{title}</div>
            <button className="btn-close" onClick={props.onClose} aria-label="Close"></button>
          </div>
          <div>{text}</div>
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default Toaster;
