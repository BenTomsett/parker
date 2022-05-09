/*  CMP5012B - Software Engineering - Coursework 2 -  Parker
    Author: Liam Hubbard - Group 12
    IDE Version: Jetbrains Webstorm
    Current Version: Managed by GitHub
    Date Created: 09/05/2022
    Date Finished:
    Last Modified: 09/05/2022 - Liam H

 -------DESCRIPTION-------

This is to tie in with the user auth util it checks whether a user is an admin to use when making an admin request

 */

function verifyAdminUser(User){
    return User.isAdmin === true;
}