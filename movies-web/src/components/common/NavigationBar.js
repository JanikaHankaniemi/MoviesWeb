import React from "react";
import { useLocation, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Grid,
  Tabs,
  Tab,
  Link as LinkMaterial,
  Typography,
  useMediaQuery,
  Box
} from "@mui/material";
import { LocalMovies } from "@mui/icons-material";
import MobileDrawer from "./MobileDrawer";
const nameOfApp = "MoviesDB"
const logoAndName = (
  <LinkMaterial href="/" style={{ textDecoration: 'none' }}>
      <Typography variant="subtitle1" color="white">
      <LocalMovies color="white"/>{nameOfApp}
      </Typography>
  </LinkMaterial>
);

const NavigationBar = ({ links }) => {
  const location = useLocation().pathname;
  const isMobile = useMediaQuery('(max-width:770px)');
  return (
    <Box role="navigation">
      <AppBar position="sticky" style={{ background: "#7B9E87" }}>
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
                  }}
                    textColor="inherit"
                    value={
                      location !== "/"
                        ? location
                        : links[0].path
                    }>
                    {links.map((object, index) => (
                      <Tab key={index} value={object.path} label={object.title} component={Link} to={object.path} />
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
