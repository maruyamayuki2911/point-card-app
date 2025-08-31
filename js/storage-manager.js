// ==== クラス ====
// 《localstorageを管理するクラス》
export class storageManager {
  static setLastScanDate(date) {
    localStorage.setItem('lastQrScanDate', date);
  }

  static getLastScanDate() {
    return localStorage.getItem('lastQrScanDate');
  }
}
