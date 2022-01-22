import React from 'react';
import UserMenu from './UserMenu';

function NavBar() {
    return (
        <nav>
            <span id="logo"><h1><a href="/">Import-H</a></h1></span>
            <div id="log">
                <UserMenu />
            </div>
        </nav>
    )
}

export default NavBar
