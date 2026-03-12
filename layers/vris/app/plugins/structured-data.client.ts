export default defineNuxtPlugin(() => {
  // イベント情報の構造化データ
  const eventStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': 'VketReal in 札幌 2025 Summer',
    'description': '世界最大級のメタバースイベント「バーチャルマーケット」から派生したリアルイベント',
    'startDate': '2025-07-21T10:00:00+09:00',
    'endDate': '2025-07-21T17:00:00+09:00',
    'eventStatus': 'https://schema.org/EventScheduled',
    'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
    'location': {
      '@type': 'Place',
      'name': 'さっぽろテレビ塔',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '大通西1丁目',
        'addressLocality': '札幌市中央区',
        'addressRegion': '北海道',
        'postalCode': '060-0042',
        'addressCountry': 'JP',
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 43.0642,
        'longitude': 141.3594,
      },
    },
    'organizer': {
      '@type': 'Organization',
      'name': 'VketReal in 札幌 実行委員会',
      'url': process.env.NUXT_PUBLIC_URL || 'https://vris.omus.jp',
      'sameAs': [
        'https://x.com/vketreal_vris',
      ],
    },
    'image': [
      `${process.env.NUXT_PUBLIC_URL || 'https://vris.omus.jp'}/images/2025Summer/kv.png`,
    ],
    'url': process.env.NUXT_PUBLIC_URL || 'https://vris.omus.jp',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'JPY',
      'availability': 'https://schema.org/InStock',
      'validFrom': '2025-01-01T00:00:00+09:00',
    },
  }

  // WebSite構造化データ
  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'VketReal in 札幌 2025 Summer',
    'description': '世界最大級のメタバースイベント「バーチャルマーケット」から派生したリアルイベント',
    'url': process.env.NUXT_PUBLIC_URL || 'https://vris.omus.jp',
    'publisher': {
      '@type': 'Organization',
      'name': 'VketReal in 札幌 実行委員会',
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${process.env.NUXT_PUBLIC_URL || 'https://vris.omus.jp'}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // Organization構造化データ
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'VketReal in 札幌 実行委員会',
    'url': process.env.NUXT_PUBLIC_URL || 'https://vris.omus.jp',
    'logo': `${process.env.NUXT_PUBLIC_URL || 'https://vris.omus.jp'}/logo.png`,
    'description': '北海道の有志XRクリエイターによるVRSNSユーザーのためのリアルイベント実行委員会',
    'sameAs': [
      'https://x.com/vketreal_vris',
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'customer service',
      'availableLanguage': ['Japanese', 'English'],
    },
  }

  // DOM に構造化データを追加
  if (process.client) {
    const addStructuredData = (data: object, id: string) => {
      const existingScript = document.getElementById(id)
      if (existingScript) {
        existingScript.remove()
      }

      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = id
      script.textContent = JSON.stringify(data)
      document.head.appendChild(script)
    }

    // 各構造化データを追加
    addStructuredData(eventStructuredData, 'event-structured-data')
    addStructuredData(websiteStructuredData, 'website-structured-data')
    addStructuredData(organizationStructuredData, 'organization-structured-data')
  }
})
