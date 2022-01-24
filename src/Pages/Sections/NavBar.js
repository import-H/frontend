import React from 'react';
import UserMenu from './UserMenu';

function NavBar() {
    return (
        <nav>
            <div id="content">
                <span id="logo"><h1><a href="/">Import-H</a></h1></span>
                <div id="log">
                    <UserMenu />
                </div>
            </div>
        </nav>
    )
}

export default NavBar
