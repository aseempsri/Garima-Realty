const RENTAL_INDEX_ACCESS_KEY = 'garima-rental-index-access';
const RENTAL_INDEX_PASSWORD = 'garima-rent';

export function isRentalIndexUnlocked(): boolean {
  if (typeof sessionStorage === 'undefined') {
    return false;
  }
  return sessionStorage.getItem(RENTAL_INDEX_ACCESS_KEY) === '1';
}

export function unlockRentalIndex(password: string): boolean {
  if (password.trim() !== RENTAL_INDEX_PASSWORD) {
    return false;
  }
  sessionStorage.setItem(RENTAL_INDEX_ACCESS_KEY, '1');
  return true;
}
