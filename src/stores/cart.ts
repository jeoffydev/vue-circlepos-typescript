// import { defineStore } from 'pinia'
// import { ref, computed } from 'vue'

// export interface ICartItem {
//   id: number
//   title: string
//   price: number
//   quantity: number
//   image?: string
// }

// export const useCartStore = defineStore('cart', () => {
//   // State
//   const items = ref<ICartItem[]>([])

//   // Getters (computed)
//   const totalItems = computed(() => 
//     items.value.reduce((total, item) => total + item.quantity, 0)
//   )

//   const totalPrice = computed(() => 
//     items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
//   )

//   const isEmpty = computed(() => items.value.length === 0)

//   // Actions
//   const addToCart = (product: Omit<ICartItem, 'quantity'>) => {
//     const existingItem = items.value.find(item => item.id === product.id)
    
//     if (existingItem) {
//       existingItem.quantity++
//     } else {
//       items.value.push({ ...product, quantity: 1 })
//     }
//   } 

//   const clearCart = () => {
//     items.value = []
//   }

//   return {
//     // State
//     items,
//     // Getters
//     totalItems,
//     totalPrice,
//     isEmpty,
//     // Actions
//     addToCart, 
//     clearCart
//   }
// })