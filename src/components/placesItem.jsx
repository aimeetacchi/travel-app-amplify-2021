import dayjs from 'dayjs';
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles';

import {
    Card,
    CardContent,
    Typography,
    Grid,
  } from '@material-ui/core/';
  
  import FavoriteIcon from '@material-ui/icons/Favorite';
  import DeleteForeverIcon from '@material-ui/icons/DeleteForever';



  const useStyles = makeStyles({
    root: {
    },
    place: {  
      marginBottom: 15
    },
    placeCountry: {
      fontSize: 25,
      fontWeight: 'bold'
    },
    placeCity: { 
      fontSize: 20,
      fontWeight: 'bold'
    },
    placeDescription: {
      padding: '10px 0',     
      marginBottom: 0 
    },
    placeDate: {
    },
    placeImg: {
      width: '100%',
      objectFit: 'cover',
      height: 300,
  },
  })

function PlacesItem({place, deletePlace}) {
    const classes = useStyles();


    return (
        <Grid className={classes.root} item xs={12} md={6}>
        <Card key={place.id} className={classes.place}>
          <div onClick={() => deletePlace(place.id)} className={classes.delete}><DeleteForeverIcon/></div>
          <CardContent>
            {place.file.key !== 'public/undefined' && <img src={`https://${place.file.bucket}.s3.amazonaws.com/${place.file.key}`} className={classes.placeImg} alt='place'/>}
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <Typography variant="h2" className={classes.placeCountry}>{place.country}</Typography>

                <Typography variant="body1" className={classes.placeCity}>{place.city}</Typography>

                {place.description && <Typography variant="body1" className={classes.placeDescription}>{place.description}</Typography>}
                
                <Typography variant="body1" className={classes.placeDate}><strong>Date:</strong> {dayjs(place.dateVisitedFrom).format('DD/MM/YYYY')} - {dayjs(place.dateVisitedTo).format('DD/MM/YYYY')}</Typography>
                 
              </Grid>
              <Grid item xs={2}> <Typography variant="body1">{place.favourite && (<FavoriteIcon/>)}</Typography></Grid>
            </Grid>
          
          </CardContent>
        </Card>
      </Grid>
    )
}

PlacesItem.propTypes = {
    place: PropTypes.object,
    deletePlace: PropTypes.func
}

export default PlacesItem

