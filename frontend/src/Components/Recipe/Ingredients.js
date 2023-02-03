import React from 'react'

function Ingredients({ingredients}) {

    return (
        <div id="ingredients">
            <h3>Ingredients:</h3>
            <div className='list-ingre'>
                {
                    ingredients.map((el,i)=>{
                        return (
                            <div className='ingredient'>
                                <span>
                                    {i}
                                </span>
                                <div>
                                    {el}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Ingredients