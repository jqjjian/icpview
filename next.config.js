/*
 * @Author: your name
 * @Date: 2021-07-01 11:42:41
 * @LastEditTime: 2021-07-05 00:36:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/idena-explorer/next.config.js
 */
const withSass = require('@zeit/next-sass')
const withFonts = require('nextjs-fonts')

module.exports = {
    // eslint: {
    //     // Warning: Dangerously allow production builds to successfully complete even if
    //     // your project has ESLint errors.
    //     ignoreDuringBuilds: true,
    // },
    withSass: withSass(withFonts())
}
