import React from 'react';
// image
import ftLogoImg from "../images/ft-logo.png";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGithub } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons"

function Footer() {
  return (
    <>
        <base target="_blank" />
        <div id="ft-logo"> <img src={ftLogoImg} alt="import-H" /></div>
        <div id="menu">
            <span><a href="https://discord.gg/KfuD9yBt5e"><FontAwesomeIcon icon={faDiscord} />Discord</a></span>
            <span><a href="https://github.com/import-H"><FontAwesomeIcon icon={faGithub} />GitHub</a></span>
        </div>
        <div id="copy">Copyright &copy; 2022 Import-H. ALL RIGHT RESERVED.</div>
        
    </>
  )
}

export default Footer