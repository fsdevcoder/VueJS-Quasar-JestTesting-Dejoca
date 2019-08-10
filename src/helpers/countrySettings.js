import { required, helpers } from 'vuelidate/lib/validators'
import { countries } from '../helpers/geo'

function getCountryName (abbr) {
  let country = countries().filter(
    v => v.abbr.toLowerCase().indexOf(abbr) > -1
  )
  if (country[0]) {
    return country[0].name.toUpperCase()
  } else {
    return ''
  }
}

export function countrySettings () {
  const aupostal = helpers.regex('aupostal', /^\d{4}$/)
  const bypostal = helpers.regex('bypostal', /^\d{6}$/)
  const capostal = helpers.regex('capostal', /^([A-Za-z]\d[A-Za-z][- ]?\d[A-Za-z]\d)/)
  const gbpostal = helpers.regex('gbpostal', /(([A-Za-z]{1,2}[0-9][0-9A-Za-z]?)[ ]?([0-9][A-Za-z]{2}))|([Gg][Ii][Rr] 0[Aa][Aa])/)
  const ilpostal = helpers.regex('ilpostal', /^\d{7}$/)
  const nzpostal = helpers.regex('nzpostal', /^\d{4}$/)
  const rspostal = helpers.regex('rszip', /^[1-3][0-9]{5}?$/)
  const rupostal = helpers.regex('rupostal', /^\d{6}$/)
  const sgpostal = helpers.regex('sgpostal', /^\d{6}$/)
  const thpostal = helpers.regex('thpostal', /^\d{5}$/)
  const uszip = helpers.regex('uszip', /^[0-9]{5}?$/)

  return {
    default: {
      city: { show: true, label: 'city', type: 'input', validation: { required } },
      region: { show: false },
      province: { show: true, label: 'province/state', type: 'input', validation: {} },
      postal: { show: true, label: 'postal code', type: 'input', validation: {} },
      getTandem: (a) => `${a.city}, ${getCountryName(a.country)}`
    },
    au: {
      city: { show: true, label: 'city', type: 'input', validation: { required } },
      region: { show: false },
      province: { show: true, label: 'state/territory', type: 'select', list: 'auStates', validation: { required } },
      postal: { show: true, label: 'postcode', type: 'input', validation: { required, aupostal } },
      getTandem: (a) => `${a.city}, ${a.province}`
    },
    by: {
      city: { show: true, label: 'city', type: 'input', validation: { required } },
      region: { show: false },
      province: { show: true, label: 'regions', type: 'select', list: 'byRegions', validation: { required } },
      postal: { show: true, label: 'postal index', type: 'input', validation: { required, bypostal } },
      getTandem: (a) => `${a.city}, BELARUS`
    },
    ca: {
      city: { show: true, label: 'city', type: 'input', validation: { required } },
      region: { show: false },
      province: { show: true, label: 'province/territory', type: 'select', list: 'caProvinces', validation: { required } },
      postal: { show: true, label: 'postal code', type: 'input', validation: { required, capostal } },
      getTandem: (a) => `${a.city}, ${a.province}`
    },
    il: {
      city: { show: true, label: 'city', type: 'input', validation: { required } },
      region: { show: false },
      province: { show: false },
      postal: { show: true, label: 'mikud', type: 'input', validation: { required, ilpostal } },
      getTandem: (a) => `${a.city}, ISRAEL`
    },
    gb: {
      city: { show: true, label: 'city', type: 'input', validation: { required } },
      region: { show: false },
      province: { show: false },
      postal: { show: true, label: 'postcode', type: 'input', validation: { required, gbpostal } },
      getTandem: (a) => `${a.city}, UK`
    },
    nz: {
      city: { show: true, label: 'city', type: 'input', validation: { required } },
      region: { show: true, label: 'suburb (optional)', type: 'input', validation: {} },
      province: { show: false },
      postal: { show: true, label: 'postal code', type: 'input', validation: { required, nzpostal } },
      getTandem: (a) => `${a.city}, NEW ZEALAND`
    },
    rs: {
      city: { show: true, label: 'city', type: 'input', validation: { required } },
      region: { show: false },
      province: { show: false },
      postal: { show: true, label: 'postal address code', type: 'input', validation: { required, rspostal } },
      getTandem: (a) => `${a.city}, SERBIA`
    },
    ru: {
      city: { show: true, label: 'city', type: 'input', validation: { required } },
      region: { show: false },
      province: { show: true, label: 'federal subjects', type: 'select', list: 'ruFedSubjects', validation: { required } },
      postal: { show: true, label: 'postal index', type: 'input', validation: { required, rupostal } },
      getTandem: (a) => `${a.city}, RUSSIA`
    },
    sg: {
      city: { show: true, label: 'city', type: 'input', validation: { required } },
      region: { show: false },
      province: { show: false },
      postal: { show: true, label: 'postal code', type: 'input', validation: { required, sgpostal } },
      getTandem: (a) => `SINGAPORE`
    },
    th: {
      city: { show: true, label: 'city', type: 'input', validation: { required } },
      region: { show: false },
      province: { show: true, label: 'province', type: 'select', list: 'thProvinces', validation: { required } },
      postal: { show: true, label: 'postcode', type: 'input', validation: { required, thpostal } },
      getTandem: (a) => `${a.city}, THAILAND`
    },
    us: {
      city: { show: true, label: 'city', type: 'input', validation: { required } },
      region: { show: false },
      province: { show: true, label: 'state', type: 'select', list: 'usStates', validation: { required } },
      postal: { show: true, label: 'zip code', type: 'input', validation: { required, uszip } },
      getTandem: (a) => `${a.city}, ${a.province}`
    }
  }
}
