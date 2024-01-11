<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="open = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                            <div>
                                <DialogTitle v-if="tempChannel.id" as="h3"
                                    class="text-base font-semibold leading-6 text-gray-900">Edit Discord channel
                                </DialogTitle>
                                <DialogTitle v-else as="h3" class="text-base font-semibold leading-6 text-gray-900">New
                                    Discord channel</DialogTitle>
                                <div class="pt-4">
                                    <label for="email"
                                        class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                    <div class="mt-2">
                                        <input v-model="tempChannel.name"
                                            class="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Order notifications" />
                                    </div>
                                </div>
                                <div class="pt-4">
                                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Webhook
                                        URL</label>
                                    <div class="mt-2">
                                        <input v-model="tempChannel.url"
                                            class="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="https://discord.com/api/webhooks/..." />
                                    </div>
                                </div>
                                <div class="pt-4 flex space-x-2 justify-left">
                                    <Switch v-model="tempChannel.active"
                                        :class="tempChannel.active ? 'bg-blue-600' : 'bg-gray-400'"
                                        class="relative inline-flex h-6 w-11 items-center rounded-full">
                                        <span class="sr-only">Enable notifications</span>
                                        <span :class="tempChannel.active ? 'translate-x-6' : 'translate-x-1'"
                                            class="inline-block h-4 w-4 transform rounded-full bg-white transition" />
                                    </Switch>
                                    <label for="">Active</label>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-6">
                                <button type="button"
                                    class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    @click="save()">Save</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, Switch } from '@headlessui/vue';

export default {
    components: {
        Dialog,
        DialogPanel,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        Switch
    },
    data() {
        return {
            open: false,
            tempChannel: null
        }
    },
    props: {
        channel: null
    },
    watch: {
        channel: {
            handler: function (val, oldVal) {
                console.log(val)
                if (typeof (val) !== 'undefined') {
                    this.open = true;
                    this.tempChannel = JSON.parse(JSON.stringify(val));
                }
            },
            deep: true
        }
    },
    methods: {
        save() {
            this.open = false;
            this.$emit('save', this.tempChannel);
        }
    }
};
</script>
