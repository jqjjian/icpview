import Link from 'next/link'
// import { useInfiniteQuery, useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { timeSince, getIcpStringFromE8s, dnaFmt, txTypeFmt } from '../../../shared/utils/utils'
import { RosettaError, RosettaErrorType } from '../../../pages/api/rosetta/RosettaApi'
// import {
//     getEpochTransactions,
//     getEpochTransactionsCount
// } from '../../../shared/api'
import { SkeletonRows } from '../../../shared/components/skeleton'
import { WarningTooltip } from '../../../shared/components/tooltip'

const Transactions = ({
    getTransactions,
    pageIndex,
    handelePage,
    pageSize,
    transactionsCount,
    visible,
    limit = 30
}) => {
    const [transactions, setTransactions] = useState([])
    const [rosettaError, setRosettaError] = useState(null)
    // const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async (offset) => {
            const _transactions = await getTransactions(offset, pageSize)
            if (transactions instanceof RosettaError) setRosettaError(transactions)
            else {
                setTransactions([...transactions, ..._transactions])
                setRosettaError(null)
            }
        }
        const offset = pageIndex !== null ? pageIndex * pageSize : null
        if (offset !== null) fetchData(offset)
    }, [getTransactions, pageIndex, pageSize])
    // const fetchTransactions = (_, epoch, continuationToken = null) =>
    //     getEpochTransactions(epoch, limit, continuationToken)

    function fetchMore () {
        handelePage(1)
    }
    // const { data, fetchMore, canFetchMore, status } = useInfiniteQuery(
    //     epoch > 0 && `${epoch}/transactions`,
    //     [epoch],
    //     fetchTransactions,
    //     {
    //         getFetchMore: (lastGroup) =>
    //             lastGroup && lastGroup.continuationToken
    //                 ? lastGroup.continuationToken
    //                 : false
    //     }
    // )

    // const { data: txsCount } = useQuery(
    //     epoch > 0 && ['epoch/txsCount', epoch],
    //     (_, epoch) => getEpochTransactionsCount(epoch)
    // )
    let errorMessage = ''
    if (rosettaError) {
        switch (rosettaError.errorType) {
        case RosettaErrorType.Timeout:
            errorMessage = 'ERROR: Timed out while getting the transactions.'
            break
        default:
            // NotFound (N/A), NetworkError
            errorMessage = 'ERROR: An error occurred while getting the transactions.'
            break
        }
    }
    return (
        errorMessage
            ? <div>{errorMessage}</div>
            : <div className="table-responsive">

                <table className="table">
                    <thead>
                        <tr>
                            <th>交易哈希</th>
                            <th style={{ width: 100 }}>交易时间</th>
                            <th>发送方</th>
                            <th>接收方</th>
                            <th>数量</th>
                            <th style={{ width: 100 }}>交易类型</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!visible || (status === 'loading' && <SkeletonRows cols={6} />)}
                        {transactions.map(
                            (item) => item && (<tr key={item.hash}>
                                <td>
                                    <div
                                        className="text_block text_block--ellipsis"
                                        style={{ width: 100 }}>
                                        <Link
                                            href="/transaction/[hash]"
                                            as={`/transaction/${item.hash}`}>
                                            <a>{item.hash}</a>
                                        </Link>
                                    </div>
                                </td>
                                <td>{timeSince(item.timestamp)}</td>
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
                                        style={{ width: 120 }}>
                                        <Link
                                            href="/address/[address]"
                                            as={`/address/${item.account1Address}`}>
                                            <a>{item.account1Address}</a>
                                        </Link>
                                    </div>
                                </td>
                                <td>
                                    {item.account2Address
                                        ? (
                                            <>
                                                {/* <div className="user-pic">
                                                    <img
                                                        src={`https://robohash.idena.io/${item.to.toLowerCase()}`}
                                                        alt="pic"
                                                        width="32"
                                                    />
                                                </div> */}
                                                <div
                                                    className="text_block text_block--ellipsis"
                                                    style={{ width: 120 }}>
                                                    <Link
                                                        href="/address/[address]"
                                                        as={`/address/${item.account2Address}`}>
                                                        <a>{item.account2Address}</a>
                                                    </Link>
                                                </div>
                                            </>
                                        )
                                        : (
                                            <div className="text_block text_block--ellipsis">-</div>
                                        )}
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    {dnaFmt(
                                        (!item.txReceipt || item.txReceipt.success) &&
                                        getIcpStringFromE8s(
                                            !(item.amount * 1) &&
                                                        typeof item.transfer !== 'undefined'
                                                ? item.transfer
                                                : (!item.txReceipt ||
                                                              item.txReceipt.success) &&
                                                              item.amount
                                        ),
                                        ' ICP'
                                    )}
                                </td>
                                <td>
                                    {item.txReceipt && !item.txReceipt.success && (
                                        <WarningTooltip
                                            tooltip={`Smart contract failed: ${item.txReceipt.errorMsg}`}
                                            placement="top"
                                            style={{ marginRight: '5px' }}
                                        />
                                    )}
                                    {txTypeFmt(item.type, item.data)}
                                </td>
                            </tr>
                            )
                        )}
                    </tbody>
                </table>
                <div className="text-center" style={{ display: 'block' }}>
                    <button type="button" className="btn btn-small" onClick={() => fetchMore()}>
                    查看更多 ({pageIndex * 10 + limit} of{' '}
                        {transactionsCount})
                    </button>
                </div>
            </div>
    )
}
export default Transactions
