"use client";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const NeonSwitch = styled(Switch)(({ theme }) => ({
  width: 44,
  height: 22,
  padding: 0,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(22px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#a855f7',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 18,
    height: 18,
    borderRadius: 10,
    backgroundColor: '#fff',
    transition: 'all 200ms ease-in-out',
  },
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    opacity: 1,
    backgroundColor: 'rgba(255,255,255,.1)',
    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
    boxSizing: 'border-box',
    transition: 'background-color 0.3s ease',
  },
}));

interface CustomSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function CustomSwitch({ label, checked, onChange }: CustomSwitchProps) {
  return (
    <FormControlLabel
      control={
        <NeonSwitch 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)} 
        />
      }
      label={label}
      sx={{
        margin: 0,
        '&:hover': {
          '& .MuiFormControlLabel-label': {
            color: '#a855f7',
            textShadow: '0 0 12px rgba(168, 85, 247, 0.9)',
          },
          '& .MuiSwitch-track': {
            backgroundColor: 'rgba(255,255,255,.2)',
          }
        },
        '& .MuiFormControlLabel-label': {
          fontSize: '0.70rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: checked ? '#a855f7' : 'rgba(255,255,255,0.4)',
          textShadow: checked ? '0 0 10px rgba(168, 85, 247, 0.6)' : 'none',
          fontFamily: 'inherit',
          marginLeft: '12px',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          userSelect: 'none'
        },
      }}
    />
  );
}