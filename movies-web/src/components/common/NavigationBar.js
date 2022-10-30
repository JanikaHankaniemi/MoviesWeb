import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Tabs,
  Tab,
  Typography,
  useMediaQuery,
  Link,
  Box
} from "@mui/material";
import { LocalMovies } from "@mui/icons-material";
import MobileDrawer from "./MobileDrawer";
const nameOfApp = "MoviesDB"
const logoAndName = (
  <Link href="/">
    <Typography variant="subtitle1" color="white">
      <LocalMovies />{nameOfApp}
    </Typography>
  </Link>
);

const NavigationBar = ({ links }) => {
  const [value, setValue] = useState(0);
  const isMobile = useMediaQuery('(max-width:770px)');
  return (
    <Box role="navigation">
      <AppBar position="sticky">
        <Toolbar>
          {isMobile ?
            <>
              {logoAndName}
              <MobileDrawer links={links} />
            </> : (
              <Grid sx={{ placeItems: "center" }} container>
                <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
                  {logoAndName}
                </Grid>
                <Grid item xs={10}>
                  <Tabs TabIndicatorProps={{
                    style: {
                      backgroundColor: "white"
                    }
                  }} textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
                    {links.map((link, index) => (
                      <Tab key={index} label={link} />
                    ))}
                  </Tabs>
                </Grid>
              </Grid>
            )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default NavigationBar;
