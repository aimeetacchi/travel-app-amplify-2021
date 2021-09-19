import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import _ from 'lodash'
import Search from './search'

import { getPlaces, deleteSelectedPlace} from '../actions/places'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core/';

import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles({
  root: {
      width: '100%',
  },
  container: {
    width: '100%',
    margin: '20px auto',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center'
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
  placeDescription: { marginBottom: 0 },
  placeImg: {
    width: '100%',
    objectFit: 'cover',
    height: 300,
},
})

// const Places = ({ places: { data, loading, completeDeletedPlace }, getPlaces, deleteSelectedPlace}) => {
const Places = () => {
    const classes = useStyles();
   
    const [search, setSearch] = useState('');
    const [searchParam] = useState(["city", "country"]);

    const data = useSelector((state) => state.allPlaces.data);
    const loading = useSelector((state) => state.allPlaces.loading);
    const completeDeletedPlace = useSelector((state) => state.allPlaces.completeDeletedPlace);
    const addComplete = useSelector((state) => state.allPlaces.addComplete)

    const dispatch = useDispatch();
    // places: { data, loading, completeDeletedPlace }, getPlaces, deleteSelectedPlace

      // SEARCH FUNCTION
      function searchPlace(items) {
        return items.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(search.toLowerCase()) > -1
                );
            });
        });
      }
      
      // DELETE PLACE
      const deletePlace = (place) => {
        console.log('deleting....', place)

        const deletedPlace = {
          id: place,
        };

        // Dispatch action - getPlaces passing the places array
        dispatch(deleteSelectedPlace(deletedPlace))
        
      }

      // const usePrevious = (value) => {
      //   const ref = useRef();
      //   useEffect(() => {
      //     ref.current = value
      //   }, [value]);
      //   return ref.current;
      // }
    
      // const prevData = usePrevious({data});

    useEffect(() => {
      // if(!_.isEmpty(data) && !_.isEqual(prevData, data)) {
        dispatch(getPlaces())
      // }
      // eslint-disable-next-line
    }, [completeDeletedPlace])

    if(loading || data === null) {
      return <span>loading...</span>
    }

    return (
      <>
        { data.length > 0 &&
          <Search search={search} setSearch={setSearch} />
        }
        <Box className={classes.container}>
          <Grid container spacing={4}>
            { data.length > 0 ?
                searchPlace(data).map((place, index) => (
                  <Grid key={index} item xs={12} md={6}>
                    <Card key={place.id} className={classes.place}>
                      <div onClick={() => deletePlace(place.id)} className={classes.delete}><DeleteForeverIcon/></div>
                      <CardContent>
                        {place.file.key !== 'public/undefined' && <img src={`https://${place.file.bucket}.s3.amazonaws.com/${place.file.key}`} className={classes.placeImg} alt='place'/>}
                        <Grid container spacing={2}>
                          <Grid item xs={10}>
                            <Typography variant="h2" className={classes.placeCountry}>{place.country}</Typography>

                            <Typography variant="body1" className={classes.placeCity}>{place.city}</Typography>

                            {place.description && <Typography variant="body1" className={classes.placeDescription}>{place.description}</Typography>}
                          </Grid>
                          <Grid item xs={2}> <Typography variant="body1">{place.favourite && (<FavoriteIcon/>)}</Typography></Grid>
                        </Grid>
                      
                      </CardContent>
                    </Card>
                  </Grid>
                )) : ( 
                  <Grid item xs={12}>
                    <Typography variant="body1">You have not added any places yet.</Typography>
                  </Grid>
                )
            }
          </Grid>
        </Box>
      </>
    )
}

Places.propTypes = {
  places: PropTypes.object,
}

// const mapStateToProps = state => ({
//   places: state.allPlaces
// })

export default Places
// export default connect(mapStateToProps, { getPlaces, deleteSelectedPlace })(Places)
