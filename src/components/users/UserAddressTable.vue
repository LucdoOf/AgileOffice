<template>
  <div class="box no-padding">
    <div class="box-title"><span class="title">Adresses connues</span></div>
    <div class="box-content">
      <Table :columns="{'person':'Identité', 'address':'Adresse', 'location': 'Code postal, pays'}" :table-data="tableData"/>
    </div>
  </div>
</template>

<script>
import Table from '../Table'
export default {
  name: 'UserAddressTable',
  components: { Table },
  props: ['user'],
  computed: {
    tableData () {
      const addresses = this.user.linked_addresses
      const toReturn = []
      for (let i = 0; i < addresses.length; i++) {
        const address = Object.assign({}, addresses[i])
        if (address) {
          address.person = address.lastname + ' ' + address.firstname
          address.location = address.zipcode + ', ' + address.country
          toReturn.push(address)
        }
      }
      return toReturn
    }
  }
}
</script>
