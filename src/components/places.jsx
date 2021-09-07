import React, { useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'

import { listPlaces } from '../graphql/queries'
import { getPlaces, errPlaces} from '../actions/places'
import { useDispatch, useSelector } from 'react-redux'

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core/';

import FavoriteIcon from '@material-ui/icons/Favorite';


const Places = () => {
    //Getting the places from the store ---- 
    const placesState = useSelector((state) => state.allPlaces.data);
    const newPlace = useSelector((state) => state.allPlaces.newPlace)
    const dispatch = useDispatch();

    useEffect(() => {
        fetchPlaces()
      }, [newPlace])
  

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

    return (
    <Box style={styles.container}>
      { placesState.length > 0 ?
          placesState.map((place, index) => (
            <Card key={place.id ? place.id : index} style={styles.place}>
              <CardContent>
                {place.file.key !== 'public/undefined' && <img src={`https://${place.file.bucket}.s3.amazonaws.com/${place.file.key}`} style={styles.placeImg} alt='place'/>}
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <Typography variant="h2" style={styles.placeCountry}>{place.country}</Typography>

                    <Typography variant="body1" style={styles.placeCity}>{place.city}</Typography>

                    {place.description && <Typography variant="body1" style={styles.placeDescription}>{place.description}</Typography>}
                  </Grid>
                  <Grid item xs={2}> <Typography variant="body1">{place.favourite && (<FavoriteIcon/>)}</Typography></Grid>
                </Grid>
               
              </CardContent>
            </Card>
          )) : 'You have not added any places yet.'
      }
    </Box>
    )
}

const styles = {
    container: { width: 400, margin: '20px auto', display: 'flex', flexDirection: 'column', justifyContent: 'center'  },
    place: {  marginBottom: 15 },
   
    placeCountry: { fontSize: 25, fontWeight: 'bold' },
    placeCity: { fontSize: 20, fontWeight: 'bold' },
    placeDescription: { marginBottom: 0 },
    placeImg: { width: '100%' },
  }

export default Places
