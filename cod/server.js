// server.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { ethers } = require('ethers');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// سرو کردن فایل‌های استاتیک مثل index.html, app.js, style.css
app.use(express.static(path.join(__dirname, 'frontend')));

// رندر index.html در مسیر '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// یک مسیر آزمایشی برای چک کردن وضعیت سرور یا پارامترها
app.get('/sign', async (req, res) => {
  const { target, amount } = req.query;

  if (!target || !amount) {
    return res.status(400).send('Missing target or amount');
  }

  res.send(`✅ درخواست برای امضا دریافت شد. هدف: ${target} | مقدار: ${amount}`);
});

// اتصال به بلاک‌چین (مثال)
const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

app.get('/balance', async (req, res) => {
  const balance = await wallet.getBalance();
  res.send(`💰 موجودی ولت: ${ethers.formatEther(balance)} ETH`);
});

// اجرای سرور
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
