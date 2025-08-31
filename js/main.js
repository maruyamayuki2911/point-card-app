// ==== 定義ファイル ====
import { User } from './user.js';
import { QrScanner } from './qr.js';
import { QrDecoder } from './qr-decoder.js';
import { displayPointHeld, showQrContainer, showCardContainer, stopCamera, resetUsagePoint,updateUsagePoint } from './ui.js';
import { addPointToday, usePoint } from './point-service.js';


// ==== 変数 ====
// Userインスタンス
let currentUser;
// QRコードインスタンス
let html5QrCode;
// デコーダーインスタンス
let decoder;
// QRコードコンテナ要素
const qrContainer = document.getElementById('qr-reader');
// カード要素
const cardContainer = document.getElementById('card');
// カメラ停止ボタン要素
const QrScannerStopBtn = document.getElementById('qr-stop-btn');
// ユーザーポイント要素
const pointDisplay = document.getElementById('point-display');


// ==== 運転 ====
document.addEventListener('DOMContentLoaded', () => {
  const point = 50;
  currentUser = new User(1, '田中', point);
  html5QrCode = new QrScanner('qr-reader');
  decoder = new QrDecoder();

  // 現在のポイントを表示
  displayPointHeld(currentUser, pointDisplay);

  // カメラ起動イベント
  document.getElementById('start-scan-btn').addEventListener('click', async () => {
    try {
      // QRコンテナを表示
      showQrContainer(qrContainer, QrScannerStopBtn, cardContainer);
      const decodeText = await html5QrCode.startQrScan();
      // カードコンテナ表示
      showCardContainer(qrContainer, QrScannerStopBtn, cardContainer);

      // ハンドラ登録
      decoder.register("add-points", () => addPointToday(currentUser, pointDisplay));

      // デコードテキスト判定
      const result = decoder.validate(decodeText);

      if (result.valid) {
        result.action();
      } else {
        alert('未対応のQRコードです');
      }
    } catch (error) {
      console.log(error);
    }
  });

  // カメラ停止イベント
  QrScannerStopBtn.addEventListener('click', () => {
    stopCamera(html5QrCode);
    showQrContainer(qrContainer, QrScannerStopBtn, cardContainer);
    showCardContainer(qrContainer, QrScannerStopBtn, cardContainer);
  });

  // ポイントを使うイベント
  document.getElementById('use-point-btn').addEventListener('click', () => {
    const usagePoint = parseInt(document.getElementById('user-points-input').value, 10);

    usePoint(usagePoint, currentUser,pointDisplay);
  });

  // 使用するポイントの増減イベント
  document.querySelector('.point-control').addEventListener('click', (e) => {
    if (!e.target.classList.contains('adjust-btn')) return;
    const action = e.target.dataset.action;

    if (action === 'plus') {
      updateUsagePoint(action,currentUser);
    } else if (action === 'minus') {
      updateUsagePoint(action,currentUser);
    }
  });
});