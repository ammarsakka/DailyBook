import { AiOutlineInfoCircle } from 'react-icons/ai'
import axios from 'axios'
import URL_API from '../api/Url'
import { SuccessModule } from '../modules/SuccessModule'

export const ActivateUser = ({ isModule, setModule, details, reload }) => {
    const handleSubmit = () => {
        axios.post(
            URL_API,
            { id: details[0]?.user_id, play: 'activateuser' },
            { headers: { "content-type": "application/json" } }
        ).then((result) => {
            reload()
            setModule(false)
        })
    }

    return (
        <SuccessModule isModule={isModule} setModule={setModule} handleSubmit={handleSubmit} name={'activate'}>
            <div className='w-full flex flex-col justify-center items-center'>
                <AiOutlineInfoCircle size={100} className='!fill-green-700' />
                <div className='my-4'>
                    <p className='capitalize font-semibold text-2xl tracking-wide my-2 text-center'>
                        Activate {details[0]?.full_name}?
                    </p>
                </div>
            </div>
        </SuccessModule>
    )
}
