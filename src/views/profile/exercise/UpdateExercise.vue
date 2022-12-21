<template>
  <div class="view-update-exercise">
    <PageHeader title="更新动作" :search="false">
      <WTTabs :tabs="tabs" @switch="handleTabClick"/>
    </PageHeader>

    <div content v-if="state.exercise">
      <WTExerciseForm @close="close()" :activeKey="activeKey" :exercise="state.exercise" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from '@vue/runtime-core'
import router from '@/router'
import PageHeader from '@/components/common/PageHeader.vue'
import WTTabs from '@/components/WTTabs.vue'
import WTExerciseForm from '@/components/forms/WTExerciseForm.vue'
// import { ExerciseManagement } from '@/utils/ExerciseManagement';
import { closeFullscreen } from '@/utils/fullScreen'
// import { NotificationManagement } from '@/utils/NotificationManagement';
// import { UserManagement } from '@/utils/UserManagement';
import request from '@/utils/request'

const tabs = ref(['基本信息', '目标容量', '更多信息'])
const activeKey = ref(1)

const state = reactive({
  exercise: null
})

function handleTabClick (value) {
  activeKey.value = value
}

onMounted(() => {
  const ID = router.currentRoute.value.params.id
  // 获取后台数据
  request.get('exercise/' + ID)
    .then(res => {
      const exercise = res.data.data
      if (!exercise || !exercise._id) {
        return notFound()
      }
      // if (exercise.author !== UserManagement.getUserID()) {
      //   return this.close({
      //     title: 'Berechtigungsfehler',
      //     text: 'Du bist nicht der Ersteller der Übung!'
      //   })
      // }
      state.exercise = exercise
      console.log(state.exercise)
    })
    .catch(() => notFound())
})

// mounted() {
//   const creations = ExerciseManagement.getCreated();
//   if (!UserManagement.getUserID()) {
//     this.close();
//   } else if (!creations) {
//     this.notFound();
//   } else if (creations) {
//     const exercise = creations.filter(
//       x =>
//         x._id === ID && x.author === UserManagement.getUserID() && x.reviewed
//     )[0];
//     if (exercise) {
//       this.exercise = exercise;
//     } else {
//       this.notFound();
//     }
//   } else {
//     backend
//       .get('exercise/' + ID)
//       .then(res => {
//         const exercise: IExercise = res.data;
//         if (!exercise || !exercise._id) {
//           this.notFound();
//           return;
//         }
//         if (exercise.author !== UserManagement.getUserID()) {
//           this.close({
//             title: 'Berechtigungsfehler',
//             text: 'Du bist nicht der Ersteller der Übung!'
//           });
//           return;
//         }
//         this.exercise = exercise;
//       })
//       .catch(() => this.notFound);
//   }
// }

function close (errorMessage) {
  if (errorMessage) {
    console.log('errorMessage', errorMessage)
    // NotificationManagement.sendNotification(
    //   errorMessage.title,
    //   errorMessage.text
    // )
  }
  closeFullscreen('Exercises')
}

function notFound () {
  this.close({
    title: 'Unsuccessful search',
    text: 'The specified exercise could not be found'
  })
}
</script>

<style lang="less" scoped>
.view-update-exercise {
  min-height: 100vh;

  [content] {
    padding-top: 120px;
  }
}
</style>
