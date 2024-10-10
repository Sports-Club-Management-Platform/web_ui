import { Outlet } from 'react-router-dom'

const CleanLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export {CleanLayout}