<template>
  <div>
    <Notification
      v-if="notification.message"
      :message="notification.message"
      :type="notification.type"
    >
    </Notification>

    <h1 class="headline">General Elections 2019: Results</h1>
    <Vuetable
      class="data-table white"
      ref="vuetable"
      :api-mode="false"
      :fields="fields"
      :data="localData"
    >
      <template slot="actions" scope="props">
        <div class="table-button-container">
          <button
            class="ui basic button"
            @click="editRow(props.rowIndex, props.rowData)"
          >
            <i class="edit icon"></i>
          </button>
          <button class="ui basic button" @click="deleteRow(props.rowIndex)">
            <i class="delete icon"></i>
          </button>
        </div>
      </template>
    </Vuetable>

    <div class="buttons-wrapper">
      <button class="ui button add-row-button" @click="addRow()">
        Add Row
      </button>
      <button class="ui button primary publish-button" @click="publish()">
        Publish
      </button>
    </div>

    <EditChartField
      v-if="fieldEditMode.show"
      :saveRow="saveRow"
      :currentRow="currentRow"
    ></EditChartField>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2';
import EditChartField from './EditChartField';

import { fetchCharts, saveAndPublishChart } from '../utils/network';
import Notification from './Notification';

const chartId = 1;

export default {
  components: {
    Vuetable,
    EditChartField,
    Notification
  },

  data() {
    return {
      fields: [
        {
          name: 'alliance'
        },
        {
          name: 'seats'
        },
        {
          name: 'color'
        },
        {
          name: '__slot:actions',
          title: 'Actions'
        }
      ],

      localData: {
        links: {},
        data: []
      },

      currentRow: {
        data: {},
        index: Number
      },

      fieldEditMode: {
        show: false,
        editIndex: Number
      },
      notification: {
        message: '',
        type: ''
      }
    };
  },

  mounted() {
    fetchCharts(chartId, this.setInitialData);
  },

  methods: {
    addRow() {
      let rowData = {};

      this.fields.forEach(item => {
        if (!(item.name[0] == '_')) {
          rowData[item.name] = null;
        }
      });

      this.localData.data.push(rowData);
      this.editRow(this.localData.data.length - 1, rowData);
    },

    deleteRow(index) {
      this.localData.data.splice(index, 1);
    },

    editRow(index, rowData) {
      this.currentRow.data = rowData;
      this.currentRow.index = index;
      this.fieldEditMode.show = true;
    },

    saveRow(index, rowData) {
      const existingData = this.localData.data;
      existingData[index] = rowData;
      this.fieldEditMode.show = false;
    },

    publish() {
      const shouldPublish = confirm(
        'Are you sure you want to publish this chart?'
      );
      if (shouldPublish) {
        saveAndPublishChart(
          chartId,
          { content: this.localData.data },
          this.publishCallback
        );
      }
      return false;
    },

    publishCallback(resp) {
      if (resp) {
        this.flashNotification('Chart is succesfully published!');
      } else {
        this.flashNotification(
          'There was an error in updating the chart!',
          'error'
        );
      }
      return;
    },

    flashNotification(message, type = 'update') {
      this.notification.message = message;
      this.notification.type = type;

      setInterval(() => {
        this.notification.message = '';
        this.notification.type = 'type';
      }, 10000);
    },

    setInitialData(data) {
      this.localData = {
        ...this.localData,
        data: data['data']['content']
      };
    }
  }
};
</script>

<style>
h1.headline {
  margin: 80px auto;
  border-bottom: 1px solid #ccc;
  width: 419px;
  padding-bottom: 5px;
  color: #444;
}

body {
  height: auto;
}

.data-table.attached.table {
  width: 800px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 10px;
}
.vuetable-slot {
  text-align: center;
  width: 200px;
}
.buttons-wrapper {
  width: 804px;
  text-align: right;
  margin: 50px auto 0 auto;
}

button.ui.button.add-row-button {
  margin-right: 30px;
}

.ui.button:not(.icon) > .icon:not(.button) {
  margin: 0;
}
.ui.table thead tr:first-child > th:first-child {
  border-radius: 10px 0 0;
}
.ui.table thead tr:first-child > th:last-child {
  border-radius: 0 10px 0 0;
}
</style>
