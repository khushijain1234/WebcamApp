import React, { useState } from 'react'

const Gallery = ({images}) => {
    const [showImg, setShowImg] = useState('');

  return (
    <div className='img-gallery'>
        <h1>Image Gallery</h1>
        <div className='img-container'>
            {
                images.length>0? images.map((img)=>{
                    return(
                    <>
                    <img className='image' onClick={()=>setShowImg(img)} width={200} src={img} alt='img' />
                    <div className={`img-modal ${showImg? 'd-block':''}`} style={showImg? {display: 'block'}: {}} onClick={()=>setShowImg('')}>
                        <img className='modal-content' src={showImg} alt='modal-img'/>
                    </div>
                    </>
                    );
                }) :
                <div>
                    <h2 style={{color: 'white', fontSize: '2rem'}}>No Data</h2>
                </div>
            }
        </div>
    </div>
  )
}

export default Gallery