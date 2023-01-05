import type { Product } from "../../../interfaces";
import {useEffect} from 'react'
export const addCart = (product: Product) => {
  if (typeof window == 'undefined') {
    return
  }
  const id = product.id;
  const cart = JSON.parse(window.localStorage.getItem('cart') || "{}")

  cart[id] = cart[id] ? {
    ...cart[id],
    count: cart[id].count + 1
  } : {
    imgUrl: product.fields.img && product.fields.img.length ? product.fields.img[0].thumbnails.large.url : '',
    count: 1,
    price: product.fields.nomenclature_price,
    title: product.fields.nomenclature_title,
    "Name (from nomenclature_category_id)": product.fields["Name (from nomenclature_category_id)"],
    "Name (from places)": product.fields["Name (from places)"]
  }

  cart.totalPrice = cart.totalPrice ? cart.totalPrice + product.fields.nomenclature_price : product.fields.nomenclature_price
  cart.totalItems = cart[id].count == 1 ? (cart.totalItems ? cart.totalItems : 0) + 1 : cart.totalItems

  window.localStorage.setItem('cart', JSON.stringify(cart))
};

export const removeCart = (id: string) => {
  if (typeof window == 'undefined') {
    return
  }
  const cart = JSON.parse(window.localStorage.getItem('cart') || "{}")

  cart.totalPrice = cart.totalPrice - cart[id].price
  cart.totalItems = cart[id].count == 1 ? cart.totalItems - 1 : cart.totalItems

  cart[id] = cart[id].count > 1 ? {
    ...cart[id],
    count: cart[id].count - 1
  } : undefined

  const { [id]: _, ...withoutCart } = cart;

  window.localStorage.setItem('cart', cart[id] ? JSON.stringify(cart) : JSON.stringify(withoutCart))

}

export const getCarts = () => {
  if (typeof window == 'undefined') {
    return {}
  }
  
  const cart = JSON.parse(window.localStorage.getItem('cart') || "{}")
  return cart
}
