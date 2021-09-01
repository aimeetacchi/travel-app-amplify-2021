import React, { useState, useEffect, useRef } from 'react';
import { Storage, API, graphqlOperation } from 'aws-amplify'
import { createPlaces } from '../graphql/mutations'
import { addNewPlace, failedAddPlace, addPlaceComplete } from '../actions/places'
import { useDispatch } from 'react-redux'
import awsExports from '../aws-exports'


const AddPlace = () => {
    const firstTimeRender = useRef(true);
    const [formState, setFormState] = useState({
        country: '',
        city: '',
        description: '',
        file: null
    })

    const [imageState, setImageState] = useState({
        file: null
    })

    const [places, setPlacesState] = useState({
        country: '',
        city: '',
        description: '',
        file: {},
    });

    const dispatch = useDispatch();

    // Setting input of form fields
    function setInput(key, value) {
        setFormState({ ...formState, [key]: value })
    }

    // === Uses the Amplify API category to call the AppSync GraphQL API with the createPlaces mutation. A difference between the listPlaces query and the createPlaces mutation is that createPlaces accepts an argument containing the variables needed for the mutation.
    const callAPIcreatePlaces =  async(place) => {
            try {             
               
                // Add place to database by calling API
                const placeData = await API.graphql(graphqlOperation(createPlaces, {input: place}))

                // RUN ADD ACTION === PASSING THE RETURNED DATA ADDED TO API
                dispatch(addNewPlace(placeData));
            } catch (err) {
                console.log('error creating place:', err)
                // RUN FAIL ACTION ----
                dispatch(failedAddPlace(err));
            }
    }
    
    const addPlace = async (e) => {
        e.preventDefault();
        
        try {
            const result = await Storage.put(imageState.name, imageState, {
                contentType: 'image/jpg'
            })

            if(result) {
                const image = {
                        bucket: awsExports.aws_user_files_s3_bucket,
                        region: awsExports.aws_user_files_s3_bucket_region,
                        key: 'public/' + result.key
                }

               setPlacesState({
                   country: formState.country,
                   city: formState.city,
                   description: formState.description,
                   file: image
               })

             
            }
         

        } catch (error) {
            console.log('Error uploading file:', error)
        }
            // RUN COMPLETE ACTION
            // dispatch(addPlaceComplete());
        }
    
    useEffect(() => {
        if(!firstTimeRender.current) {
            console.log('calling...')
            callAPIcreatePlaces(places);
        }
    }, [places])

    useEffect(() => { 
        firstTimeRender.current = false 
      }, [])

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
            <label style={styles.fileUpload}>
                <input
                    style={styles.fileUploadInput}
                    type="file"
                    name="place"
                    required
                    onChange={e => setImageState(e.target.files[0])}
                />
                Add an Image
            </label>
            
            <input type="submit" style={styles.button} value="Add Place" />
        </form>
    )
}


const styles = {
    container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
    input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
    button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' },
    fileUpload: { backgroundColor: 'rebeccaPurple', border: '1px solid #ccc', display: 'inline-block', padding: '6px 12px', cursor: 'pointer' },
    fileUploadInput: { display: 'none' },

  }

export default AddPlace
