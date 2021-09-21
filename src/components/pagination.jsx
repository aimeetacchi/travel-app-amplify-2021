import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    pagination: {
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'center',
    },
    pageItem: {
        padding: '0 10px',
    },
    pageLink: {
        color: 'white',
        fontSize: 20,
        textDecoration: 'none',

        '&:hover': {
            textDecoration: 'underline',
        }
    }
    
  })
  

const Pagination = ({placesPerPage, totalPlaces, paginate}) => {
    const classes = useStyles();

    const pageNumbers = [];


    for (let i = 1; i <= Math.ceil(totalPlaces / placesPerPage); i++) {
        pageNumbers.push(i);
    };
   

    return (
        <nav className={classes.root}>
            <ul className={classes.pagination}>
                { pageNumbers.map((pageNum) => (
                        <li key={pageNum} className={classes.pageItem}>
                            <a onClick={() => paginate(pageNum)} href='/places/#!' className={classes.pageLink}>
                                {pageNum}
                            </a>
                        </li>
                    ))}
            </ul>
        </nav>
    )
}

export default Pagination
