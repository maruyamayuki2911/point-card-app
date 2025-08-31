// ==== 定義ファイル ====
import { displayPointHeld, showQrContainer, showCardContainer, stopCamera, resetUsagePoint } from './ui.js';
import { storageManager } from './storage-manager.js';


// ==== クラス／関数 ====
// 《今日のポイントを追加する処理》
export function addPointToday(currentUser,pointDisplay) {
  // 最後にスキャンした日付を取得
  const lastScanDate = storageManager.getLastScanDate();

  // 今日の日付を取得
  const scanDate = getTodayDate();

  // 1日1回の判定
  if (lastScanDate === scanDate) {
    alert('今日はすでにポイントを獲得しています。');
    return;
  }

  // 正常系の処理
  // ポイントを追加
  const point = 10;
  currentUser.point.addPoint(point);

  // スキャン日を保存
  storageManager.setLastScanDate(scanDate);

  alert('QRコードを読み取りしました。10pt加算されました。');

  // 現在のポイントを表示
  displayPointHeld(currentUser,pointDisplay);
}

// 今日の日付を取得する処理
export function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

// 《ポイントを使用する処理｠
export function usePoint(usagePoint,currentUser,pointDisplay) {
  const userPoint = currentUser.point.getPoint();

  // 無効な入力チェック
  if (usagePoint <= 0) {
    alert('ポイントを入力してください');
    return;
  }

  // ポイント残高チェック
  if (userPoint < usagePoint) {
    alert('ポイントが足りません');
    return;
  }

  // 正常系の処理
  currentUser.point.subtractPoint(usagePoint);
  displayPointHeld(currentUser,pointDisplay);
  alert('ポイントを使用しました。');
  resetUsagePoint();
}