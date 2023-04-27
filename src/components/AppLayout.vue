<script setup lang="ts">

import ProductItemCard from '@/components/ProductItemCard.vue'
import type { IProductItem } from '@/types/productItem'

const product: IProductItem = {
  productName: 'Banana',
  productCode: '122',
  productImageUrl: 'https://png.pngtree.com/png-clipart/20220716/ourmid/pngtree-banana-yellow-fruit-banana-skewers-png-image_5944324.png',
}
</script>

<template>
  <ProductItemCard :product="product" />
</template>
