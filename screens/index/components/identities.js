// import Link from 'next/link'
// import { useEffect, useState } from 'react'
// import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts'
// import {
// getOnlineMinersCount,
// getOnlineIdentitiesCount
// getEpochsData,
// getBlockRate
// } from '../../../shared/api'
import TooltipText from '../../../shared/components/tooltip'
import Blocks from './blocks'
import BlockRate from './blockRate'

// const initialState = {
//     epoch: 0,
//     online: '-',
//     total: '-'
// }

export default function Identities () {
    // const [state, setState] = useState(initialState)
    // // const [chartData, setChartData] = useState([
    // //     { name: 0, value: 0 },
    // //     { name: 1, value: 1 }
    // // ])
    // useEffect(() => {
    //     async function getData () {
    //         const [online, total] = await Promise.all([
    //             getOnlineMinersCount(),
    //             getOnlineIdentitiesCount()
    //         ])
    //         // const _blockRate = blockRate[0][1]
    //         setState({
    //             online,
    //             total
    //             // blockRate: parseFloat(blockRate.block_rate[0][1]).toFixed(1)
    //         })
    //     }
    //     getData()
    // }, [])

    // useEffect(() => {
    //     async function getData () {
    //         const epochData = await getEpochsData(51)
    //         const nextChartData = epochData
    //             .reverse()
    //             .map((item) => ({
    //                 epoch: item.epoch + 1,
    //                 date: item.validationTime,
    //                 network: item.validatedCount
    //             }))
    //             .splice(0, epochData.length - 1)
    //         // setChartData(nextChartData)
    //     }
    //     getData()
    // }, [])

    // function getEpochInfo (index) {
    //     return chartData[index]
    // }

    // function CustomTooltip ({ payload, label, active }) {
    //     if (active) {
    //         const epochInfo = getEpochInfo(label)
    //         return (
    //             <div
    //                 className="custom-tooltip"
    //                 style={{
    //                     fontSize: '0.765rem',
    //                     color: 'white',
    //                     backgroundColor: '#53565c',
    //                     padding: '12px',
    //                     borderRadius: '4px',
    //                     lineHeight: '3px'
    //                 }}
    //             >
    //                 <p className="label">{`Size: ${
    //                     payload[0] && payload[0].value
    //                 }`}</p>
    //                 <p className="label">{`Epoch: ${epochInfo.epoch}`}</p>
    //             </div>
    //         )
    //     }

    //     return null
    // }

    return (
        <div className="col-12 col-sm-6">
            <h1>区块</h1>
            <div className="card">
                <div className="info_block">
                    <div className="row">
                        <div className="col-12 col-sm-8 bordered-col">
                            <Blocks />
                            <TooltipText
                                className="control-label"
                                data-toggle="tooltip"
                                tooltip="当前出块数量"
                            >
                                当前出块数量
                            </TooltipText>
                            {/* <div style={{width: '100%', height: '2.43rem'}}> */}
                            {/* <ResponsiveContainer>
                  <AreaChart data={chartData}>
                    <Area
                      type="monotone"
                      dataKey="network"
                      stroke="#578fff"
                      fill="#578fffaa"
                      strokeWidth={2}
                      activeDot={{r: 3}}
                      dot={{r: 0}}
                    />
                    <Tooltip cursor={false} content={<CustomTooltip />} />
                  </AreaChart>
                </ResponsiveContainer> */}
                            {/* </div> */}

                            <TooltipText
                                className="control-label hide-border"
                                data-toggle="tooltip"
                                tooltip="查看更多网络状态 https://internetcomputer.org/"
                            >
                                {/* <a href="https://idena.today" target="blank">
                  Network stats &rsaquo;
                </a> */}
                            </TooltipText>
                        </div>

                        <div className="col-12 col-sm-4 bordered-col">
                            <BlockRate />
                            <TooltipText
                                className="control-label"
                                data-toggle="tooltip"
                                tooltip="出块数/每秒"
                            >
                                当前出块速度
                            </TooltipText>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
