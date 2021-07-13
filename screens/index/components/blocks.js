/*
 * @Author: your name
 * @Date: 2021-07-05 02:36:14
 * @LastEditTime: 2021-07-07 00:42:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/idena-explorer/screens/index/components/blocks.js
 */
import CountUp from 'react-countup'
import { useEffect, useState } from 'react'
import { getBlocks } from '../../../shared/api'
const initialState = {
    blockHeight: -1,
    prevBlockHeight: -1
}
export default function Blocks () {
    const [state, setState] = useState(initialState)
    const { blockHeight, prevBlockHeight } = state
    useEffect(() => {
        async function getData () {
            const { block } = await getBlocks()
            const newBlockHeight = parseInt(block[0][1])
            if (newBlockHeight > blockHeight) {
                setState(newState => {
                    return {
                        prevBlockHeight: newState.blockHeight !== -1 ? newState.blockHeight : newBlockHeight,
                        blockHeight: newBlockHeight
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
            <CountUp
                duration={1100 / 1000}
                start={prevBlockHeight}
                end={blockHeight}
                useEasing={false}
                formattingFn={value => value.toLocaleString()}
            />
        </h3>
    )
}
