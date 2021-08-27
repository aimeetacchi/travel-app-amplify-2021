import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createPlaces } from '../graphql/mutations'
import { listPlaces } from '../graphql/queries'

const initialState = {
    city: '',
    country: '',
    description: '',
    dateVisited: null,
    tags: [],
    favourite: false,
    visited: false,
    imgUrl: ''
}


const Places = () => {
    const [formState, setFormState] = useState(initialState)
    const [places, setPlaces] = useState([])

    useEffect(() => {
        fetchPlaces()
      }, [])

    // Setting input of form fields
    function setInput(key, value) {
        setFormState({ ...formState, [key]: value })
    }

    // === Uses the Amplify API category to call the AppSync GraphQL API with the listPlaces query. Once the data is returned, the items array is passed in to the setPlaces function to update the local state.
    async function fetchPlaces() {
        try {
          const placesData = await API.graphql(graphqlOperation(listPlaces))
          const places = placesData.data.listPlaces.items
          setPlaces(places)
        } catch (err) { console.log('error fetching places') }
      }

    // === Uses the Amplify API category to call the AppSync GraphQL API with the createPlaces mutation. A difference between the listPlaces query and the createPlaces mutation is that createPlaces accepts an argument containing the variables needed for the mutation.
    async function addPlace() {
        try {
            if (!formState.city || !formState.country || !formState.imgUrl) return
            const place = { ...formState }
            setPlaces([...places, place])
            setFormState(initialState)
            await API.graphql(graphqlOperation(createPlaces, {input: place}))
        } catch (err) {
            console.log('error creating place:', err)
        }
    }


    return (
    <div style={styles.container}>
      <h2>Amplify Places App</h2>
      <input
        onChange={e => setInput('city', e.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="City"
      />
      <input
        onChange={e => setInput('country', e.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Country"
      />
      <input
        onChange={e => setInput('description', e.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
       <input
        onChange={e => setInput('imgUrl', e.target.value)}
        style={styles.input}
        value={formState.imgUrl}
        placeholder="imgUrl"
      />
      <button style={styles.button} onClick={addPlace}>Add a place</button>
      {
        places.map((place, index) => (
          <div key={place.id ? place.id : index} style={styles.place}>
            <img src={place.imgUrl} style={styles.placeImg} alt='place'/>
            <p style={styles.placeCity}>{place.city}</p>
            <p style={styles.placeCountry}>{place.country}</p>
            <p style={styles.placeDescription}>{place.description}</p>
          </div>
        ))
      }
    </div>
    )
}

const styles = {
    container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
    todo: {  marginBottom: 15 },
    input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
    placeCity: { fontSize: 20, fontWeight: 'bold' },
    placeCountry: { fontSize: 20, fontWeight: 'bold' },
    placeDescription: { marginBottom: 0 },
    placeImg: { width: '100%' },
    button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
  }

export default Places
