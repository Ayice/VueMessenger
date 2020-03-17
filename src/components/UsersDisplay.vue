<template>
	<div v-if="status === 'loading'">
		<h1>Loading</h1>
	</div>

	<section v-else class="users">
		<div v-for="allUser in allUsers" :key="allUser.id" class="user">
			<span class="add" @click="addFriend(allUser)"></span>
			<router-link :to="'/profile/' + allUser.id">
				<p>{{allUser.username}}</p>
			</router-link>
		</div>
		<Modal
			v-if="showModal"
			:title="modalTitle"
			:text="modalText"
			:action="modalFunc"
			:data="modalData"
		/>
	</section>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import Modal from './Modal'
	export default {
		props: ['id'],
		components: { Modal },
		name: 'DisplayUsers',
		data() {
			return {
				showModal: false,
				modalText: '',
				modalTitle: '',
				modalFunc: '',
				modalData: null
			}
		},
		methods: {
			addFriend(newFriend) {
				this.showModal = true
				this.modalText =
					'Do you want to add ' + newFriend.username + ' as a friend?'
				this.modalTitle = 'Add a friend!'
				this.modalFunc = 'addNewFriend'
				this.modalData = newFriend
			}
		},
		computed: {
			...mapState(['allUsers', 'user', 'status']),
			...mapActions(['addNewFriend'])
		},
		mounted() {
			this.$store.dispatch('allUsers')
		}
	}
</script>

<style lang="scss" >
	.users {
		width: 20%;
		position: relative;

		.user {
			padding: 1em 0;
			margin: 10px 0px;
			width: 100%;
			box-shadow: 4px 5px 8px rgba(104, 103, 103, 0.133);
			text-align: center;

			p {
				font-size: 1.2em;
				font-weight: 500;
			}

			.add {
				cursor: pointer;
				display: block;
				position: absolute;
				right: -10%;
				border-radius: 50%;
				width: 50px;
				height: 50px;
				background-color: transparent;
				border: 1px solid rgb(209, 209, 209);
				transition: all 0.3s ease-out;

				&:hover {
					background-color: rgb(209, 209, 209);
					transform: scale(1.2);
				}

				&::before,
				&::after {
					content: '';
					height: 3px;
					width: 15px;
					background-color: gray;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					transition: all 0.3s ease-out;
				}

				&::after {
					transform: translate(-50%, -50%) rotate(90deg);
				}
			}
		}
	}
</style>