<template>
  <div class="comment">
    <div class="col">
      <div class="card">
        <div class="">
          <div class="card-header">
            <div class="d-flex">
              <div class="px-2 mx-2">
                <button @click="deleteComment" class="btn btn-danger btn-sm">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
              <div class="">
                {{ commentProp.title }}
                {{ commentProp.creator.name }}
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
          await commentsService.deleteComment(props.commentProp.id)
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

</style>
