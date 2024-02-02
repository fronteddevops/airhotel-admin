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
      // autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        // severity={type}
        style={{fontWeight:"bold",padding:"10px"}}
        variant="filled"
        sx={{
          width: '100%',
          // height:'60px',
          backgroundColor: type === 'success' ? 'royalblue' : '', 
        }}
      >
        
        {/* <button className="btn-close" onClick={props.onClose} aria-label="Close"></button> */}
       {text}
      </Alert>
    </Snackbar>
  </ThemeProvider>
  
  );
}

export default Toaster;