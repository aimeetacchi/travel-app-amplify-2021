import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import {
  Box,
  Typography,
} from '@material-ui/core/';

const useStyles = makeStyles({
  root: {
      width: '100%',
  },
  home: {
    padding: '50px 20px 150px',
  }
  
})

const Home = () => {
  const classes = useStyles();
    return (
        <Box className={classes.root}>
          <Box className={classes.home}>
            <Typography variant="body2">
              Welcome to your Travel Logger, here you can keep a record of all your travels you have done. consectetur adipiscing elit. Proin at feugiat nulla, sitamet egestas est. Suspendisse facilisis lobortis neque, nec lobortis sapien feugiat eu. Quisque ac nulla semper, viverra tellus lobortis, ultrices lectus. Ut vel nunc pulvinar, tempus quam at, placerat enim. Phasellus consequat tellus id nisl venenatis lobortis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer diam arcu, pulvinar quis tortor at, bibendum blandit sem. Nulla eu vehicula diam. Ut eu orci justo. Sed sed tortor dictum, efficitur quam vel, fermentum lacus. Donec imperdiet sapien nec hendrerit tincidunt. Nam sit amet pharetra ipsum. Curabitur imperdiet dictum orci, eget efficitur ligula semper pellentesque
              </Typography>
              <br/>
              <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at feugiat nulla, sitamet egestas est. Suspendisse facilisis lobortis neque, nec lobortis sapien feugiat eu. Quisque ac nulla semper, viverra tellus lobortis, ultrices lectus. Ut vel nunc pulvinar, tempus quam at, placerat enim. Phasellus consequat tellus id nisl venenatis lobortis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer diam arcu, pulvinar quis tortor at, bibendum blandit sem. Nulla eu vehicula diam. Ut eu orci justo. Sed sed tortor dictum, efficitur quam vel, fermentum lacus. Donec imperdiet sapien nec hendrerit tincidunt. Nam sit amet pharetra ipsum. Curabitur imperdiet dictum orci, eget efficitur ligula semper pellentesque
              </Typography>
            </Box>
        </Box>
    )
}

export default Home
