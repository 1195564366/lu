import { Cache } from '@utils' 

const DIC = {
  find (dicName) {
    const dicData = Cache.get('DGJ_DIC').filter(item => item.enumType === dicName)
    return dicData
  },
  findFilter (dicName, value) {
    const dicData = Cache.get('DGJ_DIC').filter(item => item.enumType === dicName)
    const filterData = dicData.filter(item => Number(item.itemValue) === Number(value))
    return filterData[0] ? filterData[0].label || '-' : '-'
  }
}

export default DIC