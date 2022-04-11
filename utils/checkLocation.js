/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Bradley Crisp - Group 12
    IDE Version: Visual Studio Code
    Current Version: Managed by GitHub
    Date Created: 11/04/2022
    Date Finished: 
    Last Modified: 

 -------DESCRIPTION-------


*/

const checkParkedLocation = (location, parkingSpace) => {
        // The math module contains a function
        // named toRadians which converts from
        // degrees to radians.
        const lon1 = location.userGpsLong * Math.PI / 180;
        const lon2 = parkingSpace.gpsLong * Math.PI / 180;
        const lat1 = location.userGpsLat * Math.PI / 180;
        const lat2 = parkingSpace.gpsLat * Math.PI / 180;
   
        // Haversine formula
        const dlon = lon2 - lon1;
        const dlat = lat2 - lat1;
        const a = (Math.sin(dlat / 2)**2)
                 + Math.cos(lat1) * Math.cos(lat2)
                 * (Math.sin(dlon / 2)**2);
               
        const c = 2 * Math.asin(Math.sqrt(a));
   
        // Radius of earth in kilometers. Use 3956
        // for miles
        const r = 6371;

        // calculate the result
        const result = c*r;

        if (result < 0.001) {
            return(true);
        }

        return(false);   
}

module.exports = 
{
    checkParkedLocation
}