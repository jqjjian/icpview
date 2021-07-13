/*
 * @Author: your name
 * @Date: 2021-07-01 11:42:41
 * @LastEditTime: 2021-07-14 02:48:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/idena-explorer/screens/index/components/supply.js
 */
// import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getNodesCount } from '../../../shared/api'
// import { precise1, dnaFmt } from '../../../shared/utils/utils'
import TooltipText from '../../../shared/components/tooltip'
import MessageCount from './messages-count'
import MessageRate from './messages-rate'

const initialState = {
    nodesCount: '-'
}

export default function Supply () {
    const [state, setState] = useState(initialState)

    useEffect(() => {
        async function getData () {
            const res = await getNodesCount()
            setState({
                nodesCount: res.ic_nodes_count[0][1]
            })
        }
        getData()
    }, [])

    return (
        <div className="col-12 col-sm-6">
            <h1>消息</h1>
            <div className="card">
                <div className="info_block">
                    <div className="row">
                        <div className="col-12 col-sm-4 bordered-col">
                            <MessageCount />
                            <TooltipText
                                className="control-label"
                                data-toggle="tooltip"
                                tooltip="当前总消息数"
                            >
                                当前总消息数
                            </TooltipText>
                        </div>
                        <div className="col-12 col-sm-4 bordered-col">
                            <MessageRate />
                            <TooltipText
                                tooltip="消息数/每秒"
                                className="control-label"
                                data-toggle="tooltip"
                            >
                                当前消息速度
                            </TooltipText>
                        </div>
                        <div className="col-12 col-sm-4 bordered-col">
                            <h3 className="info_block__accent">{state.nodesCount}</h3>
                            <TooltipText
                                className="control-label"
                                data-toggle="tooltip"
                                tooltip="ICP网络节点数"
                            >
                                当前节点数
                            </TooltipText>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
