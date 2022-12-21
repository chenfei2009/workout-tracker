<template>
  <div class="view-workout">
    <!-- banner -->
    <WTBanner title="核心强化" subTitle="今日推荐">
      <template v-slot:media>
        <img :src="banner" alt="" />
      </template>
      <div>31 分钟  |  初级</div>
      <template v-slot:action>
        <router-link class="search-btn" :to="{name: 'SearchWorkouts'}">
          <span class="iconfont icon-search"></span>
        </router-link>
        <a-button>开始训练</a-button>
      </template>
    </WTBanner>

    <!-- content -->
    <div content max-width>
      <!-- 最近流行 workouts -->
      <WTTransition>
        <section v-if="trendingWorkouts && trendingWorkouts.length > 0">
          <WTHeading title="正在流行" @seeMore="handleClick" />
          <WTCarousel>
            <WTWorkoutPreviewS
              v-for="w in trendingWorkouts"
              :key="w._id"
              :workout="w"
            />
          </WTCarousel>
        </section>
      </WTTransition>

      <!-- 最近训练 workouts -->
      <WTTransition>
        <section v-if="latestWorkouts && latestWorkouts.length > 0">
          <WTHeading title="最近训练" :seeMore="false"/>
          <WTCarousel>
            <WTWorkoutPreview
              v-for="w in latestWorkouts"
              :key="w._id"
              :workout="w"
            />
          </WTCarousel>
        </section>
      </WTTransition>

      <br />
      <!-- 创建训练 -->
      <section>
        <div class="card">
          <div class="info" flow>
            <div class="title">创建训练</div>
            <div class="content">选择身体部位和动作，然后为你进行一次锻炼</div>
            <a-button shape="round" @click="openFullscreen('CreateWorkout')">我们开始吧</a-button>
          </div>
          <img class="bg" src="https://ts1.cn.mm.bing.net/th/id/R-C.71f37d7bc5a9063a10935e2c2e256335?rik=Ymg7TWPZkpCPRg&riu=http%3a%2f%2fwww.jianshen8.com%2fuploads%2fallimg%2f171115%2f4_171115173909_1.jpg&ehk=bI4SDV6YdVT%2bcxze6LP1D3jwU5kJzPciJh56zV%2bCLtI%3d&risl=&pid=ImgRaw&r=0">
        </div>
      </section>

      <a-divider />

      <!-- 分类导航 -->
      <section v-if="cates && cates.length > 0">
        <WTHeading title="分类导航" subtitle="训练模板" />
          <ul class="cate-list">
            <!-- :style="`background-image: url('${item.thumbnail}')`" -->
            <li
              class="cate-item"
              v-for="item in cates"
              :key="item.title"
              @click="handleClick({cate: item.title})"
            >
              <div class="title">{{item.title}}</div>
              <img :src="item.thumbnail" alt="">
            </li>
          </ul>
      </section>

      <a-divider />

      <!-- 部位导航 -->
      <section v-if="areas && areas.length > 0">
        <WTHeading title="部位导航" subtitle="训练模板" />
          <ul class="area-list">
            <li
              class="area-item"
              v-for="item in areas"
              :key="item.title"
              @click="handleClick({area: item.title})"
            >
              <div class="cover" :style="`background-image: url('${item.thumbnail}')`"/>
              <div class="title">{{item.title}}</div>
            </li>
          </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from '@vue/runtime-core'
import { useStore } from '@/store/index'
import router from '@/router'

import WTTransition from '@/components/WTTransition.vue'
import WTWorkoutPreviewS from '@/components/preview/WTWorkoutPreviewS.vue'
import WTBanner from '@/components/WTBanner.vue'
import WTWorkoutPreview from '@/components/training/WTWorkoutPreview.vue'
import WTHeading from '@/components/WTHeading.vue'
import WTCarousel from '@/components/WTCarousel.vue'
import { openFullscreen } from '@/utils/fullScreen'
import { _getTrendingWorkouts, _getLatestWorkouts } from '@/api/workout'

const store = useStore()
const trendingWorkouts = computed(() => store.trendingWorkouts)
const latestWorkouts = computed(() => store.latestWorkouts)

// banner 图片url
const banner = ref('https://img2.baidu.com/it/u=996126356,1455664653&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=281')

const URL = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fq_mini%2Cc_zoom%2Cw_640%2Fupload%2F20160410%2Fd72fe98fc0ed47359740faacbfa0c127_th.jpg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668667671&t=2b8876cb8463ebde6db3c9e22099fd0d'
// 分类索引
const cates = reactive([
  { title: '塑形训练', isNew: true, thumbnail: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.PYb9TTzMIv3lss28AweiNQHaEZ?pid=ImgDet&rs=1' },
  { title: '热身放松', isNew: true, thumbnail: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.RIkArwFsL2-aYlxj3IS7HwHaE7?pid=ImgDet&rs=1' },
  { title: 'HIIT训练', isNew: true, thumbnail: URL },
  { title: '增肌训练', isNew: true, thumbnail: 'https://pic1.zhimg.com/v2-3a887c2ede1dd2d23e649986fb4e83c0_r.jpg' },
  { title: '健康改善', isNew: true, thumbnail: URL },
  { title: '热身放松', isNew: true, thumbnail: URL },
  { title: '练后拉伸', isNew: true, thumbnail: 'https://ts1.cn.mm.bing.net/th/id/R-C.08377cfc3cfb3a0e0bdbea70240a5e2e?rik=IWlFiR2I7qRw0w&riu=http%3a%2f%2fn.sinaimg.cn%2fsports%2ftransform%2f713%2fw457h256%2f20180906%2fdxz--fzrwica2580354.jpg&ehk=2Sw85aDf44U51QHSQFSZoEELsjUUN17zLnWCAqFwdWw%3d&risl=&pid=ImgRaw&r=0' },
  { title: '器械训练', isNew: true, thumbnail: 'https://ts1.cn.mm.bing.net/th/id/R-C.1a64d29a7f456c7e3177c60bc6892b84?rik=DM9XmAmLbGOU5g&riu=http%3a%2f%2fwww.fitsns.cn%2fstorage%2ftoutiao%2f20161024%2f147727235333145.jpg&ehk=zOCG65rusIXLfjJI4sJEfV6CuQ6flnv1J%2b%2fZnxmkEZ8%3d&risl=&pid=ImgRaw&r=0' }
])

// 部位索引
const areas = reactive([
  { title: '胸部', isNew: true, thumbnail: 'https://www.jianshen8.com/uploads/allimg/190210/4_190210195112_1.jpg' },
  { title: '背部', isNew: true, thumbnail: 'https://www.jirou.com/uploads/allimg/160920/1-16092012233E25.jpg' },
  { title: '肩部', isNew: true, thumbnail: 'https://www.jianshen8.com/uploads/allimg/180825/4_180825235913_1.jpg' },
  { title: '臀腿', isNew: true, thumbnail: 'https://pic4.zhimg.com/v2-9a88aa23a825b418e9c7d9728807eeef_r.jpg' },
  { title: '核心', isNew: true, thumbnail: 'https://www.jianshen8.com/uploads/allimg/190717/24_190717105225_1.jpg' },
  { title: '手臂', isNew: true, thumbnail: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fphotocdn.sohu.com%2F20160226%2Fmp60642631_1456452371767_33.jpeg&refer=http%3A%2F%2Fphotocdn.sohu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669525401&t=d387a9522ffdaa15bc60a484964a82bb' }
])

// 加载页面初始数据
const loadTrendingWorkouts = async () => {
  if (store.trendingWorkouts) return
  const { data } = await _getTrendingWorkouts()
  store.setTrendingWorkouts(data.data)
}

const loadLatestWorkouts = async () => {
  if (store.latestWorkouts) return
  const { data } = await _getLatestWorkouts()
  store.setLatestWorkouts(data.data)
}

onMounted(() => {
  // loadBanner()
  loadTrendingWorkouts()
  loadLatestWorkouts()
})

// 监听页面事件
function handleClick (query) {
  if (typeof query === 'string') {
    query = { cate: query }
  }
  router.push({
    name: 'WorkoutList',
    query
  })
}
</script>

<style lang="less" scoped>
.view-workout {
  padding-bottom: 20px;
}

.card {
  position: relative;
  width: 100%;
  height: 200px;
  color: #fff;
  overflow: hidden;
  border-radius: @border-radius;
  .info {
    position: absolute;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    z-index: 10;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    .title {
      font-size: 25px;
      font-weight: 600;
    }
    .content {
      white-space: nowrap;
    }
    .ant-btn {
      margin-top: 30px;
    }
  }
  .bg {
    width: 100%;
    filter: brightness(70%);
    // height: 100%;
    // background-image: url('https://tqimg.idongde.com/d/2020/11/03/1604375151867862.jpg');
    // background-size: cover;
  }
}

.wt-banner {
  height: 300px;
  // img {
  //   filter: brightness(70%);
  // }
  .search-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    span {
      font-size: 1.5rem;
    }
  }
  .ant-btn {
    position: absolute;
    bottom: 20px;
    right: 10px;
    width: 7rem;
    height: 2rem;
    border-radius: 1rem;
  }
}

.cate-list {
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  grid-template-rows: repeat(4, 7rem);
  grid-gap: 20px;
  .cate-item {
    position: relative;
    border-radius: @border-radius;
    overflow: hidden;
    background-position: top;
    background-size: cover;
    // filter: brightness(70%);
    img {
      width: 200%;
      object-fit: cover;
      filter: brightness(70%);
      // height: 100%;
    }
    .title {
      position: absolute;
      font-size: 27px;
      letter-spacing: 2px;
      color: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      white-space: nowrap;
      z-index: 2;
    }
  }
}

.area-list {
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  // grid-template-rows: repeat(3, 1rem);
  grid-gap: 10px;
  .area-item {
    .cover {
      min-width: 100px;
      height: 100px;
      background-size: cover;
      border-radius: @border-radius;
      overflow: hidden;
    }
    .title {
      font-size: 1rem;
      font-weight: 600;
      text-align: center;
      padding-top: 5px;
      // letter-spacing: 2px;
      // transform: translate(-50%, -50%);
      white-space: nowrap;
    }
  }
}

.wt-preview {
  margin-right: 20px;
}
</style>
