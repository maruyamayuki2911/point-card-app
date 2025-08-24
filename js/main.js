// ==== 変数 ====

// Userインスタンス
let currentUser;

// QRコードインスタンス生成
let html5QrCode;

// QRコードコンテナ要素
const qrContainer = document.getElementById('qr-reader');

// カード要素
const cardContainer = document.getElementById('card');

// ==== クラス／関数 ====

// 《ユーザー情報を管理するクラス》
class User {
  constructor(id, name, point) {
    this.id = id;
    this.name = name;
    this.point = new UserPoint(point);
  }
}

// 《ポイントを管理するクラス》
class UserPoint {
  constructor(point) {
    this.point = point;
  }

  // ポイントを加算
  addPoint(amount) {
    this.point += amount;
  }

  // ポイントを減算
  subtractPoint(amount) {
    this.point -= amount;
  }

  // 現在のポイントを返す
  getPoint() {
    return this.point;
  }
}

// 《QRコードクラス》
class QrScanner {
  constructor(element) {
    this.qr = new Html5Qrcode(element);
  }

  // カメラ起動
  startQrScan = async () => {
    // QRコンテナ表示
    showQrContainer();

    await this.qr.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      this.handleScanSuccess
    );
  }

  // カメラ停止
  stopQrScan = () => {
    this.qr.stop();
  }

  // スキャン成功時の処理
  handleScanSuccess = (decodeText) => {
    // カメラ停止
    this.stopQrScan();

    // カードコンテナ表示
    showCardContainer();

    // ポイント追加

    // ポイント追加した日付を記録
    storageManager.setLastScanDate(getTodayDate());
  }
}


// 《localstorageを管理するクラス》
class storageManager {
  static setLastScanDate(date) {
    localStorage.setItem('lastQrScanDate', date);
  }

  static getLastScanDate() {
    return localStorage.getItem('lastQrScanDate');
  }
}

// 今日の日付を取得する処理
function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

// 《保有ポイントを表示する処理》  
function displayPointHeld() {
  const pointDisplay = document.getElementById('point-display');
  pointDisplay.textContent = `現在のポイント：${currentUser.point.getPoint()}pt`
}

// QRコンテナを表示する処理
function showQrContainer() {
  // QRコードコンテナを表示
  qrContainer.style.display = 'block';

  // カードコンテナを非表示
  cardContainer.style.display = 'none';
}

// カードコンテナを表示する処理
function showCardContainer() {
  // QRコードコンテナを非表示
  qrContainer.style.display = 'none';

  // カードコンテナを表示
  cardContainer.style.display = 'block';
}

// 《今日のポイントを追加する処理》
function addPointToday() {
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
  currentUserPoint.addPoint(point);

  // スキャン日を保存
  localStorage.setItem('lastQrScanDate', scanDate);

  alert('QRコードを読み取りしました。10pt加算されました。');

  // 現在のポイントを表示
  displayPointHeld();
}

// 《ポイントを使用する処理｠
function usePoint(userPoint, usagePoint) {

  if (userPoint >= usagePoint) {
    currentUserPoint.subtractPoint(usagePoint);

    displayPointHeld();

    alert('ポイントを使用しました。');
  } else {
    alert('ポイントが足りません');
  }
}


// ==== 運転 ====

document.addEventListener('DOMContentLoaded', () => {

  // テストインスタンス生成
  const point = 100;
  currentUser = new User(1, '田中', point);
  console.log("インスタンス：", currentUser);

  // QRコードインスタンス生成
  html5QrCode = new QrScanner('qr-reader');
  console.log(html5QrCode);

  // 現在のポイントを表示
  displayPointHeld();

  // カメラ起動イベント
  document.getElementById('start-scan-btn').addEventListener('click', html5QrCode.startQrScan);

  // ポイントを使うイベント
  document.getElementById('use-point-btn').addEventListener('click', () => {
    const usagePoint = document.getElementById('user-points-input').value;
    const userPoint = currentUser.point;

    usePoint(userPoint, usagePoint);
  });

});