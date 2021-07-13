/*
 * @Author: your name
 * @Date: 2021-07-01 11:42:41
 * @LastEditTime: 2021-07-12 23:39:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/icpview/shared/components/loading.js
 */
export function PageLoading () {
    return (
        <section className="section section_main">
            <div className="row">
                <div className="col-12 col-sm-12">
                    <span>加载中...</span>
                </div>
            </div>
        </section>
    )
}

export function PageError () {
    return (
        <section className="section section_main">
            <div className="row">
                <div className="col-12 col-sm-12">
                    <span>发生错误, 请再试一次</span>
                </div>
            </div>
        </section>
    )
}
