import React, { useState, useEffect, useRef } from 'react';
import { Storage, API, graphqlOperation } from 'aws-amplify'
import { createPlaces } from '../graphql/mutations'
import { addNewPlace, failedAddPlace, addPlaceComplete } from '../actions/places'
import { useDispatch } from 'react-redux'
import awsExports from '../aws-exports'
import { makeStyles } from '@material-ui/core/styles';

import {
    TextField,
    Box,
    Checkbox,
    FormControlLabel,
  } from '@material-ui/core/';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        width: 400,
        padding: 0,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    formField: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        '& label': {
            color: 'white',
        },
        '& fieldset': {
            color: 'white',
            borderColor: 'white',
        }
    },
    submitbutton: {
        backgroundColor: 'rebeccaPurple',
        color: 'white',
        outline: 'none',
        fontSize: 18,
        padding: '12px 0px',
        border: 'none',

        '&:hover': {
            backgroundColor: 'purple',
        }
    }
})

const AddPlace = () => {
    const classes = useStyles();
    const firstTimeRender = useRef(true);
    const [formState, setFormState] = useState({
        country: '',
        city: '',
        description: '',
        favourite: false,
        file: null
        
    })

    const [imageState, setImageState] = useState({
        file: null
    })

    const [places, setPlacesState] = useState({
        country: '',
        city: '',
        description: '',
        favourite: false,
        file: {},
    });

    const dispatch = useDispatch();

    // Setting input of form fields
    function setInput(key, value) {
        setFormState({ ...formState, [key]: value })
    }

    const callAPIcreatePlaces =  async(place) => {
            try {             
               
                 // === Uses the Amplify API category to call the AppSync GraphQL API with the createPlaces mutation. A difference between the listPlaces query and the createPlaces mutation is that createPlaces accepts an argument containing the variables needed for the mutation.
                // Add place to database by calling API
                const placeData = await API.graphql(graphqlOperation(createPlaces, {input: place}))

                // RUN ADD ACTION === PASSING THE RETURNED DATA ADDED TO API
                dispatch(addNewPlace(placeData));
                // RUN COMPLETE ACTION
                dispatch(addPlaceComplete());
            } catch (err) {
                console.log('error creating place:', err)
                // RUN FAIL ACTION ----
                dispatch(failedAddPlace(err));
            }
    }
    
    const addPlace = async (e) => {
       
        e.preventDefault();
        console.log('this is running! no errors')
        // Reset the form state ====
        
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
                       favourite: formState.favourite,
                       file: image
                   });
                }
    
            } catch (error) {
                console.log('Error uploading file:', error)
            }
    }
    
    useEffect(() => {
        if(!firstTimeRender.current) {
            console.log('calling...')
            callAPIcreatePlaces(places);
        }
    // eslint-disable-next-line
    }, [places])

    useEffect(() => { 
        firstTimeRender.current = false 
      }, [])

    return (
        <Box className={classes.root}>
            <form className={classes.container} onSubmit={addPlace}>
                <TextField
                    className={classes.formField}
                    label="Add Country"
                    variant="outlined"
                    color="secondary"
                    onChange={e => setInput('country', e.target.value)}
                    value={formState.name}
                    placeholder="Add Country"
                    // error={countryErr}
                />
                <TextField
                    className={classes.formField}
                    label="Add City"
                    variant="outlined"
                    color="secondary"
                    onChange={e => setInput('city', e.target.value)}
                    value={formState.name}
                    placeholder="Add City"
                    // error={cityErr}
                />

                <FormControlLabel
                    label="Favourite"
                    control={
                    <Checkbox
                        checked={formState.favourite}
                        onChange={e => setInput('favourite', e.target.checked)}
                        name="favourite"
                        color="primary"
                    />
                    } 
                />
                
                <TextField
                    className={classes.formField}
                    label="Add Description"
                    variant="outlined"
                    color="secondary"
                    onChange={e => setInput('description', e.target.value)}
                    value={formState.description}
                    placeholder="Add a short description about the place"
                    multiline
                    rows={4}
                    // error={descriptionErr}
                />
                
                <TextField
                    type="file"
                    color="secondary"
                    onChange={e => setImageState(e.target.files[0])}
                />
                
                <input type="submit" className={classes.submitbutton} value="Add Place" />
            </form>
        </Box>
    )
}

export default AddPlace
