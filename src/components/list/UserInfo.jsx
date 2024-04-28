import React from 'react'

const UserInfo = () => {
    return (
        <div className='flex p-2 justify-between'>
            <div className="flex justify-between text-center">
                <img src={ "./avatar.png"} alt="" className=' object-cover rounded-full w-16 h-16'/>
                <h2>Hammad</h2>
            </div>
            <div className="flex">
                <img src="./more.png" alt="" className=' object-cover rounded-full w-6 h-6'/>
                <img src="./video.png" alt="" className=' object-cover rounded-full w-6 h-6'/>
                <img src="./edit.png" alt="" className=' object-cover rounded-full w-6 h-6'/>
            </div>
        </div>
    )
}

export default UserInfo;