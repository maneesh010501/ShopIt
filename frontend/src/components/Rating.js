import React from 'react'

const Rating = ({value,numReviews}) => {
        const fullStar = "fa-solid fa-star"
        const halfStar = "fa-solid fa-star-half-stroke"
        const emptyStar = "fa-regular fa-star" 
  
  return (
    <div>
        <span>
            <i className={value>=1 ? fullStar : value>=0.5 ? halfStar : emptyStar }></i>
        </span>
        <span>
            <i className={value>=2 ? fullStar : value>=1.5 ? halfStar : emptyStar }></i>
        </span>
        <span>
            <i className={value>=3 ? fullStar : value>=2.5 ? halfStar : emptyStar }></i>
        </span>
        <span>
            <i className={value>=4 ? fullStar : value>=3.5 ? halfStar : emptyStar }></i>
        </span>
        <span>
            <i className={value>=5 ? fullStar : value>=4.5 ? halfStar : emptyStar }></i>
        </span>
        <span>  </span>
        <span>
            {numReviews}
        </span>

        
    </div>
  )
}

export default Rating