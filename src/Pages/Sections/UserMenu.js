import React from 'react'

function UserMenu() {
    return (
        <span>
            <span className='element'><a href="/login">로그인</a></span>
            <span className='element'><a href="/register">회원가입</a></span>
        </span>
    )
}

export default UserMenu
