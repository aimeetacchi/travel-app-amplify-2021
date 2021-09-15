import React from 'react'
import { useSelector } from 'react-redux'

import {
    Box,
    Typography,
  } from '@material-ui/core/';

const Profile = () => {
    const profileState = useSelector((state) => state.profile.data);
    const profile = profileState[0];
    return (
        <Box>
            <Typography variant="h3">Name: {profile.name}</Typography>
            <Typography variant="body2">Location: {profile.location}</Typography> 
            <Typography variant="body2">Bio: {profile.bio}</Typography> 
        </Box>
    )
}

export default Profile
