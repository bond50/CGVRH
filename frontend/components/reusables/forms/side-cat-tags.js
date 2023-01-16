import React from 'react';
import FileUpload from "../../form/FileUpload";

const SideCatTags = ({
                         categories,
                         loading,
                         formData,
                         setLoading,
                         tags,
                         featuredServices,
                         hidden,
                         folder,
                         setValues,
                         values
                     }) => {


    return (
        <>
            {!hidden && <FileUpload
                setValues={setValues}
                values={values}
                loading={loading}
                formData={formData}
                setLoading={setLoading}
                folder={folder}
            />}
            {featuredServices ? <div className='mb-3'>
                <h5>Nature</h5>
                <hr/>
                <div className='list-group list-group-flush'>{featuredServices()}</div>
            </div> : null}

            {categories && <div className='mb-3'>
                <h5>Categories</h5>
                <hr/>
                <div style={{maxHeight: '200px', overflowY: 'auto'}}
                     className='list-group list-group-flush'>{categories()}</div>
            </div>}
            {tags && <div>
                <h5>Tags</h5>
                <hr/>
                <div style={{maxHeight: '200px', overflowY: 'auto'}}
                     className='list-group list-group-flush'>{tags()}
                </div>
            </div>
            }
        </>
    )

}

export default SideCatTags;