import React from 'react'

function Directions({steps}) {
  return (
    <div id="directions">
        <h2>Directons</h2>
        <div className='direc-div'>
            {
                steps.map((el,i)=>{
                    if(el.length==0) return 
                    return (
                        <div className='stepDiv'>
                            <span>
                                Step {i+1}
                            </span>
                            <p>
                                {el}.
                            </p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Directions