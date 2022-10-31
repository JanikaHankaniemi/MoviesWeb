import StarBorderIcon from '@mui/icons-material/StarBorder';
import {
  MenuItem,
} from '@mui/material';

export function GetStarOptions() {
  let rows = [];
  let innerRows = [];
  const fiveRows = [...Array(5).keys()].reverse();
  fiveRows.forEach(index => {
    for (var i = 0; i < index + 1; i++) {
      innerRows.push(<StarBorderIcon key={`starsicon${index},${i}`} sx={{ fontSize: 16 }} />)
    }
    rows.push(<MenuItem key={`stars${index + 1}`} value={index + 1}>{innerRows}</MenuItem>)
    innerRows = [];
  })
  return rows;
};