'use client';

import { FormEvent, useState } from 'react';

const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });
type Vehicle = { registration: string; mileage: number; condition: string; privateValue: number; tradeValue: number; retailValue: number };

function normalisePlate(value: string) { return value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8); }

export default function Home() {
  const [registration, setRegistration] = useState('');
  const [mileage, setMileage] = useState('42000');
  const [condition, setCondition] = useState('Good');
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');

  function estimate(event: FormEvent) {
    event.preventDefault();
    const plate = normalisePlate(registration);
    if (plate.length < 5) { setNotice('Enter a valid UK registration to see your estimate.'); return; }
    const miles = Math.max(0, Number(mileage) || 42000);
    setLoading(true); setNotice('');
    window.setTimeout(() => {
      const mileageAdjustment = Math.max(-2800, Math.min(2100, (42000 - miles) * 0.042));
      const conditionAdjustment = condition === 'Excellent' ? 700 : condition === 'Fair' ? -900 : 0;
      setVehicle({ registration: plate, mileage: miles, condition, privateValue: Math.round(11750 + mileageAdjustment + conditionAdjustment), tradeValue: Math.round(10650 + mileageAdjustment + conditionAdjustment), retailValue: Math.round(13450 + mileageAdjustment + conditionAdjustment) });
      setLoading(false);
    }, 550);
  }

  return <main>
    <nav className="nav shell"><a className="brand" href="#top"><span>Price</span>Plate</a><div className="nav-links"><a href="#how">How it works</a><a href="#checks">What you get</a></div></nav>
    <section className="hero" id="top"><div className="hero-glow" /><div className="shell hero-grid"><div><p className="eyebrow">UK vehicle pricing, made clearer</p><h1>Know the number before you negotiate.</h1><p className="hero-copy">Get an indicative view of what a used vehicle could be worth, then see the checks that matter before you buy or sell.</p><div className="trust-row"><span>● Free estimate</span><span>● UK focused</span><span>● No account needed</span></div></div>
    <form className="lookup-card" onSubmit={estimate}><p className="form-kicker">Start with a registration</p><label htmlFor="registration">Vehicle registration</label><input id="registration" value={registration} onChange={(e) => setRegistration(normalisePlate(e.target.value))} placeholder="AB12 CDE" autoComplete="off" /><div className="form-row"><div><label htmlFor="mileage">Current mileage</label><input id="mileage" inputMode="numeric" value={mileage} onChange={(e) => setMileage(e.target.value.replace(/[^0-9]/g, ''))} /></div><div><label htmlFor="condition">Condition</label><select id="condition" value={condition} onChange={(e) => setCondition(e.target.value)}><option>Excellent</option><option>Good</option><option>Fair</option></select></div></div><button type="submit" disabled={loading}>{loading ? 'Checking your vehicle…' : 'Check vehicle value'}</button>{notice && <p className="notice">{notice}</p>}<p className="fine-print">Demo prototype. Results use illustrative data, not a live valuation.</p></form></div></section>
    {vehicle && <section className="results shell" aria-live="polite"><div className="result-heading"><div><p className="eyebrow">Your indicative value</p><h2>2019 Volkswagen Golf</h2><p>1.5 TSI EVO Match 5dr · Petrol · Manual</p></div><div className="plate">{vehicle.registration}</div></div><div className="vehicle-meta"><span>{vehicle.mileage.toLocaleString('en-GB')} miles</span><span>{vehicle.condition} condition</span><span>Indicative estimate</span></div><div className="value-grid"><ValueCard label="Part exchange" value={vehicle.tradeValue} text="Likely dealer purchase range" /><ValueCard label="Private sale" value={vehicle.privateValue} text="Typical direct-sale estimate" featured /><ValueCard label="Dealer retail" value={vehicle.retailValue} text="Typical advertised retail value" /></div><div className="result-bottom"><article className="mot-card"><div><p className="card-label">MOT snapshot</p><h3>MOT current</h3><p>Expires 18 June 2027</p><p className="subtle">No advisory items recorded at the latest test.</p></div><span className="check">✓</span></article><article className="upgrade-card"><p className="card-label">Buying this car?</p><h3>Run a full vehicle check</h3><p>See finance, insurance write-off, stolen, scrapped and mileage-risk markers before you commit.</p><button className="secondary" type="button" onClick={() => alert('Full reports will be enabled when live VehicleMatic data is connected.')}>Full check coming soon</button></article></div><p className="disclaimer">This is a demonstration valuation. A live product will use verified vehicle identity, valuation and provenance data. Actual sale price depends on exact specification, condition, history, location and market demand.</p></section>}
    <section className="feature-section" id="how"><div className="shell"><p className="eyebrow">Designed for real decisions</p><h2>A clearer route from registration to confidence.</h2><div className="steps"><article><span>01</span><h3>Identify the vehicle</h3><p>Enter its registration, mileage and condition so the estimate has useful context.</p></article><article><span>02</span><h3>Understand the price</h3><p>Compare trade, private-sale and dealer-retail positions without pretending one number fits every sale.</p></article><article><span>03</span><h3>Check the risk</h3><p>Use a full history report before you negotiate, leave a deposit or transfer money.</p></article></div></div></section>
    <section className="what-section" id="checks"><div className="shell what-grid"><div><p className="eyebrow">More than a guide price</p><h2>Price context, vehicle context and buyer confidence in one place.</h2></div><ul><li><b>Useful price positions</b><span>See why a part-exchange offer and retail asking price are rarely the same thing.</span></li><li><b>Plain-English results</b><span>Built to explain the number, not bury you in motor-trade jargon.</span></li><li><b>History checks when it matters</b><span>Finance, write-off, theft and mileage-risk checks are designed for the point of decision.</span></li></ul></div></section>
    <footer className="footer shell"><a className="brand" href="#top"><span>Price</span>Plate</a><p>Demo prototype · UK used vehicle pricing</p></footer>
  </main>;
}

function ValueCard({ label, value, text, featured = false }: { label: string; value: number; text: string; featured?: boolean }) { return <article className={`value-card ${featured ? 'featured' : ''}`}><p>{label}</p><strong>{money.format(value)}</strong><span>{text}</span></article>; }
