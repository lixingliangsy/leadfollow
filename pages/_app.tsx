import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import ChatWidget from '../components/ChatWidget'
import { SUPPORT } from '../lib/support.config'

export default function App({ Component, pageProps }: AppProps) {
  return       <><Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="LeadFollow" />
        <meta property="og:description" content="Generate a warm follow-up after a showing, an open-house thank-you, or a long-term nurture note - matched to your stage and tone." />
        <meta property="og:url" content="https://leadfollow.lxsaihub.com/" />
        <meta property="og:image" content="https://leadfollow.lxsaihub.com/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LeadFollow" />
        <meta name="twitter:description" content="Generate a warm follow-up after a showing, an open-house thank-you, or a long-term nurture note - matched to your stage and tone." />
        <meta name="twitter:image" content="https://leadfollow.lxsaihub.com/og.png" />
                                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"SoftwareApplication","name":"LeadFollow","url":"https://leadfollow.lxsaihub.com/","description":"Generate a warm follow-up after a showing, an open-house thank-you, or a long-term nurture note - matched to your stage and tone.","applicationCategory":"BusinessApplication","operatingSystem":"Web","offers":{"@type":"Offer","priceCurrency":"USD","price":"0","availability":"https://schema.org/OnlineOnly"}}' }} />
      </Head>
      <Component {...pageProps} />
      <ChatWidget productName={SUPPORT.productName} brandColor={SUPPORT.brandColor} sessionKeyPrefix={SUPPORT.productSlug} /></>
}
