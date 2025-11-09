<template>
	<div class="min-h-screen bg-gray-50">

		<Header />

		<main class="py-8">
			<div class="container mx-auto px-4 lg:px-6 xl:px-8">

				<div class="mb-8">
					<h1 class="text-4xl font-extrabold text-gray-900 mb-1">Shopping Bag 🛍️</h1>
					<p class="text-xl text-gray-600">
						<span class="font-extrabold text-red-600">{{ bagItems.length }}</span>
						{{ bagItems.length === 1 ? 'item' : 'items' }} in your bag
					</p>
				</div>

				<div v-if="bagItems.length === 0" class="max-w-md mx-auto text-center py-20">
					<div class="bg-white p-12 rounded-2xl shadow-xl">
						<div class="w-24 h-24 mx-auto mb-6 bg-gray-100 flex items-center justify-center rounded-full">
							<i class="pi pi-shopping-cart text-5xl text-gray-400"></i>
						</div>
						<h3 class="text-3xl font-bold text-gray-800 mb-3">Your bag is empty</h3>
						<p class="text-gray-500 mb-10">Start adding some products to your bag and fill it up!</p>
						<router-link to="/products"
							class="inline-flex items-center px-10 py-4 bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition duration-200 uppercase tracking-wider rounded-xl shadow-lg">
							<i class="pi pi-arrow-left mr-3 text-lg"></i>
							Explore Products
						</router-link>
					</div>
				</div>


				<div v-else
					class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6 md:gap-8 max-w-7xl mx-auto min-h-[400px]">


					<div class="md:col-span-8 col-span-1 sm:col-span-1">
						<div class="bg-white rounded-xl shadow-xl overflow-hidden">

							<div
								class="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 bg-red-50 border-b-2 border-red-200 gap-4">
								<label class="flex items-center cursor-pointer group">
									<input type="checkbox" v-model="selectAll" @change="handleSelectAll"
										class="mr-3 cursor-pointer w-6 h-6 rounded accent-red-600" />
									<span class="text-lg text-gray-800 font-bold">
										Select All Items
									</span>
								</label>
								<button @click="handleClearBag"
									class="px-4 py-2 text-red-600 hover:bg-red-100 font-bold transition duration-200 flex items-center gap-2 rounded-lg w-full sm:w-auto justify-center">
									<i class="pi pi-trash text-base"></i>
									Clear Bag
								</button>
							</div>

							<div class="divide-y divide-gray-100">
								<div v-for="item in bagItems" :key="item.product.product_id"
									class="p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200">

									<div class="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
										<input type="checkbox" v-model="selectedItems" :value="item.product.product_id"
											class="mt-1 cursor-pointer flex-shrink-0 w-5 h-5 rounded accent-red-600" />

										<div
											class="flex items-center justify-center flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg shadow-sm">
											<i class="pi pi-box text-5xl text-gray-400"></i>
										</div>

										<div class="flex-1 min-w-0">
											<h3 class="text-xl font-bold mb-2 text-gray-900">
												{{ item.product.item_name || item.product.name }}
											</h3>
											<div class="flex items-center gap-2 mb-4">
												<span class="text-sm text-gray-600">Unit Price:</span>
												<span class="text-lg font-extrabold text-red-600">₱{{
													item.product.selling_price ?
													parseFloat(item.product.selling_price).toFixed(2) : '0.00'
													}}</span>
											</div>

											<div class="flex items-center gap-3">
												<span class="text-base font-semibold text-gray-700">Qty:</span>
												<div class="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
													<button
														@click="handleUpdateQuantity(item.product.product_id, item.quantity - 1)"
														class="bg-white hover:bg-red-600 hover:text-white flex items-center justify-center transition duration-200 w-8 h-8 rounded-lg shadow-sm">
														<i class="pi pi-minus text-sm"></i>
													</button>
													<span class="text-center font-bold text-lg w-10 text-gray-900">{{
														item.quantity
														}}</span>
													<button
														@click="handleUpdateQuantity(item.product.product_id, item.quantity + 1)"
														class="bg-white hover:bg-red-600 hover:text-white flex items-center justify-center transition duration-200 w-8 h-8 rounded-lg shadow-sm">
														<i class="pi pi-plus text-sm"></i>
													</button>
												</div>
											</div>
										</div>

										<div class="text-right flex-shrink-0 w-full sm:w-32 mt-4 sm:mt-0">
											<p class="text-2xl font-extrabold mb-3 text-gray-900">
												₱{{ ((parseFloat(item.product.selling_price) || 0) *
												item.quantity).toFixed(2) }}
											</p>
											<button @click="handleRemoveFromBag(item.product.product_id)"
												class="text-sm font-semibold hover:underline transition-colors duration-200 flex items-center gap-1 text-red-600 ml-auto">
												<i class="pi pi-times text-xs"></i>
												Remove
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>


					<div class="md:col-span-4 col-span-1 sm:col-span-1">
						<div class="bg-white rounded-xl shadow-xl overflow-hidden sticky top-24">

							<div class="p-6 bg-gradient-to-r from-red-600 to-orange-600">
								<h2 class="text-2xl font-bold text-white flex items-center gap-2">
									<i class="pi pi-shopping-bag"></i>
									Order Summary
								</h2>
							</div>

							<div class="p-6 flex flex-col gap-6">

								<div class="bg-gray-50 p-4 rounded-xl">
									<div class="flex justify-between items-center text-base mb-2 text-gray-700">
										<span>Selected Items</span>
										<span class="font-bold">{{ selectedBagItems.length }} {{ selectedBagItems.length
											=== 1 ? 'item'
											: 'items' }}</span>
									</div>
									<div class="flex justify-between items-center text-sm text-gray-500">
										<span>Total Items in Bag</span>
										<span class="font-semibold">{{ bagItems.length }} {{ bagItems.length === 1 ?
											'item' : 'items'
											}}</span>
									</div>
								</div>

								<div class="flex justify-between items-center pb-6 border-b border-gray-200">
									<span class="font-medium text-lg text-gray-700">Subtotal (Selected)</span>
									<span class="font-bold text-xl text-gray-900">
										₱{{ selectedSubtotal.toFixed(2) }}
									</span>
								</div>

								<div class="p-6 bg-red-50 rounded-xl border-2 border-red-300">
									<div class="flex justify-between items-center">
										<span class="text-xl font-bold text-gray-800">ORDER TOTAL</span>
										<span class="text-4xl font-extrabold text-red-600">
											₱{{ selectedSubtotal.toFixed(2) }}
										</span>
									</div>
								</div>

								<div class="flex flex-col gap-3">
									<button @click="handleCheckout" :disabled="selectedBagItems.length === 0"
										class="w-full py-5 px-6 font-extrabold text-xl text-white transition duration-200 flex items-center justify-center gap-2 rounded-xl shadow-lg"
										:class="{
											'bg-gray-400 cursor-not-allowed': selectedBagItems.length === 0,
											'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700': selectedBagItems.length > 0
										}">
										<i class="pi pi-credit-card text-lg"></i>
										<span v-if="selectedBagItems.length === 0">Select Items to Checkout</span>
										<span v-else>Checkout ({{ selectedBagItems.length }} Items)</span>
									</button>

									<router-link to="/products"
										class="w-full block text-center py-4 px-6 font-bold hover:bg-red-50 transition duration-200 text-lg text-red-600 border-2 border-red-600 rounded-xl">
										<i class="pi pi-arrow-left mr-2"></i>
										Continue Shopping
									</router-link>
								</div>

								<div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
									<div class="flex gap-3">
										<i class="pi pi-info-circle flex-shrink-0 text-blue-600 mt-0.5"></i>
										<p class="text-sm text-blue-900">
											<span class="font-bold">Important Note:</span> Present your bag code at any
											Luke Pharma branch to
											complete your purchase.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>


		<Footer />

	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useBag } from '@/composables/useBag.js'
import Swal from 'sweetalert2'
import axios from 'axios'

const {
	bagState,
	removeFromBag,
	updateQuantity,
	clearBag,
	generateBagCode
} = useBag()

const calculateTotals = () => {
	bagState.value.total = bagState.value.items.reduce((sum, item) =>
		sum + ((parseFloat(item.product.selling_price) || 0) * item.quantity), 0)
	bagState.value.itemCount = bagState.value.items.reduce((sum, item) => sum + item.quantity, 0)
}

const useBreakpoints = () => {
	if (typeof window === 'undefined') {
		return computed(() => ({ mdAndUp: false }));
	}
	const isMdAndUp = ref(window.innerWidth >= 1024);

	onMounted(() => {
		const update = () => {
			isMdAndUp.value = window.innerWidth >= 1024;
		};
		window.addEventListener('resize', update);
		return () => window.removeEventListener('resize', update);
	});

	return computed(() => ({ mdAndUp: isMdAndUp.value }));
};

const $breakpoint = useBreakpoints();

const selectedItems = ref([])

const bagItems = computed(() => bagState.value.items)

const selectedBagItems = computed(() => {
	return bagItems.value.filter(item =>
		item.product && selectedItems.value.includes(item.product.product_id)
	)
})

const selectedSubtotal = computed(() => {
	return selectedBagItems.value.reduce((total, item) => {
		const price = parseFloat(item.product.selling_price) || 0
		return total + (price * item.quantity)
	}, 0)
})

const selectAll = computed({
	get: () => selectedItems.value.length === bagItems.value.length && bagItems.value.length > 0,
	set: (value) => {
		if (value) {
			selectedItems.value = bagItems.value
				.map(item => item.product && item.product.product_id)
				.filter(id => id !== undefined)
		} else {
			selectedItems.value = []
		}
	}
})

const handleSelectAll = () => {
	selectAll.value = !selectAll.value
}

const handleUpdateQuantity = (productId, newQuantity) => {
	if (newQuantity <= 0) {
		handleRemoveFromBag(productId)
	} else {
		updateQuantity(productId, newQuantity)
	}
}

const handleRemoveFromBag = (productId) => {
	removeFromBag(productId)

	const index = selectedItems.value.indexOf(productId)
	if (index > -1) {
		selectedItems.value.splice(index, 1)
	}
}

const handleClearBag = async () => {
	const result = await Swal.fire({
		title: 'Clear Shopping Bag?',
		text: 'Are you sure you want to remove all items from your bag?',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#DC2626',
		cancelButtonColor: '#6B7280',
		confirmButtonText: 'Yes, clear bag',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		clearBag()
		selectedItems.value = []

		await Swal.fire({
			title: 'Bag Cleared!',
			text: 'All items have been removed from your bag.',
			icon: 'success',
			timer: 2000,
			showConfirmButton: false
		})
	}
}

const handleCheckout = async () => {
	if (selectedBagItems.value.length === 0) {
		await Swal.fire({
			title: 'No Items Selected',
			text: 'Please select at least one item to checkout.',
			icon: 'warning',
			confirmButtonColor: '#DC2626'
		})
		return
	}

	const summaryHtml = selectedBagItems.value.map(item => {
		const itemName = item.product.item_name || item.product.name || 'Unknown Item'
		const price = parseFloat(item.product.selling_price) || 0
		return `
			<div class="flex justify-between text-sm mb-1">
				<span>${itemName} &times; ${item.quantity}</span>
				<span>₱${(price * item.quantity).toFixed(2)}</span>
			</div>
		`
	}).join('')

	const confirmResult = await Swal.fire({
		title: 'Confirm Checkout',
		html: `
			<div class="text-left">
				<p class="mb-4">Are you sure you want to proceed with checkout?</p>
				<div class="bg-gray-50 p-4 rounded-lg mb-4">
					<h4 class="font-semibold mb-2">Order Summary:</h4>
					${summaryHtml}
					<div class="border-t mt-2 pt-2 font-bold flex justify-between">
						<span>Total:</span>
						<span>₱${selectedSubtotal.value.toFixed(2)}</span>
					</div>
				</div>
				<p class="text-sm text-gray-600">A unique bag code will be generated for you to present at the physical store.</p>
			</div>
		`,
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#DC2626',
		cancelButtonColor: '#6B7280',
		confirmButtonText: 'Yes, proceed',
		cancelButtonText: 'No, go back'
	})

	if (confirmResult.isConfirmed) {
		const bagCode = generateBagCode()
		const totalAmount = selectedSubtotal.value.toFixed(2)

		const now = new Date();
		const orderDate = now.toISOString().slice(0, 19).replace('T', ' ');

		const validUntilDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');

		const orderItems = selectedBagItems.value.map(item => ({
			product_id: item.product.product_id,
			quantity: item.quantity,
			unit_price_at_sale: parseFloat(item.product.selling_price) || 0
		}))

		try {
			const response = await axios.post('http://localhost:3000/api/orders', {
				bag_code: bagCode,
				total_amount: totalAmount,
				order_date: orderDate,
				valid_until: validUntilDate,
				items: orderItems
			})

			if (response.status !== 201) {
				throw new Error(response.data.message || 'Server reported an unknown failure.')
			}

			await Swal.fire({
				title: 'Checkout Successful!',
				html: `
						<div class="text-center">
							<div class="mb-6">
								<i class="pi pi-check-circle text-6xl text-green-500"></i>
							</div>
							<p class="mb-4">Your order has been confirmed!</p>
							<div class="bg-red-50 border-2 border-red-500 rounded-lg p-6 mb-4">
								<p class="text-sm text-gray-600 mb-2">Your Bag Code:</p>
								<p class="text-3xl font-bold text-red-600 mb-2">${bagCode}</p>
							</div>
							<div class="text-left bg-gray-50 p-4 rounded-lg text-sm">
								<p class="font-semibold mb-2">Instructions:</p>
								<ul class="text-gray-600 space-y-1">
									<li>• Present this code at any Luke Pharma branch</li>
									<li>• Code is valid for 7 days (as set by system)</li>
									<li>• Screenshot this page for reference</li>
									<li>• Proceed to the cashier for payment</li>
								</ul>
							</div>
						</div>
					`,
				icon: false,
				confirmButtonText: 'Done',
				confirmButtonColor: '#DC2626',
				showCancelButton: true,
				cancelButtonText: 'Copy Code',
				cancelButtonColor: '#6B7280'
			}).then((result) => {
				if (result.dismiss === Swal.DismissReason.cancel) {
					navigator.clipboard.writeText(bagCode).then(() => {
						Swal.fire({
							title: 'Code Copied!',
							text: `Bag code ${bagCode} has been copied to clipboard.`,
							icon: 'success',
							timer: 2000,
							showConfirmButton: false
						})
					})
				}
			})

			bagState.value.items = bagState.value.items.filter(item =>
				!(item.product && selectedItems.value.includes(item.product.product_id))
			)

			calculateTotals()
			selectedItems.value = []

		} catch (error) {
			console.error('API Error during Checkout:', error.response?.data?.message || error.message);

			await Swal.fire({
				title: 'Checkout Failed',
				text: error.response?.data?.message || 'There was an error processing your order. Please check stock and try again.',
				icon: 'error',
				confirmButtonColor: '#DC2626'
			})
		}
	}
}

onMounted(() => {
	window.scrollTo(0, 0)
	$breakpoint.value
	selectedItems.value = bagItems.value
		.map(item => item.product && item.product.product_id)
		.filter(id => id !== undefined)
})
</script>