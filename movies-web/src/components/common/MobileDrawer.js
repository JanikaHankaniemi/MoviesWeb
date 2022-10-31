import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { Menu } from "@mui/icons-material";

const MobileDrawer = ({links}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { innerWidth: 50 } }} style={{ background: "#7B9E87" }}>
        <List>
          {links.map((link, index) =>(
            <ListItemButton sx={{ paddingLeft: 5, paddingRight: 5 }} key={index} onClick={() => setOpen(false)}>
            <ListItemIcon>
                <ListItemText>{ link }</ListItemText>
            </ListItemIcon>
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