import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { createPlaces } from '../graphql/mutations'
import { addNewPlace, failedAddPlace, addPlaceComplete } from '../actions/places'
import { useDispatch } from 'react-redux'

const place = {
    country: '',
    city: '',
    description: '',
    imgUrl: '',
}

const AddPlace = () => {
    const [formState, setFormState] = useState(place)
    const dispatch = useDispatch();

    // Setting input of form fields
    function setInput(key, value) {
        setFormState({ ...formState, [key]: value })
    }

    // === Uses the Amplify API category to call the AppSync GraphQL API with the createPlaces mutation. A difference between the listPlaces query and the createPlaces mutation is that createPlaces accepts an argument containing the variables needed for the mutation.
    async function addPlace(e) {
        e.preventDefault();
        try {
            if (!formState.city || !formState.country || !formState.imgUrl) return
            const place = { ...formState }
            // Add place to database by calling API
            const placeData = await API.graphql(graphqlOperation(createPlaces, {input: place}))

            // RUN ADD ACTION === PASSING THE RETURNED DATA ADDED TO API
            dispatch(addNewPlace(placeData));

            setFormState(place)


        } catch (err) {
            console.log('error creating place:', err)
            // RUN FAIL ACTION ----
            dispatch(failedAddPlace(err));
        }
        // RUN COMPLETE ACTION
        dispatch(addPlaceComplete());
    }

    return (
        <form style={styles.container} onSubmit={addPlace}>
            <input
                type="input"
                required
                onChange={e => setInput('country', e.target.value)}
                style={styles.input}
                value={formState.name}
                placeholder="Add Country"
            />
            <input
                type="text"
                required
                onChange={e => setInput('city', e.target.value)}
                style={styles.input}
                value={formState.name}
                placeholder="Add City"
            />
            
            <textarea
                rows="4"
                cols="50"
                onChange={e => setInput('description', e.target.value)}
                style={styles.input}
                value={formState.description}
                placeholder="Add a short description about the place"
            />
            <input
                type="input"
                required
                onChange={e => setInput('imgUrl', e.target.value)}
                style={styles.input}
                value={formState.imgUrl}
                placeholder="add a jpg url for image"
            />
            <input type="submit" style={styles.button} value="Add Place" />
        </form>
    )
}


const styles = {
    container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
    input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
    button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
  }

export default AddPlace
