import { useState } from 'react';

export default function Game ({guess, word}) {
    

    return (

        <div id="col">
        {new Array(6).fill().map((_, i) => (
        <div id="grid"className="mb-3 grid grid-cols-5 gap-3">
            { new Array(5).fill().map((_, i) => (
                <div className="h-16 w-16 border uppercase items-center justify-center">
                    {guess[i]}
                </div>
            ))}

        </div>
        ))}
        </div>

    )

}