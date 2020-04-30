import React from 'react'

export default function Error(props) {
    return (
        <div className="ErrorComponent containter">
            <div className="row mb-4 mt-4">

                <div className="col-md-12 text-center mb-4 mt-4 pt-4 pb-4">
                    <h1>#{props.error ? props.error : "404"} - {props.code ? props.code : "Page not found"}</h1>
                </div>

            </div>
        </div>
    )
}