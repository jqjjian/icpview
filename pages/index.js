// import Link from 'next/link'
import { NavItem, NavLink, TabPane, TabContent } from 'reactstrap'
// import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import Supply from '../screens/index/components/supply'
import Identities from '../screens/index/components/identities'
import Layout from '../shared/components/layout'
// import EpochsTable from '../screens/index/components/epochs'
// import TopAddress from '../screens/index/components/topaddress'
// import Miners from '../screens/index/components/miners'
// import Mempool from '../screens/index/components/mempool'
// import Blocks from '../screens/epoch/components/blocks'
import RosettaApi, { RosettaError } from './api/rosetta/RosettaApi'
import Transactions from '../screens/epoch/components/transactions'
// import { getLastEpoch } from '../shared/api'
import { useHash, useHashChange } from '../shared/utils/useHashChange'
// import Pools from '../screens/index/components/pools'

const DEFAULT_TAB = '#transactions'

const initState = {
    pageIndex: null,
    pageSize: 10,
    transactionsCount: null,
    rosettaError: null
}
export default function Home () {
    const { hash, setHash, hashReady } = useHash()
    useHashChange((hash) => setHash(hash))
    const [state, setState] = useState(initState)
    const { transactionsCount } = state
    const rosettaApi = new RosettaApi()
    async function getTransactions (offset, limit) {
        const { transactionsCount } = state
        if (transactionsCount !== null) {
            const res = await rosettaApi.getTransactions(limit, transactionsCount - 1, offset)
            return res
        } else {
            return []
        }
    }

    const [pageIndex, setPageIndex] = useState(0)
    function handelePage (page) {
        setPageIndex(pageIndex + page)
    }
    useEffect(() => {
        async function getBlockIndex () {
            const rosettaApi = new RosettaApi()
            const maxBlockIndex = await rosettaApi.getLastBlockIndex()
            if (maxBlockIndex instanceof RosettaError) {
                setState({
                    rosettaError: maxBlockIndex
                })
            } else {
                setState({
                    pageSize: 10,
                    pageIndex,
                    transactionsCount: maxBlockIndex + 1,
                    rosettaError: null
                })
            }
        }
        getBlockIndex()
    }, [])
    // const { data } = useQuery('last-epoch', getLastEpoch)
    // console.log(data)

    // const isHardForkData = useQuery('hard-fork', getUpgradeVoting)
    // const isHardFork = isHardForkData && isHardForkData.data && isHardForkData.data.length > 0
    return (
        <Layout>
            <section className="section section_info">
                <div className="row">
                    <Identities />
                    <Supply />
                </div>
            </section>

            {/* <section className="section ">
                <div className="button-group">
                    {isHardFork && (
                        <Link href="/hardfork">
                            <a className="btn btn-secondary btn-small">
                                <span>Hard fork voting</span>
                            </a>
                        </Link>
                    )}

                    <Link href="/epoch/[epoch]" as={`/epoch/${data && data.epoch}`}>
                        <a className="btn btn-secondary btn-small">
                            <span>Current epoch data</span>
                        </a>
                    </Link>

                    <Link
                        href="/epoch/[epoch]/validation"
                        as={`/epoch/${data && data.epoch}/validation`}>
                        <a className="btn btn-secondary btn-small">
                            <i className="icon icon--report" />
                            <span>Last validation results</span>
                        </a>
                    </Link>
                </div>
            </section> */}

            <section className="section section_tabs">
                <div className="tabs">
                    <div className="section__header">
                        <div className="row align-items-center justify-content-between">
                            <div className="col">
                                <ul className="nav nav-tabs" role="tablist">
                                    <NavItem>
                                        <NavLink
                                            active={
                                                hashReady && (hash === DEFAULT_TAB || hash === '')
                                            }
                                            href={DEFAULT_TAB}>
                                            <h3>最新交易</h3>
                                        </NavLink>
                                    </NavItem>

                                    {/* <NavItem>
                                        <NavLink
                                            active={hashReady && hash === '#blocks'}
                                            href="#blocks">
                                            <h3>Blocks</h3>
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink
                                            active={hashReady && hash === '#epochs'}
                                            href="#epochs">
                                            <h3>Epochs</h3>
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink
                                            active={hashReady && hash === '#topaddress'}
                                            href="#topaddress">
                                            <h3>Top addresses</h3>
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink
                                            active={hashReady && hash === '#miners'}
                                            href="#miners">
                                            <h3>Online miners</h3>
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink
                                            active={hashReady && hash === '#pools'}
                                            href="#pools">
                                            <h3>Pools</h3>
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink
                                            active={hashReady && hash === '#mempool'}
                                            href="#mempool">
                                            <h3>Mempool</h3>
                                        </NavLink>
                                    </NavItem> */}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <TabContent activeTab={hashReady ? hash || DEFAULT_TAB : ''}>
                        <TabPane tabId={DEFAULT_TAB}>
                            <div className="card">
                                <Transactions
                                    pageIndex={pageIndex}
                                    pageSize={state.pageSize}
                                    transactionsCount={transactionsCount}
                                    getTransactions={getTransactions}
                                    handelePage={handelePage}
                                    // epoch={data && data.epoch}
                                    limit={10}
                                    visible={hashReady && (hash === DEFAULT_TAB || hash === '')}
                                />
                            </div>
                        </TabPane>

                        {/* <TabPane tabId="#blocks">
                            <div className="card">
                                <Blocks
                                    epoch={data && data.epoch}
                                    limit={10}
                                    visible={hashReady && hash === '#blocks'}
                                />
                            </div>
                        </TabPane> */}

                        {/* <TabPane tabId="#epochs">
                            <div className="card">
                                <EpochsTable visible={hashReady && hash === '#epochs'} />
                            </div>
                        </TabPane>

                        <TabPane tabId="#topaddress">
                            <div className="card">
                                <TopAddress visible={hashReady && hash === '#topaddress'} />
                            </div>
                        </TabPane>

                        <TabPane tabId="#miners">
                            <div className="card">
                                <Miners visible={hashReady && hash === '#miners'} />
                            </div>
                        </TabPane>

                        <TabPane tabId="#pools">
                            <div className="card">
                                <Pools visible={hashReady && hash === '#pools'} />
                            </div>
                        </TabPane>

                        <TabPane tabId="#mempool">
                            <div className="card">
                                <Mempool
                                    epoch={50}
                                    limit={10}
                                    visible={hashReady && hash === '#mempool'}
                                />
                            </div>
                        </TabPane> */}
                    </TabContent>
                </div>
            </section>
        </Layout>
    )
}
