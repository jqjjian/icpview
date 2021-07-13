import Link from 'next/link'
import { useState, useEffect } from 'react'
// import { useInfiniteQuery, useQuery } from 'react-query'
// import { useInfiniteQuery, useQuery } from 'react-query'
import { getIcpStringFromE8s, dateTimeFmt } from '../../../shared/utils/utils'
import { getAccountTransactions } from '../../../shared/api'
// import { SkeletonRows } from '../../../shared/components/skeleton'
// import { WarningTooltip } from '../../../shared/components/tooltip'

const LIMIT = 25
const intiState = { count: '-', rows: [], isLoading: false, error: null }
export default function Transactions ({ address, visible, setAddressInfo }) {
    const [state, setState] = useState(intiState)
    const [page, setPage] = useState(0)
    // const fetchTransactions = (_, address) => {
    //     const params = {
    //         orderBy: 'blockHeight',
    //         order: 'desc',
    //         pageSize: LIMIT,
    //         page,
    //         accountId: address
    //     }
    //     getAccountTransactions(params)
    // }
    // const { isLoading, error } = state
    function handlePageing () {
        setPage(page + 1)
    }
    async function getData (_page) {
        const params = {
            orderBy: 'blockHeight',
            order: 'desc',
            pageSize: LIMIT,
            page: _page || page,
            accountId: address
        }
        if (_page) {
            setState({
                count: '-',
                rows: [],
                isLoading: true,
                rosettaError: null
            })
        }
        const { status, data } = await getAccountTransactions(params)
        console.log(data)
        if (status === 200) {
            const { count, rows } = data
            setState((state) => {
                return {
                    count,
                    rows: state.rows && page === 0 ? rows : [...state.rows, ...rows],
                    isLoading: false,
                    rosettaError: null
                }
            })
            setAddressInfo(({ balance }) => {
                return { balance, count }
            })
        } else {
            setState((state) => {
                return {
                    count: state.count,
                    rows: state.rows ? state.rows : [],
                    isLoading: false,
                    rosettaError: null
                }
            })
        }
    }
    useEffect(() => {
        if (address) {
            setPage(0)
            getData(0)
        }
    }, [address])

    useEffect(() => {
        if (address) {
            // console.log(1221333)
            getData()
        }
    }, [page])
    // // setPage(0)
    // if (address) {
    //     // console.log(1221333)
    //     getData()
    // }
    // useEffect(() => {
    //     async function getData () {
    //         // const res = await rosettaApi.getTransactionsByAccount(address, {
    //         //     limit: 10,
    //         //     offset: 10
    //         //     // operator: 'or',
    //         //     // max_block: 5,
    //         //     // offset: 5
    //         // })
    //         const params = {
    //             orderBy: 'blockHeight',
    //             order: 'desc',
    //             pageSize: LIMIT,
    //             page,
    //             accountId: address
    //         }
    //         if (page === 1) {
    //             setState({
    //                 count: '-',
    //                 rows: [],
    //                 isLoading: true,
    //                 rosettaError: null
    //             })
    //         }
    //         const { status, data } = await getAccountTransactions(params)
    //         if (status === 200) {
    //             const { count, rows } = data
    //             setState((state) => {
    //                 return {
    //                     count,
    //                     rows: state.rows ? [...state.rows, ...rows] : rows,
    //                     isLoading: false,
    //                     rosettaError: null
    //                 }
    //             })
    //             setAddressInfo(({ balance }) => {
    //                 return { balance, count }
    //             })
    //         } else {
    //             setState((state) => {
    //                 return {
    //                     count: state.count,
    //                     rows: state.rows ? state.rows : [],
    //                     isLoading: false,
    //                     rosettaError: null
    //                 }
    //             })
    //         }
    //     }
    //     // setPage(0)
    //     if (address) {
    //         // console.log(1221333)
    //         getData()
    //     }
    // }, [address, page])

    // useEffect(() => {
    //     async function getData () {
    //         // const res = await rosettaApi.getTransactionsByAccount(address, {
    //         //     limit: 10,
    //         //     offset: 10
    //         //     // operator: 'or',
    //         //     // max_block: 5,
    //         //     // offset: 5
    //         // })
    //         const params = {
    //             orderBy: 'blockHeight',
    //             order: 'desc',
    //             pageSize: LIMIT,
    //             page,
    //             accountId: address
    //         }
    //         if (page === 1) {
    //             setState(state => {
    //                 return {
    //                     count: '-',
    //                     rows: [],
    //                     isLoading: false,
    //                     rosettaError: null
    //                 }
    //             })
    //         }
    //         const { status, data } = await getAccountTransactions(params)
    //         if (status === 200) {
    //             const { count, rows } = data
    //             setState((state) => {
    //                 return {
    //                     count,
    //                     rows: state.rows ? [...state.rows, ...rows] : rows,
    //                     isLoading: false,
    //                     rosettaError: null
    //                 }
    //             })
    //             setAddressInfo(({ balance }) => {
    //                 return { balance, count }
    //             })
    //         } else {
    //             setState((state) => {
    //                 return {
    //                     count: state.count,
    //                     rows: state.rows ? state.rows : [],
    //                     isLoading: false,
    //                     rosettaError: null
    //                 }
    //             })
    //         }
    //     }
    //     if (page > 0) {
    //         getData()
    //     }
    // }, [page])
    // const errorMessage = ''
    // if (error) {
    //     switch (error.errorType) {
    //     case RosettaError.NotFound:
    //         errorMessage = 'ERROR: Transaction not found.'
    //         break
    //     case RosettaError.Timeout:
    //         errorMessage = 'ERROR: Timed out while getting the transaction.'
    //         break
    //     default: // NetworkError
    //         errorMessage = 'ERROR: An error occurred while getting the transaction.'
    //         break
    //     }
    // }
    // const fetchTransactions = (_, address, continuationToken = null) =>
    //     getTransactions(address, LIMIT, continuationToken)

    // const { data, fetchMore, canFetchMore, status } = useInfiniteQuery(
    //     address && visible && `${address}/transactions`,
    //     [address],
    //     fetchTransactions,
    //     {
    //         getFetchMore: (lastGroup) =>
    //             lastGroup && lastGroup.continuationToken
    //                 ? lastGroup.continuationToken
    //                 : false
    //     }
    // )

    // const { data: transactionsCount } = useQuery(
    //     address && visible && `${address}/transactions/count`,
    //     [address],
    //     (_, address) => getTransactionsCount(address)
    // )
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>交易哈希</th>
                        <th>发送方</th>
                        <th>接收方</th>
                        <th>数量</th>
                        <th style={{ width: 100 }}>日期时间</th>
                        <th style={{ width: 100 }}>类型</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {!visible || (!status && <SkeletonRows cols={6} />)} */}
                    {state &&
                        state.rows &&
                        state.rows.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <div
                                        className="text_block text_block--ellipsis"
                                        style={{ width: 80 }}>
                                        <Link
                                            href="/transaction/[id]"
                                            as={`/transaction/${item.id}`}>
                                            <a>{item.id}</a>
                                        </Link>
                                    </div>
                                </td>
                                <td>
                                    <div className="user-pic">
                                        {/* <img
                                  src={`https://robohash.idena.io/${
                                      item.from && item.from.toLowerCase()
                                  }`}
                                  alt="pic"
                                  width="32"
                              /> */}
                                    </div>
                                    <div
                                        className="text_block text_block--ellipsis"
                                        style={{ width: 100 }}>
                                        {item.senderId && address.toLowerCase() === item.senderId.toLowerCase()
                                            ? (
                                                item.senderId
                                            )
                                            : (
                                                <Link
                                                    href="/address/[address]"
                                                    as={`/address/${item.senderId}`}>
                                                    <a>{item.senderId}</a>
                                                </Link>
                                            )}
                                    </div>
                                </td>
                                <td>
                                    {item.receiverId
                                        ? (
                                            <>
                                                <div className="user-pic"></div>
                                                <div
                                                    className="text_block text_block--ellipsis"
                                                    style={{ width: 100 }}>
                                                    {address.toLowerCase() ===
                                                item.receiverId.toLowerCase()
                                                        ? (
                                                            item.receiverId
                                                        )
                                                        : (
                                                            <Link
                                                                href="/address/[address]"
                                                                as={`/address/${item.receiverId}`}>
                                                                <a>{item.receiverId}</a>
                                                            </Link>
                                                        )}
                                                </div>
                                            </>
                                        )
                                        : (
                                            <div className="text_block text_block--ellipsis">-</div>
                                        )}
                                </td>
                                <td style={{ textAlign: 'right' }}>{getIcpStringFromE8s(item.amount)} ICP</td>
                                <td>{dateTimeFmt(item.createdDate)}</td>
                                <td>
                                    {item.type}
                                    {/* {item.txReceipt && !item.txReceipt.success && (
                                    <WarningTooltip
                                        tooltip={`Smart contract failed: ${item.txReceipt.errorMsg}`}
                                        placement="top"
                                        style={{ marginRight: '5px' }}
                                    />
                                )}
                                {txTypeFmt(item.type, item.data)} */}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="text-center" style={{ display: state.rows && state.rows.length > 0 && (page + 1) * LIMIT < state.count ? 'block' : 'none' }}>
                <button type="button" className="btn btn-small" onClick={() => handlePageing()}>
                    查看更多 ({state.count < LIMIT ? state.count : (page + 1) * LIMIT} of{' '}
                    {state.count})
                </button>
            </div>
        </div>
    )
}
