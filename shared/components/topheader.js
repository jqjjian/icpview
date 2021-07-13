import { useEffect, useState } from 'react'
import TooltipText from './tooltip'
import { usdFmt, precise2 } from '../utils/utils'

import {
    // getOnlineIdentitiesCount,
    getCoingeckoData,
    getCoinMarketData
    // getOnlineMinersCount,
    // getEpochRewardsSummary,
    // getLastEpoch,
    // getEpoch,
    // getEpochIdentitiesSummary,
    // getEpochRewardBounds
} from '../api'

export default function TopHeader () {
    const [marketData, setMarketData] = useState({
        price: 0,
        priceChange: 0,
        marketCap: 0
    })
    useEffect(() => {
        async function getData () {
            const res = await Promise.all([getCoingeckoData(), getCoinMarketData()])
            const icp = res[0]['internet-computer']
            const icp2 = res[1].market_data
            setMarketData({
                price: icp && icp.usd,
                priceChange: icp && icp.usd_24h_change,
                marketCap: icp && icp.usd_market_cap,
                totalSupply: icp2 && icp2.total_supply,
                circulatingSupply: icp2 && icp2.circulating_supply
            })
        }
        getData()
    }, [])

    // const [epoch, setEpoch] = useState(1)
    // const [nodesData, setNodesData] = useState({
    //     onlineCount: 1,
    //     nodesCount: undefined
    // })
    // const [validationTime, setValidationTime] = useState(0)
    // const [epochData, setEpochData] = useState({
    //     prevNodesCount: 0,
    //     epochDuration: 0,
    //     totalRewardsPaid: 0
    // })

    // useEffect(() => {
    //     async function getData () {
    //         const [identitiesSummary, { validationTime: prevValidationTime }, rewardsSummary] =
    //             await Promise.all([
    //                 getEpochIdentitiesSummary(epoch - 1),
    //                 getEpoch(epoch),
    //                 getEpochRewardsSummary(epoch)
    //             ])

    //         const firstDate = new Date(prevValidationTime)
    //         const secondDate = new Date(validationTime)
    //         const epochDuration = Math.round(Math.abs((firstDate - secondDate) / 86400000))

    //         const getCount = (src, state) =>
    //             (src.find((x) => x.value === state) || { count: 0 }).count

    //         const prevNodesCount =
    //             identitiesSummary && identitiesSummary.length
    //                 ? getCount(identitiesSummary, 'Human') +
    //                   getCount(identitiesSummary, 'Verified') +
    //                   getCount(identitiesSummary, 'Newbie')
    //                 : 0

    //         setEpochData({
    //             prevNodesCount,
    //             epochDuration,
    //             totalRewardsPaid: rewardsSummary.total
    //         })
    //     }
    //     if (epoch && validationTime) getData()
    // }, [epoch, validationTime])

    // const [rewardsData, setRewardsData] = useState({
    //     maxRewardPaid: 0,
    //     minRewardPaid: 0
    // })

    // useEffect(() => {
    //     async function getData () {
    //         const rewardBounds = await getEpochRewardBounds(epoch)
    //         const minRewardPaid =
    //             rewardBounds &&
    //             rewardBounds.reduce(
    //                 (min, item) => (min <= item.min.amount * 1 ? min : item.min.amount * 1),
    //                 rewardBounds && rewardBounds[0] ? rewardBounds[0].min.amount : 0
    //             )
    //         const maxRewardPaid =
    //             rewardBounds &&
    //             rewardBounds.reduce(
    //                 (max, item) => (max >= item.max.amount * 1 ? max : item.max.amount * 1),
    //                 0
    //             )

    //         setRewardsData({
    //             maxRewardPaid,
    //             minRewardPaid
    //         })
    //     }
    //     if (epoch) getData()
    // }, [epoch, epochData])

    // useEffect(() => {
    //     async function getData () {
    //         const [onlineCount, nodesCount, { epoch, validationTime }] = await Promise.all([
    //             getOnlineMinersCount(),
    //             getOnlineIdentitiesCount(),
    //             getLastEpoch()
    //         ])
    //         setEpoch(epoch * 1 - 1)
    //         setValidationTime(validationTime)

    //         setNodesData({
    //             onlineCount,
    //             nodesCount
    //         })
    //     }
    //     getData()
    // }, [])

    return (
        <div>
            <div className="topheader">
                <div className="topheader-div">
                    <div className="container">
                        <Card
                            name="ICP 价格"
                            value={usdFmt(precise2(marketData.price))}
                            change={marketData.priceChange}
                            tooltip="ICP 24小时价格趋势 https://coingecko.com"
                            href="https://www.coingecko.com/en/search_redirect?id=internet-computer&type=coin"
                            blank
                        />

                        {/* <Card
              name="Epoch mining"
              value={usdFmt(
                precise1(
                  (marketData.price * 25920 * epochData.epochDuration) /
                    nodesData.onlineCount
                )
              )}
              tooltip={`Epoch mining rewards per user (${epochData.epochDuration} days)`}
            /> */}
                        {/* <Card
              name="Validation rewards"
              value={
                rewardsData.minRewardPaid &&
                rewardsData.maxRewardPaid &&
                marketData.price
                  ? `${usdFmt(
                      precise1(rewardsData.minRewardPaid * marketData.price)
                    )} - ${usdFmt(
                      precise1(rewardsData.maxRewardPaid * marketData.price)
                    )}`
                  : '-'
              }
              tooltip="Last validation rewards paid per user"
              href={`/epoch/${epoch + 1}/rewards`}
            /> */}
                        {/* <Card
              name="Rewards paid"
              value={usdFmt(
                Math.round(epochData.totalRewardsPaid * marketData.price)
              )}
              tooltip="Total rewards paid for last validation"
              href={`/epoch/${epoch + 1}/rewards`}
            /> */}
                        <Card
                            name="ICP 市值"
                            value={usdFmt(Math.round(marketData.marketCap))}
                            tooltip="查看更多 ICP 市值信息"
                            href="https://www.coingecko.com/en/search_redirect?id=internet-computer&type=coin"
                            blank
                        />
                        <Card
                            name="ICP 发行量"
                            value={usdFmt(Math.round(marketData.totalSupply), '')}
                            tooltip="查看更多 ICP 发行量信息"
                            href="https://www.coingecko.com/en/search_redirect?id=internet-computer&type=coin"
                        />
                        <Card
                            name="ICP 流通量"
                            value={usdFmt(Math.round(marketData.circulatingSupply), '')}
                            tooltip="查看更多 ICP 流通量信息"
                            href="https://www.coingecko.com/en/search_redirect?id=internet-computer&type=coin"
                        />
                        {/* <Card
              name="Network size"
              value={nodesData.nodesCount}
              change={
                nodesData.nodesCount && epochData.prevNodesCount
                  ? ((nodesData.nodesCount - epochData.prevNodesCount) /
                      epochData.prevNodesCount) *
                    100
                  : undefined
              }
              tooltip="Total nodes | Change since last validation"
            /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

function Card ({ name, value, tooltip = '', change = '', href = '', blank = false }) {
    const changeValue = Math.abs(Math.round(change * 10) / 10)
    return (
        <TooltipText tooltip={tooltip}>
            <div className="item">
                <div className="content">
                    <span>{name}</span>
                    <div
                        style={{
                            color: 'white',
                            fontSize: '0.987rem'
                        }}>
                        <span>{value}</span>
                        {change && (
                            <span>
                                <span style={{ color: '#e8eaed90', padding: '2px' }}> ❘ </span>
                                <span style={{ color: `${change > 0 ? '#27d980' : '#ff6666'}` }}>
                                    <span style={{ verticalAlign: 'middle', fontSize: '6px' }}>
                                        {`${change > 0 ? '▲' : '▼'}  `}
                                    </span>
                                    {`${changeValue}%`}
                                </span>
                            </span>
                        )}
                    </div>
                    {href && (
                        <a
                            href={href}
                            target={blank ? '_blank' : ''}
                            rel={blank ? 'noreferrer' : ''}>
                            {' '}
                        </a>
                    )}
                </div>
            </div>
        </TooltipText>
    )
}
