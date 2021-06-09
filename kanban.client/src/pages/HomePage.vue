<template>
  <div class="container-fluid bg-details bg-dark">
    <div class="row">
      <div class="col-md-12  text-center text-white">
        <div class="mt-5">
          <h1>
            WELCOME  "{{ user.name }}" To
          </h1>
        </div>
        <div class="mx-2 icon">
          <i class="fas fa-spray-can" style="font-size:160px">      BAN</i>
        </div>
        <div class="text-center mt-5">
          <h1>
            <div>
              WHY ARE YOU STILL HERE?!?
            </div>
            <div>
              GO TO YOUR
            </div>
            <router-link :to="{ name: 'BoardsPage' }" class="nav-link">
              "Boards Page"
            </router-link>
            TO MAKE A BOARD
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'

export default {
  name: 'Home',

  setup() {
    const state = reactive({
      boards: computed(() => AppState.boards)
    })
    onMounted(async() => {
      try {
        await boardsService.getAllBoards()
      } catch (error) {
        Notification.toast('error:' + error, 'danger')
      }
    })
    return {
      state,
      user: computed(() => AppState.user)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
.bg-details{
background-image: url("https://www.transparenttextures.com/patterns/black-felt.png");
}
.icon{
    color: #6930c3;
  }

@media only screen and (max-width:800) {

.icon{
  font-size: 100px;
}

}
</style>
