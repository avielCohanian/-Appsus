<template>
  <section class="email-compose">
    <p class="logo-plus" @click="openModal">Compose</p>
    <transition name="slide-fade">
      <div class="new-mail" v-if="show">
        <p>New Message</p>
        <div class="input-line">
          To:
          <input type="text" v-model="NewEmail.to" required />
        </div>
        <label class="input-line">
          Subject
          <input type="text" name="" id="" v-model="NewEmail.subject" required />
        </label>
        <textarea
          class="free-txt"
          type="text"
          placeholder=""
          cols="30"
          rows="20"
          v-model="NewEmail.title"
          required
        ></textarea>
        <div class="email-compose-btn">
          <button @click="addMail">Send</button>
          <button @click="cancel" class="btn-cancel">Cancel</button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  import { eventBus } from '../../../service/event-bus-service.js';
  import { emailService } from '../services/email.service.js';

  export default {
    data() {
      return {
        myInterval: null,
        NewEmail: null,
        show: false,
      };
    },
    created() {
      this.NewEmail = emailService.getEmptyMail();
    },
    destroyed() {
      clearInterval(this.myInterval);
    },
    methods: {
      cancel() {
        clearInterval(this.myInterval);
        this.saveDraft();
        this.show = false;
        this.NewEmail.isDrafts = true;
        const msg = {
          txt: 'Add To Your Drafts',
          type: 'success',
        };
        eventBus.$emit('showMsg', msg);
        this.NewEmail = emailService.getEmptyMail();
      },
      saveDraft() {
        this.NewEmail.isSave = false;
        // this.myInterval = setInterval(() => {
        emailService.save(this.NewEmail).then(() => {
          eventBus.$emit('refresh');
        });
        // }, 5000);
      },
      openModal() {
        this.show = !this.show;
      },
      addMail() {
        clearInterval(this.myInterval);
        this.openModal();
        this.NewEmail.isSent = true;
        this.NewEmail.isDrafts = false;
        emailService.save(this.NewEmail).then(() => {
          const msg = {
            txt: 'Send successfully',
            type: 'success',
          };
          eventBus.$emit('showMsg', msg);
          eventBus.$emit('refresh');
        });
        this.NewEmail = emailService.getEmptyMail();
      },
    },
    components: {
      emailService,
      eventBus,
    },
  };
</script>

<style></style>
