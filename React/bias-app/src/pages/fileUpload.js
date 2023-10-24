import React, { useState, useEffect } from 'react'
import api from '../api'

const fileUpload = (event) => {
    const file = event.target.file[0];
    if (file) {
        console.log('fileUploaded')
    }


    fetch("/uplaod/", {
        method: "POST",
        body: FormData,
    })
        .then((respose) => respose.json())
        .then((data) => {
            console.log(data);
        })

        .catch((error) => {
            console.error(error)
        })

    return (
        <div>
            <nav className='navbar navbar-dark bg-primary'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href='#'>
                        Bias App
                    </a>
                </div>
            </nav>

            <div className='mb-3'>
                <label htmlFor='file' className='form-label'>
                    Upload a File
                </label>
                <input type="file" accept=".csv" onChange={fileUpload}/>
            </div>
        </div>
        )
};
            export default fileUpload;