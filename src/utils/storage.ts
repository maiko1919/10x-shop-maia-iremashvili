import { StorageService } from "../models/StorageService";
import { STORAGE_KEYS } from "./storageKeys";
import { isCartState, isOrderList, isProfile, isReviewsStore } from "./guards";

// T ავტომატურად გამოიყვანება type guard-იდან
export const cartStorage = new StorageService(STORAGE_KEYS.cart, isCartState);
export const ordersStorage = new StorageService(STORAGE_KEYS.orders, isOrderList);
export const reviewsStore = new StorageService(STORAGE_KEYS.reviews, isReviewsStore);
export const profileStorage = new StorageService(STORAGE_KEYS.profile, isProfile);