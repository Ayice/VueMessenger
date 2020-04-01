<template>
	<div class="modal-wrapper" @click="removeModal" v-if="showModal">
		<div class="modal">
			<div class="modal-header">
				<h3>{{ modal.modalTitle }}</h3>
			</div>

			<div class="modal-body">
				<p>{{ modal.modalText }}</p>
			</div>

			<div class="modal-footer">
				<button @click="handleClick(modal.modalFunc, modal.modalData)">
					Confirm
				</button>

				<button @click="removeModal">
					Cancel
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		name: 'Modal',
		computed: {
			...mapState(['modal', 'showModal'])
		},
		methods: {
			...mapMutations(['setShowModal', 'setModal']),
			handleClick(action, data) {
				console.log(action)
				this.$store.dispatch(action, data)
			},

			removeModal($event) {
				if (
					this.showModal === true &&
					$event.target !== document.querySelector('.modal')
				) {
					this.setShowModal(false)
					this.setModal(null)
				} else {
					return
				}
			}
		}
	}
</script>

<style lang="scss">
	.modal-wrapper {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
	}
	.modal {
		border-radius: 10px;
		padding: 2em;
		background-color: #fff;
		box-shadow: 0px 3px 8px rgb(197, 197, 197);
		position: absolute;
		left: 50%;
		top: 25%;
		transform: translate(-50%, -25%);
		z-index: 10;
	}
</style>
