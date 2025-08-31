// ==== 変数 ====
// ポイント増減数
let step = 10;

// ==== 関数 ====
// 《保有ポイントを表示する処理》  
export function displayPointHeld(currentUser,pointDisplay) {
  const currentPoint = currentUser.point.getPoint();
  pointDisplay.textContent = `現在のポイント：${currentPoint}pt`
}

// QRコンテナを表示する処理
export function showQrContainer(qrContainer, QrScannerStopBtn, cardContainer) {
  // QRコードコンテナを表示
  qrContainer.style.display = 'block';

  // ✕ボタン表示
  QrScannerStopBtn.style.visibility = 'visible';

  // カードコンテナを非表示
  cardContainer.style.display = 'none';
}

// カードコンテナを表示する処理
export function showCardContainer(qrContainer, QrScannerStopBtn, cardContainer) {
  // QRコードコンテナを非表示
  qrContainer.style.display = 'none';

  // ✕ボタン非表示
  QrScannerStopBtn.style.visibility = 'hidden';

  // カードコンテナを表示
  cardContainer.style.display = 'block';
}

// ✕ボタンでカメラを停止する処理
export function stopCamera(html5QrCode) {
  html5QrCode.stopQrScan();
}

// 使用ポイントをリセットする処理
export function resetUsagePoint() {
  document.getElementById('user-points-input').value = 0;
}

// 使用するポイントを表示する処理
export function updateUsagePoint(action,currentUser) {
  const inputElement = document.getElementById('user-points-input');
  let inputPoint = parseInt(inputElement.value, 10);

  // 使用ポイント増減
  if (action === 'plus') {
    inputPoint = Math.min(currentUser.point.getPoint(), inputPoint + step);
  } else if (action === 'minus') {
    inputPoint = Math.max(0, inputPoint - step);
  }

  inputElement.value = inputPoint;
}