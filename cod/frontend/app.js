const target = new URLSearchParams(window.location.search).get('target');
const value = new URLSearchParams(window.location.search).get('value');
const data = new URLSearchParams(window.location.search).get('data');
const deadline = new URLSearchParams(window.location.search).get('deadline');

document.getElementById('connect').addEventListener('click', async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    document.getElementById('status').innerText = 'کیف پول متصل شد';
  } else {
    document.getElementById('status').innerText = 'لطفاً کیف پول متاماسک را نصب کنید';
  }
});

document.getElementById('signTx').addEventListener('click', async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // امضا گرفتن
  const message = `Target: ${target}, Value: ${value}, Data: ${data}, Deadline: ${deadline}`;
  const signature = await signer.signMessage(message);

  // اجرای تراکنش با امضا
  const contract = new ethers.Contract('آدرس قرارداد شما', abi, signer);
  const tx = await contract.executeWithSignature(target, value, data, deadline, signature);
  await tx.wait();
  document.getElementById('status').innerText = `تراکنش ارسال شد: ${tx.hash}`;
});
