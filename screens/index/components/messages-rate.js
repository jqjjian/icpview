/*
 * @Author: your name
 * @Date: 2021-07-05 02:36:14
 * @LastEditTime: 2021-07-07 00:43:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/idena-explorer/screens/index/components/blocks.js
 */
// import CountUp from 'react-countup'
import { useEffect, useState } from 'react'
import { getMessageRate } from '../../../shared/api'
const initialState = {
    messageRate: '-'
}
export default function MessageCount () {
    const [state, setState] = useState(initialState)
    useEffect(() => {
        async function getData () {
            const res = await getMessageRate()
            const messageRate = parseFloat(res.message_execution_rate[0][1]).toFixed(2)
            setState(newState => {
                return {
                    messageRate
                }
            })
        }
        const time = setInterval(() => { getData() }, 5000)
        return () => {
            clearInterval(time)
        }
    }, [])
    return (
        <h3 className="info_block__accent">
            {state.messageRate} mps
            {/* <CountUp
                duration={1100 / 1000}
                start={prevBlockHeight}
                end={blockHeight}
                useEasing={false}
                formattingFn={value => value.toLocaleString()}
            /> */}
        </h3>
    )
}
