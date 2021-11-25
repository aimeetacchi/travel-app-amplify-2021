import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { API, graphqlOperation } from 'aws-amplify'
import { listPlaces } from '../graphql/queries'

import Search from './search'
import PlacesItem from './placesItem'
// import Pagination from './pagination'

import { getPlaces, deleteSelectedPlace, sortByAsc, sortByDesc} from '../actions/places'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import {
  Box,
  Typography,
  Grid,
  // Button,
} from '@material-ui/core/';


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
  
})

// const Places = ({ places: { data, loading, completeDeletedPlace }, getPlaces, deleteSelectedPlace}) => {
const Places = () => {
    const classes = useStyles();
   
    const [search, setSearch] = useState('');
    const [searchParam] = useState(["city", "country"]);


    // const [nextToken, setNextToken] = useState(null)
    // const [nextNextToken, setNextNextToken] = useState()
    // const [previousTokens, setPreviousTokens] = useState([])

    // const [currentPage, setCurrentPage] = useState(1);
    // const [placesPerPage] = useState(6);

    const data = useSelector((state) => state.allPlaces.data);
    const loading = useSelector((state) => state.allPlaces.loading);
    const completeDeletedPlace = useSelector((state) => state.allPlaces.completeDeletedPlace);

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

      // SORT BY ASC
      function sortByASC(value) {
        
          console.log('sorting places by ascending order')
          let sortedData = _.sortBy( data, value);
          console.log(sortedData);
          // CALL DISPATCH TO UPDATE STATE
          dispatch(sortByAsc(sortedData))
      }

      // SORT BY DESC
      function sortByDESC(value) {
        console.log('sorting places by descending order')
        let sortedData = _.reverse(_.sortBy( data, value));
        console.log(sortedData);
        // CALL DISPATCH TO UPDATE STATE
        dispatch(sortByDesc(sortedData))
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

      // Change Page
      // const paginate = (pageNumber) => setCurrentPage(pageNumber)
      

     
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
      const fetch = async () => { 

        try {

            // const variables = {
            //   nextToken,
            //   limit: 4,
            // }

            // console.log('variables', variables)

          // === Uses the Amplify API category to call the AppSync GraphQL API with the listPlaces query. Once the data is returned, the items array is passed in to the setPlaces function to update the local state.
          // const placesData = await API.graphql(graphqlOperation(listPlaces, variables))
          const placesData = await API.graphql(graphqlOperation(listPlaces))
          const data = placesData.data.listPlaces.items

          // setNextNextToken(placesData.data.listPlaces.nextToken)

          dispatch(getPlaces(data))
        } catch(err) {
          console.log('error fetching places', err)
          // dispatch({
          //     type: Types.FAILED_GET_PLACES,
          //     payload: err.response.data
          // }) 
        }
      }
      fetch();
     
    // }, [nextToken, completeDeletedPlace])
     // eslint-disable-next-line
  }, [completeDeletedPlace])
    
    useEffect(() => {
      // FLAG API.
      const fetchFlags = async() => {
        try {
          const requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

          const res = await fetch("https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,dialCode", requestOptions);
         
          const countryData = await res.json();
          const countryDataFiltered = data.map((visitedPlace) => countryData.data.filter((country) => visitedPlace.country.toLowerCase() === country.name.toLowerCase()))
          console.log(countryDataFiltered)

        } catch (error) {
          console.log('error', error)
        }
      }
  if(data && data?.length > 0) {
    fetchFlags();
  }
    
    }, [data]);

    if(loading) {
      return <span>loading data...</span>
    }

    // Get current place
    // const indexOfLastPlace = currentPage * placesPerPage;
    // const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
    // const currentPlaces = data.slice(indexOfFirstPlace, indexOfLastPlace)


    // const next = () => {
    //   setPreviousTokens((prev) => [...prev, nextToken])
    //   setNextToken(nextNextToken)
    //   setNextNextToken(null)
    // }

    // const prev = () => {
    //   setNextToken(previousTokens.pop())
    //   setPreviousTokens([...previousTokens])
    //   setNextNextToken(null)
    // }

    return (
      <>
        { data.length > 0 &&
          <Search 
            search={search}
            setSearch={setSearch}
            sortByDESC={sortByDESC}
            sortByASC={sortByASC}
          />
        }
        <Box className={classes.container}>
          <Grid container spacing={4}>
            { data.length > 0 ?
                searchPlace(data).map((place, index) => (
                 <PlacesItem key={index} place={place} deletePlace={deletePlace}/>
                )) : ( 
                  <Grid item xs={12}>
                    <Typography variant="body1">You have not added any places yet.</Typography>
                  </Grid>
                )
            }
          </Grid>
          {/* { data.length > 0 && (<Pagination placesPerPage={placesPerPage} totalPlaces={data.length} paginate={paginate}/>)} */}

          {/* {previousTokens.length > 0 && <Button onClick={prev} variant="outlined">Prev</Button>}
          <Button onClick={next} variant="outlined">Next</Button> */}
         
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
