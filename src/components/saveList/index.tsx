import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';

export default function SaveList() {
  const [checked, setChecked] = useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <List sx={{
        width: '100%', 
        maxWidth: 500, 
        maxHeight: 640, 
        height: 600, 
        overflow: 'auto',
        bgcolor: 'background.paper',
      }}>
        {[0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <InfoIcon />
                </IconButton>
              }
            >
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                {/* <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon> */}
                <ListItemText id={labelId} primary={`Save  ${value + 1}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}