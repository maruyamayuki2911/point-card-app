# ライブラリ html-qrcodeの使い方(CDN)

## **STEP1 CDNでライブラリを読み込む**
```html
<script src="https://unpkg.com/html5-qrcode" type="text/javascript">
```

## **STEP2 QRスキャンUIを表示するHTMLを実装**
```html
<div id="reader" width="600px"></div>
```

## **STEP3 クラスを使用してQRコードスキャナーを設定**

```JavaScript
// インスタンス生成
const html5QrCode = new Html5Qrcode('reader');

// Promise.ver
// カメラを起動
html5WrCode.start(
  {fps:10, 
  qrbox:{width:250 ,height:250} 
  },
  {facingMode:'environment'}, 
  (decodedText)=>{ // decodedText⇒
    // 読み取り時の処理
    alert('QRコードを読み取りました！');
  },stop().then(()=>{
    // QRコードの読み取り結果の処理
  });
);

// async await.ver
const startScan = async () => {
  const html5QrCode = new Html5QrCode(QRコードを表示する要素);

  // スキャン成功時の処理
  const onScanSuccess = async (decodeText)=>{
    html5QrCode.stop();
    // QRコードの読み取り結果の処理
    alert('QRコードを読み取りました！');
  }

  // カメラ起動
  html5QrCode.start(
    { facingMode: 'environment' },
    { fps: 10, qrbox: { width: 250, height: 250 } },
    onScanSuccess
  );
}

```

#### 補足
  * [ ] ``start()``
    - **第一引数：設定オプション**
      - ``fps``：読み取りのフレームレート（1秒間に何回スキャンするか）
      - ``qrbox``：スキャン領域のサイズ（カメラ画面内の枠）
    - **第二引数：カメラ設定**
      -  ``facingMode``：フロントカメラ、バックカメラの設定
    - **第三引数：コールバック関数**
      - ``(decodeText)=>{・・・}``：``decodeText``は読み取られた文字列（QRコードの中身）。カメラ停止などの処理を定義。

  * [ ] ``stop()``
    - カメラを停止する関数
    - 非同期処理のため、Promiseを完了する必要がある。