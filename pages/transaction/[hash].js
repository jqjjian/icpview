// import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../../shared/components/layout'
// import { getTransaction } from '../../shared/api'
import { PageLoading, PageError } from '../../shared/components/loading'
import RosettaApi, { RosettaError } from '../api/rosetta/RosettaApi'
import {
    getIcpStringFromE8s,
    dnaFmt,
    dateTimeFmt
    // epochFmt
    // txTypeFmt
} from '../..//shared/utils/utils'

const initState = {
    icpToUsd: null,
    isLoading: false,
    rosettaError: null,
    transaction: null
}
function Tx () {
    const router = useRouter()
    const hash = router.query.hash || ''
    const rosettaApi = new RosettaApi()
    const [state, setState] = useState(initState)
    const { rosettaError, transaction, isLoading } = state
    // const { data: txData, error, status } = useQuery(hash, getTransaction)
    // const { data: rawTxData } = useQuery(hash && `${hash}/raw`, getTransaction)
    useEffect(() => {
        async function getData () {
            setState({
                icpToUsd: null,
                isLoading: true,
                rosettaError: null,
                transaction: null
            })
            const transaction = await rosettaApi.getTransaction(hash)
            if (transaction instanceof RosettaError) {
                setState({
                    icpToUsd: null,
                    isLoading: false,
                    rosettaError: transaction,
                    transaction: null
                })
            } else {
                //         const url =
                //   `https://api.nomics.com/v1/currencies/ticker?key=${Constants.NOMICS_API_KEY}&ids=ICP&interval=1d`
                //         const result = await axios.get(url)
                //         const icpToUsd = parseFloat(result?.data[0]?.price)
                setState({
                    icpToUsd: null,
                    isLoading: false,
                    rosettaError: null,
                    transaction: transaction
                })
            }
        }
        getData()
    }, [hash])
    let errorMessage = ''
    if (rosettaError) {
        switch (rosettaError.errorType) {
        case RosettaError.NotFound:
            errorMessage = 'ERROR: Transaction not found.'
            break
        case RosettaError.Timeout:
            errorMessage = 'ERROR: Timed out while getting the transaction.'
            break
        default: // NetworkError
            errorMessage = 'ERROR: An error occurred while getting the transaction.'
            break
        }
    }
    return (
        <Layout title={`Transaction ${hash}`}>
            <section className="section">
                <div className="section_main__group">
                    <h1 className="section_main__title">交易哈希</h1>
                    <h3 className="section_main__subtitle">
                        <span>{hash}</span>
                    </h3>
                </div>
            </section>
            {isLoading && <PageLoading />}
            {errorMessage && !isLoading && <PageError />}
            {transaction && TxDetails(transaction)}
            {/* {rawTxData && RawTxDetails(rawTxData)} */}
        </Layout>
    )
}

export default Tx

function TxDetails (data) {
    return (
        <section className="section section_details">
            <h3>详情</h3>
            <div className="card">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <div className="section__group">
                            <div className="control-label">Block Index:</div>
                            <div className="text_block">
                                <Link href="/block/[block]" as={`/block/${data.blockHeight}`}>
                                    <a>{data.blockIndex}</a>
                                </Link>
                            </div>
                            <hr />
                            <div className="control-label">状态:</div>
                            <div className="text_block">
                                {data.status}
                            </div>

                            <hr />
                            <div className="control-label">发送方:</div>

                            <div
                                className="text_block text_block--ellipsis"
                                style={{ width: '80%' }}
                            >
                                <Link href="/address/[address]" as={`/address/${data.account1Address}`}>
                                    <a>
                                        {/* <img
                                            className="user-pic"
                                            src={`https://robohash.idena.io/${data.from.toLowerCase()}`}
                                            alt="pic"
                                            width="32"
                                        /> */}
                                        <span>{data.account1Address}</span>
                                    </a>
                                </Link>
                            </div>

                            <hr />
                            <div className="control-label">数量:</div>
                            <div className="text_block">
                                {dnaFmt(data.amount, ' ICP')}
                            </div>

                            <hr />
                            <div className="control-label">Memo:</div>
                            <div className="text_block">{Number(data.memo, ' ')}</div>
                            {/* {data.txReceipt && (
                                <>
                                    <hr />
                                    <div className="control-label">Smart contract call:</div>
                                    <div
                                        className="text_block"
                                        style={{
                                            color: `${data.txReceipt.success ? 'inherit' : 'red'}`
                                        }}
                                    >
                                        {data.txReceipt.success ? 'Success' : 'Error'}
                                    </div>
                                </>
                            )} */}
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="section__group">
                            <div className="control-label">创建时间:</div>
                            <div className="text_block">{dateTimeFmt(data.timestamp)}</div>
                            <hr />
                            <div className="control-label">交易类型:</div>
                            <div className="text_block">
                                {data.type}
                            </div>

                            <hr />
                            <div className="control-label">接收方:</div>

                            <div
                                className="text_block text_block--ellipsis"
                                style={{ width: '80%' }}
                            >
                                {data.account2Address
                                    ? (
                                        <Link href="/address/[address]" as={`/address/${data.account2Address}`}>
                                            <a>
                                                <span>{data.account2Address}</span>
                                            </a>
                                        </Link>
                                    )
                                    : (
                                        '-'
                                    )}
                            </div>
                            <hr />
                            <div className="control-label">Fee paid:</div>
                            {/* <div className="text_block">{dnaFmt(getIcpStringFromE8s(data.fee), ' ICP')}</div> */}
                            <div className="text_block">{getIcpStringFromE8s(data.fee)} ICP</div>

                            {/* <hr />
                            <div className="control-label">Fee limit:</div> */}
                            {/* <div className="text_block">{data.maxFee}</div> */}
                            {/* {data.txReceipt && data.txReceipt.errorMsg && (
                                <>
                                    <hr />
                                    <div className="control-label">Error:</div>
                                    <div className="text_block">{data.txReceipt.errorMsg}</div>
                                </>
                            )}
                            {/* {data.txReceipt && data.txReceipt.contractAddress && (
                                <>
                                    <hr />
                                    <div className="control-label">Contract:</div>

                                    <div
                                        className="text_block text_block--ellipsis"
                                        style={{ width: '80%' }}
                                    >
                                        <Link
                                            href="/contract/[address]"
                                            as={`/contract/${data.txReceipt.contractAddress}`}
                                        >
                                            <a>
                                                <img
                                                    className="user-pic"
                                                    src={`https://robohash.idena.io/${data.txReceipt.contractAddress.toLowerCase()}`}
                                                    alt="pic"
                                                    width="32"
                                                />
                                                <span>{data.txReceipt.contractAddress}</span>
                                            </a>
                                        </Link>
                                    </div>
                                </>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// function RawTxDetails (data) {
//     return (
//         <section className="section section_details">
//             <h3>Raw transaction</h3>
//             <div className="card">
//                 <div className="row">
//                     <div className="text_block" style={{ wordBreak: 'break-all' }}>
//                         {data}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }
