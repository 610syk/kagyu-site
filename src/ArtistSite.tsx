import { useMemo, useRef, useState } from "react";
export default function ArtistSite() {
  const refs = {
    top: useRef<HTMLDivElement | null>(null),
    artist: useRef<HTMLDivElement | null>(null),
    sns: useRef<HTMLDivElement | null>(null),
    works: useRef<HTMLDivElement | null>(null),
    activity: useRef<HTMLDivElement | null>(null),
    contact: useRef<HTMLDivElement | null>(null),
  };

  const scrollTo = (key: keyof typeof refs) => {
    refs[key].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const ARTIST = {
    avatar: "/images/avatar_kagyu.jpg",
    nameJa: "納角蝸牛",
    nameEn: "NATSUNO KAGYU",
    bio: "抽象表現と生物モチーフを行き来しながら、内面の風景を色とリズムで可視化するアーティスト。音と言葉の制作（作詞）も並行。",
  };

  const SNS = [
    { key: "instagram", label: "Instagram", url: "https://instagram.com/your_id" },
    { key: "x", label: "X", url: "https://x.com/your_id" },
    { key: "youtube", label: "YouTube", url: "https://www.youtube.com/@your_channel" },
  ];

  const WORKS: Record<string, string[]> = {
    Abstract: [
      "/works/abstract/abstract01.jpg",
      "/works/abstract/abstract02.jpg",
      "/works/abstract/abstract03.jpg",
    ],
    Creature: [
      "/works/creature/creature01.jpg",
      "/works/creature/creature02.jpg",
      "/works/creature/creature03.jpg",
    ],
    Charactor: [
      "/works/charactor/charactor01.jpg",
      "/works/charactor/charactor02.jpg",
      "/works/charactor/charactor03.jpg",
    ],
  };

  const YT_IDS = ["dQw4w9WgXcQ", "M7lc1UVf-VE", "3JZ_D3ELwOQ"];

  const ACTIVITY_TAGS = ["作詞", "抽象画", "キャラクターデザイン", "ZINE/年賀状", "展示/グループ展"];
  const TIMELINE = [
    { date: "2023", text: "抽象画シリーズ『Emerald Drift』制作開始" },
    { date: "2024", text: "キャラクター『ブイーナ』制作・配信開始" },
    { date: "2025", text: "グループ展参加（古淵）/ 新作『Creature』公開" },
  ];

  const categories = useMemo(() => Object.keys(WORKS) as (keyof typeof WORKS)[], []);
  const [idxByCat, setIdxByCat] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const cat of categories) init[cat] = 0;
    return init;
  });
  const [ytIndex, setYtIndex] = useState(0);

  const go = (cat: string, dir: 1 | -1) => {
    const list = WORKS[cat];
    const next = (idxByCat[cat] + dir + list.length) % list.length;
    setIdxByCat((s) => ({ ...s, [cat]: next }));
  };

  const goYT = (dir: 1 | -1) => {
    setYtIndex((n) => (n + dir + YT_IDS.length) % YT_IDS.length);
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-[radial-gradient(1200px_700px_at_10%_-10%,#e6fbf5_0%,transparent_60%),radial-gradient(1000px_600px_at_95%_5%,#e8f6ff_0%,transparent_55%)] from-mist via-white to-haze">
      <header className="sticky top-0 z-50 backdrop-blur-xs bg-white/55 border-b border-white/60">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="font-display tracking-wide text-slate-700">NATSUNO KAGYU</div>
          <nav className="overflow-x-auto no-scrollbar">
            <ul className="flex gap-2 whitespace-nowrap">
              {[
                { k: "artist", t: "アーティスト" },
                { k: "sns", t: "SNS" },
                { k: "works", t: "作品集" },
                { k: "activity", t: "活動" },
                { k: "contact", t: "問い合わせ" },
              ].map((item) => (
                <li key={item.k}>
                  <button
                    onClick={() => scrollTo(item.k as keyof typeof refs)}
                    className="px-4 py-2 rounded-full border border-emerald-200 bg-white/60 hover:bg-emerald-50 transition text-sm"
                  >
                    {item.t}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-8">
        <button
          onClick={() => scrollTo("artist")}
          className="group w-full rounded-2xl p-6 glass shadow-soft transition hover:bg-white/65 hover:shadow-lg"
        >
          <div className="text-left">
            <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-700/70">TOP</p>
            <h1 className="mt-1 text-[clamp(20px,3.2vw,30px)] font-display text-slate-800/90">
              アーティスト情報 / SNS / 作品集 へスライド
            </h1>
            <p className="mt-1 text-slate-600/80">上部のリンク、またはこのカードをクリックしてセクションへ移動</p>
          </div>
          <span className="text-xl md:text-2xl opacity-70 group-hover:translate-x-1 transition">→</span>
        </button>
      </section>

      <section ref={refs.artist} className="mx-auto max-w-6xl px-4 py-14" id="artist">
        <h2 className="text-sm tracking-[0.22em] text-emerald-800/70 font-display">ARTIST</h2>
        <div className="mt-6 flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-40 h-40 shrink-0">
            <img src={ARTIST.avatar} alt="Artist avatar" className="w-40 h-40 object-cover rounded-full ring-4 ring-white/70 shadow-soft" />
          </div>
          <div className="flex-1">
            <div className="text-2xl font-semibold">{ARTIST.nameJa}</div>
            <div className="text-sm tracking-widest text-slate-500">{ARTIST.nameEn}</div>
            <p className="mt-4 leading-7 text-slate-700">{ARTIST.bio}</p>
          </div>
        </div>
      </section>

      <section ref={refs.sns} className="mx-auto max-w-6xl px-4 py-12 border-t border-emerald-100" id="sns">
        <h2 className="text-sm tracking-[0.22em] text-emerald-800/70 font-display">SNS</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SNS.map((s) => (
            <a key={s.key} href={s.url} target="_blank" rel="noreferrer" className="group rounded-2xl glass p-6 shadow-soft transition hover:bg-white/65">
              <div>
                <div className="text-lg font-medium">{s.label}</div>
                <div className="text-xs text-slate-500 mt-1">{s.url}</div>
              </div>
              <span className="text-2xl group-hover:translate-x-1 transition">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section ref={refs.works} className="mx-auto max-w-6xl px-4 py-12 border-t border-emerald-100" id="works">
        <h2 className="text-sm tracking-[0.22em] text-emerald-800/70 font-display">WORKS</h2>
        <p className="mt-1 text-slate-500">Abstract → Creature → Charactor の順で、◀▶で1枚ずつめくれます。YouTube も同様。</p>
        <div className="mt-6 space-y-8">
          {categories.map((cat) => (
            <div key={cat} className="rounded-2xl glass p-4 md:p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{cat}</h3>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded-full border border-slate-300/50 bg-white/50 hover:bg-white/70 transition text-slate-700/80" onClick={() => go(cat, -1)}>◀</button>
                  <button className="px-3 py-1 rounded-full border border-slate-300/50 bg-white/50 hover:bg-white/70 transition text-slate-700/80" onClick={() => go(cat, 1)}>▶</button>
                </div>
              </div>
              <div className="mt-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
                <img src={WORKS[cat][idxByCat[cat]]} alt={`${cat} work`} className="w-full h-full object-cover transition will-change-transform hover:scale-[1.01]" />
              </div>
              <p className="mt-2 text-xs text-slate-500">{idxByCat[cat] + 1} / {WORKS[cat].length}</p>
            </div>
          ))}
          <div className="rounded-2xl glass p-4 md:p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">YouTube</h3>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 rounded-full border border-slate-300/50 bg-white/50 hover:bg-white/70 transition text-slate-700/80" onClick={() => goYT(-1)}>◀</button>
                <button className="px-3 py-1 rounded-full border border-slate-300/50 bg-white/50 hover:bg-white/70 transition text-slate-700/80" onClick={() => goYT(1)}>▶</button>
              </div>
            </div>
            <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl bg-black">
              <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${YT_IDS[ytIndex]}?rel=0`} title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
            <p className="mt-2 text-xs text-slate-500">{ytIndex + 1} / {YT_IDS.length}</p>
          </div>
        </div>
      </section>

      <section ref={refs.activity} className="mx-auto max-w-6xl px-4 py-12 border-t border-emerald-100" id="activity">
        <h2 className="text-sm tracking-[0.22em] text-emerald-800/70 font-display">ACTIVITY</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {ACTIVITY_TAGS.map((t) => (
            <span key={t} className="inline-flex items-center rounded-full border border-emerald-200 bg-white/60 px-3 py-1 text-sm">{t}</span>
          ))}
        </div>
        <div className="mt-8 relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-emerald-200" aria-hidden />
          <ul className="space-y-6">
            {TIMELINE.map((ev, i) => (
              <li key={i} className="relative pl-10">
                <span className="absolute left-3 top-1.5 h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                <div className="rounded-xl glass p-4 border border-emerald-100">
                  <div className="text-xs text-emerald-700 font-semibold">{ev.date}</div>
                  <div className="mt-1 text-slate-700">{ev.text}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section ref={refs.contact} className="mx-auto max-w-6xl px-4 py-12 border-t border-emerald-100" id="contact">
        <h2 className="text-sm tracking-[0.22em] text-emerald-800/70 font-display">CONTACT</h2>
        <div className="mt-4 rounded-2xl glass p-6">
          <p className="text-slate-700">お問い合わせはメールでご連絡ください。</p>
          <a href="mailto:your.name@gmail.com" className="mt-2 inline-block text-emerald-700 hover:underline">your.name@gmail.com</a>
        </div>
      </section>

      <footer className="mt-20 border-t border-emerald-100 py-8">
        <div className="mx-auto max-w-6xl px-4 text-sm text-slate-500">© {new Date().getFullYear()} NATSUNO KAGYU — All Rights Reserved.</div>
      </footer>
    </div>
  );
}