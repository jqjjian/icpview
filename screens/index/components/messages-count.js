/*
 * @Author: your name
 * @Date: 2021-07-05 02:36:14
 * @LastEditTime: 2021-07-07 00:43:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/idena-explorer/screens/index/components/blocks.js
 */
import CountUp from 'react-countup'
import { useEffect, useState } from 'react'
import { getMessageCount } from '../../../shared/api'

const initialState = {
    currentMsg: -1,
    prevMsg: -1
}
export default function MessageCount () {
    const [state, setState] = useState(initialState)
    const { currentMsg, prevMsg } = state
    useEffect(() => {
        async function getData () {
            const res = await getMessageCount()
            const messageCount = parseInt(res.messages_count[0][1])
            if (messageCount > prevMsg) {
                setState(newState => {
                    return {
                        prevMsg: newState.currentMsg !== -1 ? newState.currentMsg : messageCount,
                        currentMsg: messageCount
                    }
                })
            }
        }
        getData()
        const time = setInterval(() => { getData() }, 5000)
        return () => {
            clearInterval(time)
        }
    }, [])
    return (
        <h3 className="info_block__accent">
            {/* {state.messageRate} mps */}
            <CountUp
                duration={1100 / 1000}
                start={prevMsg}
                end={currentMsg}
                useEasing={false}
                formattingFn={value => value.toLocaleString()}
            />
        </h3>
    )
}
