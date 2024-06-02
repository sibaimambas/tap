
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Home() {
  const [points, setPoints] = useState(0);
  const [taps, setTaps] = useState(0);
  const [referrals, setReferrals] = useState(0);
  const [referralPoints, setReferralPoints] = useState(0);
  const dailyLimit = 100 + referrals * 10;
  const router = useRouter();

  useEffect(() => {
    const ref = router.query.ref;
    if (ref) {
      handleReferral(ref);
    }
  }, [router.query]);

  const handleTap = () => {
    if (taps < dailyLimit) {
      setPoints(points + 1);
      setTaps(taps + 1);
    }
  };

  const handleReferral = (ref) => {
    setReferrals(referrals + 1);
    setReferralPoints(referralPoints + Math.floor(points * 0.05));
  };

  const generateReferralLink = () => {
    const referralLink = `${window.location.origin}?ref=${points}`;
    navigator.clipboard.writeText(referralLink);
  };

  const postReferralLink = async () => {
    const userId = 'YOUR_USER_ID'; // Получите ID текущего пользователя
    const referralLink = `${window.location.origin}?ref=${points}`;
    const message = `Join the game and start earning points! ${referralLink}`;
    await sendMessage(userId, message);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{ width: '100px', height: '100px', backgroundColor: 'gold', borderRadius: '50%', margin: '0 auto' }}>
        <p style={{ lineHeight: '100px', fontSize: '24px' }}>{points}</p>
      </div>
      <button onClick={handleTap} style={{ padding: '10px 20px', marginTop: '20px', fontSize: '18px' }}>
        TAP
      </button>
      <p>{taps} / {dailyLimit} taps used</p>
      <button onClick={generateReferralLink} style={{ padding: '10px 20px', marginTop: '20px', fontSize: '18px', backgroundColor: 'lightgreen' }}>
        Generate Referral Link
      </button>
      <button onClick={postReferralLink} style={{ padding: '10px 20px', marginTop: '20px', fontSize: '18px', backgroundColor: 'lightblue' }}>
        Post Referral Link
      </button>
      <p>Referrals: {referrals}</p>
      <p>Referral Points: {referralPoints}</p>
    </div>
  );
}

// Функция для отправки сообщения от имени пользователя
const sendMessage = async (userId, message) => {
  const response = await axios.post(`https://api.farcaster.xyz/messages`, {
    userId,
    text: message,
  });
  return response.data;
};
