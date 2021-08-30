import React, { useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'

import { listPlaces } from '../graphql/queries'
import { getPlaces } from '../actions/places'
import { useDispatch, useSelector } from 'react-redux'

const Places = () => {
    //Getting the places from the store ---- 
    const placesState = useSelector((state) => state.allPlaces.data);
    const newPlace = useSelector((state) => state.allPlaces.newPlace)
    const dispatch = useDispatch();
    console.log(newPlace);

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
          console.log('error fetching places')
        }
      }

    return (
    <div style={styles.container}>
      { placesState.length > 0 ?
          placesState.map((place, index) => (
            <div key={place.id ? place.id : index} style={styles.place}>
              <img src={place.imgUrl} style={styles.placeImg} alt='place'/>
              <p style={styles.placeCity}>{place.city}</p>
              <p style={styles.placeCountry}>{place.country}</p>
              <p style={styles.placeDescription}>{place.description}</p>
            </div>
          )) : 'You have not added any places yet.'
      }
    </div>
    )
}

const styles = {
    container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
    place: {  marginBottom: 15 },
   
    placeCity: { fontSize: 20, fontWeight: 'bold' },
    placeCountry: { fontSize: 20, fontWeight: 'bold' },
    placeDescription: { marginBottom: 0 },
    placeImg: { width: '100%' },
  }

export default Places
