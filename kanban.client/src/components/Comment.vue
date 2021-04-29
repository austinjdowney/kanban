<template>
  <div class="comment">
    <div class="col">
      <div class="card my-2">
        <div class="">
          <div class="card-header">
            <div class="d-flex">
              <div class="px-2 mx-2">
                <div class="text-dark d-flex">
                  <div class=" d-flex flex-column">
                    <div>
                      {{ commentProp.creator.name }}
                    </div>
                    <div>
                      {{ commentProp.title }}
                    </div>
                  </div>
                  <div>
                    <button @click="deleteComment" class="btn trash btn-sm m-3">
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { commentsService } from '../services/CommentsService'

export default {
  name: 'Comment',
  props: {
    commentProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newComment: {},
      comment: computed(() => AppState.comments.id),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      state,
      async deleteComment() {
        try {
          await commentsService.deleteComment(props.commentProp)
        } catch (error) {
          Notification.toast('Error: ' + error, 'danger')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.create {
  background: #80ffdb;
}
.trash{
  background:#64dfdf;
}
</style>
