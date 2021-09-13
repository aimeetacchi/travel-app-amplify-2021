import React, { useEffect, useState } from 'react'
import Search from './search'
import { API, graphqlOperation } from 'aws-amplify'
import { listPlaces } from '../graphql/queries'
import { deletePlaces } from '../graphql/mutations'
import { getPlaces, errPlaces, deleteSelectedPlace, deletePlaceComplete, failedDeletePlace} from '../actions/places'
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

const Places = () => {
    const classes = useStyles();
    //Getting the places from the store ---- 
    const placesState = useSelector((state) => state.allPlaces.data);
    const newPlace = useSelector((state) => state.allPlaces.newPlace)
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [searchParam] = useState(["city", "country"]);

    // === Uses the Amplify API category to call the AppSync GraphQL API with the listPlaces query. Once the data is returned, the items array is passed in to the setPlaces function to update the local state.
    async function fetchPlaces() {
        try {
          const placesData = await API.graphql(graphqlOperation(listPlaces))
          const places = placesData.data.listPlaces.items
          // Dispatch action - getPlaces passing the places array
          dispatch(getPlaces(places))
        } catch (err) { 
          dispatch(errPlaces(err))
          console.log('error fetching places')
        }
      }


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
      
      const deletePlace = async (place) => {
        console.log('deleting....', place)

        const placeDetails = {
          id: place,
        };

        try {
          const placesData = await API.graphql(graphqlOperation(deletePlaces, {input: placeDetails}))
          const deletedPlace = placesData.data.deletePlaces.items
          // Dispatch action - getPlaces passing the places array
          dispatch(deleteSelectedPlace(deletedPlace))
          dispatch(deletePlaceComplete());
        } catch (err) { 
          dispatch(failedDeletePlace(err))
          console.log('error deleting places')
        }
      }

    useEffect(() => {
      fetchPlaces()
      // eslint-disable-next-line
    }, [newPlace, placesState])

    return (
      <>
        <Search search={search} setSearch={setSearch} />
        <Box className={classes.container}>
          <Grid container spacing={4}>
            { placesState.length > 0 ?
                searchPlace(placesState).map((place, index) => (
                  <Grid key={index} item xs={12} md={6}>
                    <Card key={place.id ? place.id : index} className={classes.place}>
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
                )) : 'You have not added any places yet.'
            }
          </Grid>
        </Box>
      </>
    )
}

export default Places
