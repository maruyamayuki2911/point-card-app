// ----------変数----------

// Userインスタンス
let currentUser;

// QRコードインスタンス生成
const html5QrCode = new Html5Qrcode('qr-reader');

// QRコードコンテナ要素
const qrContainer = document.getElementById('qr-reader');

// カード要素
const cardContainer = document.getElementById('card');

// ----------クラス／関数----------

// 《◆ユーザー情報の管理》
class User {
  constructor(id, name, points) {
    this.id = id;
    this.name = name;
    this.points = points;
  }

  // ポイントを加算 
  addPoints(amount) {
    this.points += amount;
  }

  // 現在のポイントを返す
  getPoints() {
    return this.points;
  }
}

// 《◆現在のポイントを表示する処理》  
function updateDisplay() {
  const display = document.getElementById('point-display');
  display.textContent = `現在のポイント：${currentUser.getPoints()}pt  
`
}

// 《◆今日のポイントを追加する処理》
function addPointsToday() {
  // 最後にスキャンした日付を取得
  const lastScanDate = localStorage.getItem('lastQrScanDate');

  // 今日の日付を取得
  const scanDate = new Date().toISOString().slice(0, 10);

  // 1日1回の判定
  if (lastScanDate === scanDate) {
    alert('今日はすでにポイントを獲得しています。');
    return;
  }

  // ポイントを追加
  const point = 10;
  currentUser.addPoints(point);

  // スキャン日を保存
  localStorage.setItem('lastQrScanDate', scanDate);

  alert('QRコードを読み取りしました。10pt加算されました。');

  // 現在のポイントを表示
  updateDisplay();
}

// 《◆スキャン成功時の処理》
const onScanSuccess = async (decodeText) => {
  // カメラを停止
  html5QrCode.stop();

  // QRコードコンテナを表示
  qrContainer.style.display = 'none';

  // カードコンテナを非表示
  cardContainer.style.display = 'block';

  // ポイントを加算
  addPointsToday();
}

// 《◆QRコードスキャンを開始する処理》
const startQrScan = async () => {
  // QRコードコンテナを表示
  qrContainer.style.display = 'block';

  // カードコンテナを非表示
  cardContainer.style.display = 'none';

  // QRスキャンを開始
  await html5QrCode.start(
    { facingMode: 'environment' },
    { fps: 10, qrbox: { width: 250, height: 250 } },
    onScanSuccess
  );
}


// ----------運転----------

addEventListener('DOMContentLoaded', () => {

  // インスタンス生成
  currentUser = new User(1, '田中', 10);
  console.log("インスタンス：", currentUser);

  // 現在のポイントを表示
  updateDisplay();

  // カメラ起動イベント
  document.getElementById('start-scan-btn').addEventListener('click', () => { startQrScan(); });

});