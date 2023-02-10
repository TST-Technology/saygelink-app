import React from 'react'
import Logo from '../../assets/images/Logo_Mobile_Page.png'
import Background_Image from '../../assets/images/Background_Mobile_Page.png'

const Mobile = () => {
    const onDownload = () => {
        window.location.assign('https://saygelink.page.link/app')
    }
    return (
        <>
            <div className='text-center' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Background_Image})`, height: '100vh', width: '100%' }}>
                <img src={Logo} width='130px' style={{ marginTop: '20vh' }} />
                <p className='text-light fw-bold my-3'> Download our app for an immersive experience when on the go</p>
                <button onClick={onDownload} className='py-2 w-75 my-5 fw-bold text-danger' style={{ backgroundColor: '#abe9dc', border: 'none', borderRadius: '8px' }}>Install</button>
            </div>
        </>
    )
}

export default Mobile