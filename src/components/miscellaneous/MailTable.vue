<template>
  <div class="box no-padding">
    <div class="box-title">
      <div class="title"><slot>Mail envoyés</slot></div>
      <div class="box-actions">
        <a class="link" @click="this.showWriteMailModal"><i class="fas fa-feather r"/>Écrire</a>
      </div>
    </div>
    <div class="box-content">
      <Table :columns="{'subject':'Sujet', 'sent_at':'Envoyé le', 'created_at': 'Créé le'}"
             :table-data="tableData"
             @row-click="(row) => this.showMailContentModal(row)"/>
    </div>
  </div>
</template>

<script>
import Table from '../Table'
import MailContentModal from '../modals/MailContentModal'
import WriteMailModal from '../modals/WriteMailModal'

export default {
  name: 'MailTable',
  props: {
    mails: {
      type: Array,
      default () {
        return []
      }
    },
    user_id: {
      type: Number,
      default: 0
    },
    target: {
      type: String,
      default: ''
    }
  },
  components: { Table },
  methods: {
    showMailContentModal (mail) {
      this.$modal.show(MailContentModal,
        {
          mail: mail
        },
        {
          width: '700px'
        })
    },
    showWriteMailModal () {
      this.$modal.show(WriteMailModal, { user_id: this.user_id, target: this.target })
    }
  },
  computed: {
    tableData () {
      const tableData = []
      for (let i = 0; i < this.mails.length; i++) {
        const mail = this.mails[i]
        if (mail) {
          tableData.push({
            id: mail.id,
            subject: mail.subject,
            sent_at: this.$app.formatDate(mail.sent_at_stamp),
            created_at: this.$app.formatDate(mail.created_at_stamp),
            content: mail.content
          })
        }
      }
      return tableData
    }
  }
}
</script>
