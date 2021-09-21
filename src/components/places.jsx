import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import _ from 'lodash'
import Search from './search'
import PlacesItem from './placesItem'
import Pagination from './pagination'

import { getPlaces, deleteSelectedPlace} from '../actions/places'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import {
  Box,
  Typography,
  Grid,
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


    const [currentPage, setCurrentPage] = useState(1);
    const [placesPerPage] = useState(4);

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
      const paginate = (pageNumber) => setCurrentPage(pageNumber)
      

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

    if(loading) {
      return <span>loading data...</span>
    }

    // Get current place
    const indexOfLastPlace = currentPage * placesPerPage;
    const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
    const currentPlaces = data.slice(indexOfFirstPlace, indexOfLastPlace)

    return (
      <>
        { data.length > 0 &&
          <Search search={search} setSearch={setSearch} />
        }
        <Box className={classes.container}>
          <Grid container spacing={4}>
            { data.length > 0 ?
                searchPlace(currentPlaces).map((place, index) => (
                 <PlacesItem key={index} place={place} deletePlace={deletePlace}/>
                )) : ( 
                  <Grid item xs={12}>
                    <Typography variant="body1">You have not added any places yet.</Typography>
                  </Grid>
                )
            }
          </Grid>
          { data.length > 0 && (<Pagination placesPerPage={placesPerPage} totalPlaces={data.length} paginate={paginate}/>)}
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
