#!/usr/bin/env node
'use strict';

const fetch = require('node-fetch')

const e = (v) => {
  return v.replace('"', '""')
}

const main = async () => {
  const fetchResult = await fetch('https://ncs.go.kr/blind/bl04/bselectLclasCdList.do')
  const { data: catList } = await fetchResult.json()

  console.log(`"ncsLclasCd","ncsLclasCdnm","ncsMclasCd","ncsMclasCdnm","ncsSclasCd","ncsSclasCdnm","ncsSubdCd","ncsSubdCdnm","ncsCompeUnitCd","compeUnitName"`)

  for (const { code } of catList) {
    const fetchResult = await fetch(`https://ncs.go.kr/unity/th03/getSubdCd.do?ncsLclasCd=${code}`)
    const { data: clasList } = await fetchResult.json()

    for (const { dutySvcNo } of clasList) {
      const fetchResult = await fetch(
        `https://ncs.go.kr/unity/th03/getCompeUnit.do?dutySvcNo=${dutySvcNo}`)
      const { data: svcList } = await fetchResult.json()

      for (const svc of svcList) {
        const {
          ncsLclasCd,
          ncsLclasCdnm,
          ncsMclasCd,
          ncsMclasCdnm,
          ncsSclasCd,
          ncsSclasCdnm,
          ncsSubdCd,
          ncsSubdCdnm,
          ncsCompeUnitCd,
          compeUnitName
        } = svc

        console.log(`"${e(ncsLclasCd)}","${e(ncsLclasCdnm)}","${e(ncsMclasCd)}","${e(ncsMclasCdnm)}","${e(ncsSclasCd)}","${e(ncsSclasCdnm)}","${e(ncsSubdCd)}","${e(ncsSubdCdnm)}","${e(ncsCompeUnitCd)}","${e(compeUnitName)}"`)
      }
    }
  }
}

main().catch((err) => {
  console.error(err)
})
