// ==== クラス ====
// 《QRコードクラス》
export class QrScanner {
  constructor(element) {
    this.qr = new Html5Qrcode(element);
  }

  // QR読み取り
  async startQrScan() {
    return new Promise((resolve, reject) => {
      this.qr.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodeText) => {
          this.stopQrScan();
          resolve(decodeText);
        }
      ).catch(reject);
    });
  }

  // カメラ停止
  stopQrScan = () => {
    this.qr.stop();
  }
}