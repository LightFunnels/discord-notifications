<template>
  <div class="bg-gray-900">
    <div class="container mx-auto">
      <div class="0 py-10 min-h-[100vh]">
        <div class="flex justify-between">
          <svg width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36">
            <path fill="#FFFFFF"
              d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
          </svg>

          <button @click="addChannel()" type="button"
            class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add Channel
          </button>

        </div>

        <svg v-if="channels === null" width="24" height="24" class="mx-auto mt-10" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
            class="spinner_P7sC" fill="white" />
        </svg>

        <div v-if="channels !== null && channels.length == 0" class="hidden text-white sm:block text-center mt-10">No
          channels yet</div>
        <table v-if="channels && channels.length"
          class="mt-6 rounded-lg shadow-2xl overflow-hidden bg-gray-800 w-full whitespace-nowrap text-left">
          <colgroup>
            <col class="" />
            <col class="" />
            <col class="" />
            <col class="" />
            <col class="" />
          </colgroup>
          <thead class="border-b border-white/10 text-sm leading-6 text-white">
            <tr>
              <th scope="col" class="py-2 w-1/12 font-semibold"></th>
              <th scope="col" class="py-2 w-2/12 font-semibold">Name</th>
              <th scope="col" class="hidden py-2 pl-0 font-semibold sm:table-cell">Total</th>
              <th scope="col" class="hidden py-2 pl-0 font-semibold md:table-cell ">URL</th>
              <th scope="col" class="hidden py-2 pl-0 font-semibold md:table-cell "></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="(channel, key) in channels" :key="key">
              <div class="flex py-6 pl-4 items-center gap-x-4">
                <Switch @update:modelValue="status => updateChannel(channel, status)" v-model="channel.active"
                  :class="channel.active ? 'bg-blue-600' : 'bg-gray-400'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full">
                  <span class="sr-only">Enable notifications</span>
                  <span :class="channel.active ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition" />
                </Switch>
              </div>
              <td class="py-4">
                <div class="flex items-center gap-x-4">
                  <div class="truncate text-sm font-medium leading-6 text-white">{{ channel.name }}</div>
                </div>
              </td>
              <td class="py-4">
                <div class="flex items-center gap-x-4">
                  <div class="truncate text-sm font-medium leading-6 text-white">{{ channel.total }}</div>
                </div>
              </td>
              <td class="py-4">
                <div class="flex items-center justify-end gap-x-2 sm:justify-start">
                  <input type="text" :value="channel.url" disabled autocomplete="given-name"
                    class="block w-full rounded-md border-0 px-3 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
                </div>
              </td>
              <td class="py-4 pr-4 text-right">
                <div class="truncate flex justify-end text-sm font-medium leading-6 text-white">

                  <button @click="editChannel(channels[key])" type="button"
                    class="mr-2 inline-flex items-center gap-x-1.5 rounded-md bg-gray-900 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>

                  <button @click="deleteChannel(channels[key])" type="button"
                    class="inline-flex items-center gap-x-1.5 rounded-md bg-gray-900 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>

                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Channel :channel="channel" @save="createOrUpdateChannel($event)" />
</template>

<script>
import axios from 'axios';
import Channel from './components/Channel.vue';
import { Switch } from '@headlessui/vue';

export default {
  data() {
    return {
      api: null,
      token: null,
      channels: null,
      channel: null,
      statuses: {
        Completed: 'text-green-400 bg-green-400/10',
        Error: 'text-rose-400 bg-rose-400/10'
      },
      BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
    }
  },
  components: {
    Channel,
    Switch
  },
  mounted() {
    // get token from query string
    const urlParams = new URLSearchParams(window.location.search);
    this.token = urlParams.get('token');

    if (this.token) {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

      this.api = axios.create({
        baseURL: BACKEND_URL,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      this.fetchChannels();

    }
  },
  methods: {
    async fetchChannels() {
      try {
        const response = await this.api.get('/channels');
        this.channels = response.data;
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    },
    createOrUpdateChannel(channel) {
      if (channel.id) {
        this.updateChannel(channel);
      } else {
        this.createChannel(channel);
      }
    },
    // addChannel
    addChannel() {
      this.channel = {
        id: null,
        total: 0,
        createdAt: '',

        name: '',
        active: true,
        url: '',
      };
    },

    // createChannel
    async createChannel(channel) {
      const response = await this.api.post(this.BACKEND_URL + '/channels', channel);
      this.channels.push(response.data);
    },

    async updateChannel(channel, status = null) {
      if (status !== null) {
        channel.active = status;
      }
      const response = await this.api.put(this.BACKEND_URL + `/channels/${channel.id}`, channel);
      const index = this.channels.findIndex((c) => c.id === channel.id);
      this.channels[index] = response.data;
    },

    // deleteChannel
    async deleteChannel(channel) {
      console.log(channel.id)
      confirm("Are you sure you want to delete this channel?")
      await this.api.delete(this.BACKEND_URL + '/channels/' + channel.id);
      const index = this.channels.findIndex((c) => c.id === channel.id);
      this.channels.splice(index, 1);
    },

    // editChannel
    editChannel(channel) {
      console.log(channel)
      this.channel = channel;
    },
  }
}
</script>