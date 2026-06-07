const SALE_INDEX_ACCESS_KEY = 'garima-sale-index-access';
const SALE_INDEX_PASSWORD = 'garima-sale';

export function isSaleIndexUnlocked(): boolean {
  if (typeof sessionStorage === 'undefined') {
    return false;
  }
  return sessionStorage.getItem(SALE_INDEX_ACCESS_KEY) === '1';
}

export function unlockSaleIndex(password: string): boolean {
  if (password.trim() !== SALE_INDEX_PASSWORD) {
    return false;
  }
  sessionStorage.setItem(SALE_INDEX_ACCESS_KEY, '1');
  return true;
}
