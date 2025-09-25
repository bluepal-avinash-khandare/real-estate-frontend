// import React from 'react';
// import { TextField } from '@mui/material';

// const Filter = ({ onChange, placeholder }) => (
//   <TextField
//     label={placeholder}
//     variant="outlined"
//     onChange={onChange}
//     className="mb-4"
//   />
// );

// export default Filter;


import React, { useState } from 'react';
import { 
  TextField, 
  InputAdornment, 
  IconButton, 
  Box,
  useTheme,
  alpha
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';

// Styled components for enhanced visuals
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#FFFFFF',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.02),
    },
    '&.Mui-focused': {
      backgroundColor: alpha(theme.palette.primary.main, 0.05),
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
    '& fieldset': {
      borderColor: alpha(theme.palette.primary.main, 0.2),
      transition: 'border-color 0.3s ease',
    },
    '&:hover fieldset': {
      borderColor: alpha(theme.palette.primary.main, 0.3),
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    padding: '14px 16px',
    fontSize: '0.95rem',
  },
  '& .MuiInputAdornment-root': {
    color: alpha(theme.palette.primary.main, 0.6),
  },
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: '24px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: '3px 3px 0 0',
  },
}));

const Filter = ({ 
  onChange, 
  placeholder = "Search...", 
  value,
  onClear,
  debounceTime = 300,
  showFilterButton = false,
  onFilterClick,
  ...props 
}) => {
  const theme = useTheme();
  const [internalValue, setInternalValue] = useState(value || '');
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    
    // Clear existing timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    
    // Set new timeout
    setDebounceTimeout(setTimeout(() => {
      onChange(event);
    }, debounceTime));
  };

  const handleClear = () => {
    setInternalValue('');
    if (onClear) {
      onClear();
    } else {
      // Create a synthetic event if no onClear is provided
      const event = {
        target: { value: '' }
      };
      onChange(event);
    }
  };

  return (
    <FilterContainer>
      <StyledTextField
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: (
            <>
              {internalValue && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear search"
                    onClick={handleClear}
                    edge="end"
                    size="small"
                    sx={{
                      color: alpha(theme.palette.primary.main, 0.6),
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )}
              {showFilterButton && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="filter options"
                    onClick={onFilterClick}
                    edge="end"
                    size="small"
                    sx={{
                      color: alpha(theme.palette.primary.main, 0.6),
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    <FilterListIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )}
            </>
          ),
        }}
        {...props}
      />
    </FilterContainer>
  );
};

export default Filter;