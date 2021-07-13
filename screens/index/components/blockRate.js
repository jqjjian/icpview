/*
 * @Author: your name
 * @Date: 2021-07-05 02:36:14
 * @LastEditTime: 2021-07-07 00:39:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/idena-explorer/screens/index/components/blocks.js
 */
// import CountUp from 'react-countup'
import { useEffect, useState } from 'react'
import { getBlockRate } from '../../../shared/api'
const initialState = {
    blockRate: '-'
}
export default function BlockRate () {
    const [state, setState] = useState(initialState)
    useEffect(() => {
        async function getData () {
            const res = await getBlockRate()
            const blockRate = parseFloat(res.block_rate[0][1]).toFixed(2)
            setState(newState => {
                return {
                    blockRate
                }
            })
        }
        getData()
        const time = setInterval(() => { getData() }, 5000)
        return () => {
            clearInterval(time)
        }
    }, [])
    return (
        <h3 className="info_block__accent">
            {state.blockRate} bps
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
