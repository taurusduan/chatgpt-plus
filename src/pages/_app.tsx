import '@/styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import { ConfigProvider, App as AntdApp, theme as antdTheme } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import 'antd/dist/reset.css'
import Layout from '@/components/Layout'
import { SiteProvider } from '@/contexts/site'
import { i18NextConfig } from '@/locales'
import { appWithTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// @ts-ignore
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [''], i18NextConfig, ['zh-CN'])),
      // Will be passed to the page component as props
    },
  }
}

function App({ Component, pageProps }: AppProps) {
  return (
    <SiteProvider>
      <ConfigProvider>
        <AntdApp>
          <StyleProvider hashPriority="high">
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </StyleProvider>
        </AntdApp>
      </ConfigProvider>
    </SiteProvider>
  )
}

export default appWithTranslation(App, i18NextConfig)
