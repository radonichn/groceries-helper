<script setup lang="ts">
import { ref, computed } from 'vue'

import type { IProductItem } from '@/types/productItem'
import ProductItemCard from '@/components/ProductItemCard.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import ModalDialog from '@/components/common/ModalDialog.vue'

const products: IProductItem[] = [
  {
    productName: 'Banana',
    productCode: '122',
    productImageUrl: 'https://png.pngtree.com/png-clipart/20220716/ourmid/pngtree-banana-yellow-fruit-banana-skewers-png-image_5944324.png',
  },
  {
    productName: 'Kineski kupus',
    productCode: '233',
    productImageUrl: 'https://www.gronsaksmastarna.se/media/1692/sallatskal-web.png?anchor=center&mode=crop&width=500&rnd=131352597500000000',
  },
]

const searchText = ref<string>('')
const filteredProducts = computed<IProductItem[]>(() => products.filter(v =>
  v.productName.toLowerCase().includes(searchText.value.toLowerCase())),
)

const isModalVisible = ref<boolean>(true)
</script>

<template>
  <ModalDialog
    v-model="isModalVisible"
    title="Add new product"
  />
  <SearchBar v-model="searchText" />
  <ProductItemCard
    v-for="product of filteredProducts"
    :key="product.productCode"
    :product="product"
    class="mt-4"
  />
</template>
