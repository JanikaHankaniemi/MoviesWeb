import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material"
import { Menu } from "@mui/icons-material";
import { Link } from 'react-router-dom';
const MobileDrawer = ({ links }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { innerWidth: 50 } }} style={{ background: "#7B9E87" }}>
        <List>
          {links.map((linkItem, index) => (
            <ListItemButton sx={{ paddingLeft: 5, paddingRight: 5 }} key={index} onClick={() => setOpen(false)} component={Link} to={linkItem.path}>
              <ListItemText><Typography variant="button">{linkItem.title}</Typography></ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton sx={{ marginLeft: "auto" }} onClick={() => setOpen(!open)}>
        <Menu sx={{ color: 'white' }} />
      </IconButton>
    </>
  );
}
export default MobileDrawer;