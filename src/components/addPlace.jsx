import React, { useState, useEffect, useRef } from 'react';
import { Storage } from 'aws-amplify'

import { addNewPlace } from '../actions/places'
import { useDispatch } from 'react-redux'

import awsExports from '../aws-exports'
import { makeStyles } from '@material-ui/core/styles';

import {
    TextField,
    Box,
    Checkbox,
    FormControlLabel,
    Grid,
  } from '@material-ui/core/';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
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
        backgroundColor: '#57CC99',
        color: 'white',
        outline: 'none',
        fontSize: 18,
        padding: '12px 0px',
        border: 'none',
        width: '100%',

        '&:hover': {
            backgroundColor: '#80ED99',
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

    const [place, setPlaceState] = useState({
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
    
    // ADD Place Function ====
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
    
                   setPlaceState({
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

     // Calling Add Place API function
     const callAPIcreatePlaces =  (place) => {
        // RUN ADD ACTION === PASSING THE RETURNED DATA ADDED TO API
         dispatch(addNewPlace(place));
         // Empty Form State ---
     }
    
    useEffect(() => {

        if(!firstTimeRender.current) {
            console.log("places data has changes to running use effect")
            callAPIcreatePlaces(place);
        }
    // eslint-disable-next-line
    }, [place])

    useEffect(() => { 
        firstTimeRender.current = false 
      }, [])

    return (
        <Box mb={5} className={classes.root}>
            <form className={classes.container} onSubmit={addPlace}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            className={classes.formField}
                            label="Add Country"
                            variant="outlined"
                            color="primary"
                            onChange={e => setInput('country', e.target.value)}
                            value={formState.name}
                            placeholder="Add Country"
                            // error={countryErr}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            className={classes.formField}
                            label="Add City"
                            variant="outlined"
                            color="primary"
                            onChange={e => setInput('city', e.target.value)}
                            value={formState.name}
                            placeholder="Add City"
                            // error={cityErr}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            className={classes.formField}
                            label="Add Description"
                            variant="outlined"
                            color="primary"
                            onChange={e => setInput('description', e.target.value)}
                            value={formState.description}
                            placeholder="Add a short description about the place"
                            multiline
                            rows={4}
                            // error={descriptionErr}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>         
                        <TextField
                            type="file"
                            color="primary"
                            onChange={e => setImageState(e.target.files[0])}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}> 
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
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <input type="submit" className={classes.submitbutton} value="Add Place" />
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default AddPlace
