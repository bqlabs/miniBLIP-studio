<template>
  <div id = "file_manager">
  <table>
    <thead>
      <tr>
        <th> type </type>
        <th> filename </th>
        <th> size </th>
        <th> action </th>
      </tr>
    </thead>
    <tbody>
      <tr  v-for="file in files">
        <td> {{{file.type | fa_icon}}} </td>
        <td> {{file.filename}} </td>
        <td> {{file.size}} </td>
        <td> Q </td>
      </tr>
    </tbody>
  </table>

  </div>
</template>

<script>
export default {
  name: 'FileManager',
  data () {
    return {
      msg: 'Hello World!',
      files: [
        { type: 'folder-o', filename: 'qq.png', size: '25kb' },
        { type: 'folder-o', filename: 'qq.png', size: '25kb' },
        { type: 'folder-o', filename: 'qq.png', size: '25kb' },
        { type: 'folder-o', filename: 'qq.png', size: '25kb' },
        { type: 'folder-o', filename: 'qq.png', size: '25kb' },
        { type: 'file-o', filename: 'qq.png', size: '25kb' },
        { type: 'file-o', filename: 'qq.png', size: '25kb' },
        { type: 'file-o', filename: 'qq.png', size: '25kb' },
        { type: 'file-o', filename: 'qq.png', size: '25kb' },
        { type: 'file-o', filename: 'qq.png', size: '25kb' },
        { type: 'file-o', filename: 'qq.png', size: '25kb' }
      ]
    }
  }
}
</script>

<style lang='less'>

#file_manager {
  position: absolute;
  top: 0;
  right: 300px;
  width: 300px;
  height: 100px;
  background: blue;
  z-index: 2;
  overflow: auto;
}

table {
  width: 100%;
  text-align: center;

  thead {
    background: black;
    color: white;

    th {
      padding:5px;
    }

    th:first-child {
    	border-left: 1px solid #777;
    	box-shadow: inset 1px 1px 0 #999;
    }

    th:last-child {
    	box-shadow: inset -1px 1px 0 #999;
    }

  }

  tbody {
    background: gray;

    td {
      padding:5px;
    }

    tr {
    	background: yellow;
    }

    tr:nth-child(odd) td {
    	background: purple;
    }
  }
}

</style>
