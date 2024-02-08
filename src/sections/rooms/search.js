import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const RoomSearch = ({ onInputChange }) => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
    onChange={(e) => {
      const inputValue = e.target.value;
      onInputChange(inputValue); // Call the parent's callback function with the input value
    }}
      defaultValue=""
      fullWidth
      placeholder="Search Rooms"
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
  </Card>
);
