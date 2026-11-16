'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
const ThreeDiningScene = dynamic(() => import('@/components/ThreeDiningScene'), { ssr: false });
export default function HomePage() {
  const { phase, setPhase, coins, gems, hostOrder, spinHostDraw, players, spendCoins } = useGameStore();
  const [gender, setGender] = useState<'female' | 'male'>('female');
  const [fabricColor, setFabricColor] = useState('#d946ef');
  const [preset, setPreset] = useState<'pastel' | 'persian' | 'luxury'>('pastel');
  const [wheelDeg, setWheelDeg] = useState(0);
  const [customDish, setCustomDish] = useState('');
  const [recipes, setRecipes] = useState(['ته‌چین زعفرانی مجلسی', 'فسنجان انار', 'سالمون گریل', 'تیرامیسو وانیلی']);
  const [cookStep, setCookStep] = useState(0);
  const [feed, setFeed] = useState<string[]>(['نرگس: وای چقدر ویلا و میز امشب شیکه!', 'میلاد: بوی زعفرون تا دم در میاد!']);
  const [scores, setScores] = useState({ food: 9, decor: 10, host: 9, style: 9 });
  const [revealed, setRevealed] = useState(false);
  const tabs: { id: typeof phase; label: string }[] = [
    { id: 'avatar', label: '۱. آواتار و کمد' },
    { id: 'lobby', label: '۲. قرعه‌کشی و تم' },
    { id: 'villa', label: '۳. ویلا سه‌بعدی' },
    { id: 'kitchen', label: '۴. آشپزخانه آزاد' },
    { id: 'party', label: '۵. مهمانی زنده' },
    { id: 'oscar', label: '۶. امتیاز و اسکار' },
  ];
  return (
    <div className="min-h-screen pb-12">
      <header className="sticky top-0 z-30 glass px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-extrabold text-purple-900">بفرمایید شام آنلاین | BEFARMA SHAM WORLD</h1>
            <p className="text-xs text-purple-700">میزبان شب اول: {hostOrder[0]}</p>
          </div>
          <div className="flex gap-2 text-xs font-bold">
            <span className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800">سکه: {coins.toLocaleString()}</span>
            <span className="px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800">الماس: {gems.toLocaleString()}</span>
          </div>
        </div>
        <nav className="max-w-6xl mx-auto mt-3 flex gap-2 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setPhase(t.id)} className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${phase === t.id ? 'bg-purple-700 text-white' : 'bg-white text-purple-900 border border-purple-200'}`}>{t.label}</button>
          ))}
        </nav>
      </header>
      <main className="max-w-6xl mx-auto px-4 mt-6">
        {phase === 'avatar' && (
          <div className="glass rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-purple-900">ساخت آواتار و کمد لباس بی‌نهایت</h2>
            <div className="flex gap-2">
              <button onClick={() => setGender('female')} className={`px-4 py-2 rounded-xl text-xs font-bold ${gender === 'female' ? 'bg-purple-700 text-white' : 'bg-white border border-purple-200'}`}>خانم</button>
              <button onClick={() => setGender('male')} className={`px-4 py-2 rounded-xl text-xs font-bold ${gender === 'male' ? 'bg-purple-700 text-white' : 'bg-white border border-purple-200'}`}>آقا</button>
              <input type="color" value={fabricColor} onChange={(e) => setFabricColor(e.target.value)} className="w-10 h-9 rounded-lg border cursor-pointer" />
            </div>
            <div className="p-4 rounded-2xl text-white font-bold text-sm" style={{ backgroundColor: fabricColor }}>
              پیش‌نمایش استایل فعال ({gender === 'female' ? 'شال ابریشم و لباس مجلسی' : 'کت‌وشلوار لوکس'})
            </div>
          </div>
        )}
        {phase === 'lobby' && (
          <div className="glass rounded-3xl p-6 text-center space-y-4">
            <h2 className="text-lg font-extrabold text-purple-900">گردونه طلایی قرعه‌کشی میزبان</h2>
            <div className="w-44 h-44 mx-auto rounded-full border-8 border-amber-400 transition-transform duration-1000" style={{ transform: `rotate(${wheelDeg}deg)`, background: 'conic-gradient(#a855f7 0deg 90deg, #ec4899 90deg 180deg, #f59e0b 180deg 270deg, #14b8a6 270deg 360deg)' }} />
            <button onClick={() => { setWheelDeg((d) => d + 1080 + Math.floor(Math.random() * 360)); spinHostDraw(); }} className="px-6 py-3 rounded-2xl bg-amber-500 text-white font-extrabold text-sm">چرخش گردونه</button>
            <p className="text-sm font-bold text-purple-900">ترتیب شب‌ها: {hostOrder.join(' ← ')}</p>
          </div>
        )}
        {phase === 'villa' && (
          <div className="glass rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-purple-900">نمای سه‌بعدی میز و دکوراسیون ویلا</h2>
            <ThreeDiningScene preset={preset} />
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setPreset('pastel')} className="px-4 py-2 rounded-xl bg-pink-100 text-pink-900 text-xs font-bold">پاستلی</button>
              <button onClick={() => setPreset('persian')} className="px-4 py-2 rounded-xl bg-teal-100 text-teal-900 text-xs font-bold">فیروزه‌ای ایرانی</button>
              <button onClick={() => setPreset('luxury')} className="px-4 py-2 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold">طلایی</button>
              <button onClick={() => spendCoins(1200)} className="px-4 py-2 rounded-xl bg-purple-700 text-white text-xs font-bold">خرید گل رز (۱,۲۰۰ سکه)</button>
            </div>
          </div>
        )}
        {phase === 'kitchen' && (
          <div className="glass rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-purple-900">آشپزخانه تعاملی و ثبت غذای جدید</h2>
            <div className="flex gap-2">
              <input value={customDish} onChange={(e) => setCustomDish(e.target.value)} placeholder="نام غذای ابداعی جدید..." className="flex-1 px-3 py-2 rounded-xl border border-purple-200 text-sm" />
              <button onClick={() => { if (customDish.trim()) { setRecipes([customDish.trim(), ...recipes]); setCustomDish(''); } }} className="px-4 py-2 rounded-xl bg-purple-700 text-white text-xs font-bold">ثبت غذا</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recipes.map((r) => <span key={r} className="px-3 py-1.5 rounded-xl bg-white border border-purple-200 text-xs font-bold">{r}</span>)}
            </div>
            <button onClick={() => setCookStep((s) => (s < 5 ? s + 1 : 0))} className="px-5 py-2.5 rounded-xl bg-amber-500 text-white text-xs font-bold">اجرای مرحله آشپزی ({cookStep}/5)</button>
          </div>
        )}
        {phase === 'party' && (
          <div className="glass rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-purple-900">مهمانی زنده و واکنش‌ها</h2>
            <div className="space-y-2 p-4 rounded-2xl bg-white border border-purple-100 text-xs">
              {feed.map((m, i) => <div key={i} className="p-2 rounded-xl bg-purple-50">{m}</div>)}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setFeed([...feed, 'سارا: به به چه طعمی!'])} className="px-4 py-2 rounded-xl bg-white border border-purple-200 text-xs font-bold">تعریف از غذا</button>
              <button onClick={() => setFeed([...feed, 'چالش ناگهانی: دسر فوری با انار و زعفران!'])} className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold">چالش غیرمنتظره</button>
            </div>
          </div>
        )}
        {phase === 'oscar' && (
          <div className="glass rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-purple-900">امتیازدهی ۱ تا ۱۰ و مراسم اسکار</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
              <div>غذا: {scores.food}<input type="range" min={1} max={10} value={scores.food} onChange={(e) => setScores({ ...scores, food: Number(e.target.value) })} className="w-full" /></div>
              <div>دکور: {scores.decor}<input type="range" min={1} max={10} value={scores.decor} onChange={(e) => setScores({ ...scores, decor: Number(e.target.value) })} className="w-full" /></div>
              <div>میزبانی: {scores.host}<input type="range" min={1} max={10} value={scores.host} onChange={(e) => setScores({ ...scores, host: Number(e.target.value) })} className="w-full" /></div>
              <div>استایل: {scores.style}<input type="range" min={1} max={10} value={scores.style} onChange={(e) => setScores({ ...scores, style: Number(e.target.value) })} className="w-full" /></div>
            </div>
            <button onClick={() => setRevealed(true)} className="px-6 py-3 rounded-2xl bg-amber-500 text-white font-extrabold text-sm">ثبت امتیاز و افشای مهمان مرموز</button>
            {revealed && <p className="p-3 rounded-xl bg-purple-50 text-xs font-bold text-purple-900">مهمان مرموز امشب «نرگس» بود! امتیاز کل شما: {scores.food + scores.decor + scores.host + scores.style}/40</p>}
            <div className="space-y-2">
              {players.map((p) => <div key={p.id} className="p-3 rounded-xl bg-white border flex justify-between text-xs font-bold"><span>{p.name} ({p.award})</span><span>{p.score}/40</span></div>)}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}