/*
 * @Author: your name
 * @Date: 2021-07-01 11:42:41
 * @LastEditTime: 2021-07-04 16:07:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/idena-explorer/shared/utils/session-context.js
 */
import { useEffect, useState, createContext, useContext } from 'react'
import { useQuery } from 'react-query'
import { getCurrentSession, logout as doLogout } from '../api'

// const SessionContext = createContext()

// eslint-disable-next-line react/prop-types
function SessionProvider ({ children }) {
    const [state, setState] = useState({ auth: false, ready: false })
    const { data: sessionResult, status: sessionStatus } = useQuery(
        ['auth/session-provider'],
        () => getCurrentSession(),
        { retry: false }
    )

    useEffect(() => {
        if (sessionResult) {
            setState({ auth: true, address: sessionResult.address, ready: true })
        } else if (sessionStatus === 'error') {
            setState({ auth: false, ready: true })
        }
    }, [sessionResult, sessionStatus])

    const logout = () => {
        doLogout().then(() => setState({ auth: false, ready: true }))
    }

    const setSession = (address) => {
        setState({ auth: true, ready: true, address })
    }

    return (
        <SessionContext.Provider value={{ session: state, logout, setSession }}>
            {children}
        </SessionContext.Provider>
    )
}

// function useSession() {
// const context = useContext(SessionContext)
// if (context === undefined) {
//   throw new Error('useSession must be used within a SessionProvider')
// }
//   return context
// }

export { SessionProvider }
