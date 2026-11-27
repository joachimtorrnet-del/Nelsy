import { useState } from 'react';
import { Link } from 'react-router-dom';
import ToolPage, { NumberField, ResultLine, Prose } from '@/components/tools/ToolPage';

const safe = (n: number) => (Number.isFinite(n) ? n : 0);
const usd = (n: number) => {
  const v = Math.round(safe(n));
  const s = `$${Math.abs(v).toLocaleString('en-US')}`;
  return v < 0 ? `-${s}` : s;
};
const usd2 = (n: number) => {
  const v = Math.round(safe(n) * 100) / 100;
  const s = `$${Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return v < 0 ? `-${s}` : s;
};
const pct = (n: number) => `${safe(n).toLocaleString('en-US', { maximumFractionDigits: 1 })}%`;
const link = 'underline text-[#F52B8C]';

export default function ProfitCalculator() {
  const [appointments, setAppointments] = useState(60);
  const [price, setPrice] = useState(65);
  const [hoursPer, setHoursPer] = useState(1.5);
  const [adminHours, setAdminHours] = useState(12);
  const [productCost, setProductCost] = useState(6);
  const [rent, setRent] = useState(600);
  const [otherFixed, setOtherFixed] = useState(150);
  const [feePct, setFeePct] = useState(2.9);
  const [feeFixed, setFeeFixed] = useState(0.3);
  const [taxPct, setTaxPct] = useState(25);

  const feeRate = Math.min(feePct, 100) / 100;
  const taxRate = Math.min(taxPct, 100) / 100;

  const revenue = appointments * price;
  const products = appointments * productCost;
  const fees = revenue * feeRate + appointments * feeFixed;
  const fixed = rent + otherFixed;
  const preTax = revenue - products - fees - fixed;
  const tax = Math.max(0, preTax) * taxRate;
  const takeHome = preTax - tax;
  const margin = revenue > 0 ? (takeHome / revenue) * 100 : 0;
  const hours = appointments * hoursPer + adminHours;
  const hourly = hours > 0 ? takeHome / hours : 0;
  const perAppointment = price - productCost - price * feeRate - feeFixed;
  const breakEven = perAppointment > 0 ? Math.ceil(fixed / perAppointment) : null;
  const breakEvenLabel = fixed === 0
    ? '0 (no fixed costs)'
    : breakEven === null
      ? 'Not reachable'
      : `${breakEven.toLocaleString('en-US')} / month`;

  const calculator = (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">Your month</h2>
        <div className="grid grid-cols-2 gap-4">
          <NumberField label="Appointments per month" value={appointments} onChange={setAppointments} />
          <NumberField label="Average price" value={price} onChange={setPrice} prefix="$" step={0.01} />
          <NumberField label="Hours per appointment" value={hoursPer} onChange={setHoursPer} step={0.25} suffix="h" hint="Including setup and cleanup" />
          <NumberField label="Admin hours per month" value={adminHours} onChange={setAdminHours} suffix="h" hint="DMs, content, ordering" />
        </div>
        <h2 className="text-base font-bold text-gray-900 pt-2">Your costs</h2>
        <NumberField label="Product cost per appointment" value={productCost} onChange={setProductCost} prefix="$" step={0.01} hint="Polish, gel, lashes, disposables" />
        <div className="grid grid-cols-2 gap-4">
          <NumberField label="Rent or booth rent" value={rent} onChange={setRent} prefix="$" suffix="/mo" hint="Studio, suite or chair" />
          <NumberField label="Other fixed costs" value={otherFixed} onChange={setOtherFixed} prefix="$" suffix="/mo" hint="Software, insurance, phone" />
          <NumberField label="Payment fee" value={feePct} onChange={setFeePct} step={0.1} max={100} suffix="%" hint="From your card processor" />
          <NumberField label="Fee per payment" value={feeFixed} onChange={setFeeFixed} step={0.01} prefix="$" hint="Fixed part, if any" />
        </div>
        <NumberField label="Tax set aside" value={taxPct} onChange={setTaxPct} max={100} suffix="%" hint="A share of profit you keep for taxes. Ask a local accountant for your rate." />
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm md:self-start">
        <h2 className="text-base font-bold text-gray-900 mb-1">Your profit</h2>
        <p className="text-xs text-gray-400 mb-3">Updates as you type</p>
        <ResultLine label="Revenue" value={usd(revenue)} formula="appointments × price" />
        <ResultLine label="Product costs" value={usd(products)} formula="appointments × product cost" />
        <ResultLine label="Payment fees" value={usd(fees)} formula="revenue × fee % + appointments × fee per payment" />
        <ResultLine label="Fixed costs" value={usd(fixed)} formula="rent + other fixed costs" />
        <ResultLine label="Profit before tax" value={usd(preTax)} formula="revenue − products − fees − fixed" />
        <ResultLine label="Tax set aside" value={usd(tax)} formula="profit before tax × tax % (0 if no profit)" />
        <ResultLine label="Monthly profit you keep" value={usd(takeHome)} formula="profit before tax − tax set aside" highlight />
        <ResultLine label="Yearly profit you keep" value={usd(takeHome * 12)} formula="monthly × 12" />
        <ResultLine label="Profit margin" value={revenue > 0 ? pct(margin) : 'n/a'} formula="profit you keep ÷ revenue" />
        <ResultLine label="Effective hourly rate" value={hours <= 0 ? 'n/a' : takeHome < 0 ? 'No profit' : `${usd2(hourly)}/h`} formula={`profit you keep ÷ ${hours.toLocaleString('en-US', { maximumFractionDigits: 1 })} hours worked`} />
        <ResultLine label="Profit per appointment, before fixed costs" value={usd2(perAppointment)} formula="price − product − fees" />
        <ResultLine label="Break-even appointments" value={breakEvenLabel} formula="fixed costs ÷ profit per appointment, rounded up" />
        {preTax < 0 && (
          <p className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 leading-relaxed">
            At these numbers the month runs at a loss. Raise prices, book more appointments or cut a fixed cost, then check the break-even line again.
          </p>
        )}
        {breakEven === null && fixed > 0 && (
          <p className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 leading-relaxed">
            Each appointment costs more than it brings in, so no number of appointments covers your fixed costs. Your price needs to be higher than product cost plus fees.
          </p>
        )}
        <p className="text-xs text-gray-400 mt-4 leading-relaxed">
          An estimate from the numbers you enter, not tax or financial advice. Example values are pre-filled: replace them with your own.
        </p>
      </div>
    </div>
  );

  return (
    <ToolPage
      slug="profit-calculator"
      name="Beauty Business Profit Calculator"
      seoTitle="Beauty Business Profit Calculator: Monthly Profit"
      seoDescription="Free profit calculator for nail techs, lash artists and beauty pros: monthly profit after products, rent, fees and taxes, effective hourly rate and break-even."
      h1="Beauty Business Profit Calculator"
      intro="See what your beauty business really leaves you each month after product costs, rent or booth rent, payment fees and the tax you set aside. Get your effective hourly rate and how many appointments you need to break even."
      calculator={calculator}
      toc={[
        { id: 'how-to', label: 'How to use the calculator' },
        { id: 'math', label: 'The math, step by step' },
        { id: 'example', label: 'A worked example' },
        { id: 'hourly', label: 'Why the effective hourly rate matters' },
        { id: 'improve', label: 'How to improve your profit' },
      ]}
      faq={[
        { q: 'How do I calculate the profit of my beauty business?', a: 'Start with revenue (appointments × average price). Subtract product costs, payment fees and fixed costs such as rent or booth rent. That gives profit before tax. Then set aside a share for taxes: what is left is the profit you keep.' },
        { q: 'What is a break-even point for a nail tech or lash artist?', a: 'It is the number of appointments per month that covers your fixed costs. Each appointment brings in its price minus product cost and payment fees. Divide your fixed costs by that amount and round up.' },
        { q: 'What is an effective hourly rate?', a: 'It is the profit you keep divided by all the hours you work, including setup, cleanup and admin time such as replying to DMs. It is usually much lower than your price divided by service time, and it is the number to compare with a salaried job.' },
        { q: 'How much should I set aside for taxes?', a: 'It depends on your country, state and situation, so the calculator lets you choose the percentage. Ask a local accountant for the right rate. Setting money aside each month avoids a large bill at the end of the year.' },
        { q: 'Does this calculator store my numbers?', a: 'No. Everything is calculated in your browser and nothing is sent or saved.' },
      ]}
      cta={{ title: 'Spend less time on admin', text: 'Clients book and pay a deposit from your Nelsy page, so fewer hours go to DMs and chasing payments. 0% Nelsy commission on your bookings.' }}
      related={[
        { label: 'Nail tech profit margin explained', href: '/blog/nail-tech-profit-margin-explained' },
        { label: 'Nail tech break-even point', href: '/blog/nail-tech-break-even-point' },
        { label: 'Nail tech expense list', href: '/blog/nail-tech-expense-list' },
        { label: 'How to price nail services for profit', href: '/blog/how-to-price-nail-services-for-profit' },
        { label: 'Booth rental vs commission', href: '/blog/booth-rental-vs-commission-nail-techs' },
      ]}
    >
      <Prose id="how-to" title="How to use the calculator">
        <ol className="list-decimal list-inside space-y-2">
          <li><strong>Enter a normal month.</strong> Count your appointments over the last three months and divide by three. Use your average ticket, not your highest price.</li>
          <li><strong>Add the time you really spend.</strong> Hours per appointment should include setup, cleanup and sanitizing. Admin hours cover DMs, content, ordering stock and bookkeeping.</li>
          <li><strong>List your costs.</strong> Product cost per appointment is what one service uses up. Fixed costs are what you pay even in a slow month: rent or booth rent, software, insurance, phone.</li>
          <li><strong>Check your payment fees and tax rate.</strong> Use the rate your card processor charges and the share of profit your accountant suggests setting aside.</li>
        </ol>
      </Prose>

      <Prose id="math" title="The math, step by step">
        <p><strong>Revenue = appointments × average price.</strong></p>
        <p><strong>Payment fees = revenue × fee % + appointments × fee per payment.</strong> This assumes every appointment is paid by card. If some clients pay cash, lower the fee percentage.</p>
        <p><strong>Profit before tax = revenue − product costs − payment fees − fixed costs.</strong></p>
        <p><strong>Tax set aside = profit before tax × tax %.</strong> Nothing is set aside when the month makes no profit.</p>
        <p><strong>Profit you keep = profit before tax − tax set aside.</strong> Margin is that amount divided by revenue.</p>
        <p><strong>Effective hourly rate = profit you keep ÷ (appointments × hours per appointment + admin hours).</strong></p>
        <p><strong>Break-even = fixed costs ÷ (price − product cost − fees on one appointment)</strong>, rounded up to a whole appointment.</p>
      </Prose>

      <Prose id="example" title="A worked example">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="font-bold text-gray-900 mb-2">The pre-filled values</p>
          <p>60 appointments at $65 bring in $3,900. Products cost 60 × $6 = $360. Fees are $3,900 × 2.9% + 60 × $0.30 = $131.10. Fixed costs are $600 + $150 = $750. Profit before tax: $3,900 − $360 − $131.10 − $750 = $2,658.90. Setting aside 25% ($664.73) leaves <strong>about $1,994 a month</strong>.</p>
          <p className="mt-2">Hours worked: 60 × 1.5 + 12 = 102. Effective hourly rate: $1,994 ÷ 102 = <strong>about $19.55 an hour</strong>. Each appointment leaves $65 − $6 − $2.19 = $56.81 before fixed costs, so the break-even point is $750 ÷ $56.81 = 13.2, rounded up to <strong>14 appointments</strong>.</p>
        </div>
        <p>These figures come only from the example inputs. Your own result depends entirely on the numbers you enter.</p>
      </Prose>

      <Prose id="hourly" title="Why the effective hourly rate matters">
        <p>A $65 service that takes an hour looks like $65 an hour. Once product, fees, rent, taxes and unpaid admin time come out, the example above keeps less than a third of that. The effective hourly rate is the honest number to compare with a salaried job or with another way of working, such as <Link to="/blog/booth-rental-vs-commission-nail-techs" className={link}>booth rental or commission</Link>.</p>
        <p>To set prices from a target income instead, use the <Link to="/tools/nail-tech-pricing-calculator" className={link}>beauty service price calculator</Link>.</p>
      </Prose>

      <Prose id="improve" title="How to improve your profit">
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Raise your average ticket</strong> with add-ons and a clear menu. See <Link to="/blog/how-to-increase-appointment-value" className={link}>how to increase appointment value</Link>.</li>
          <li><strong>Protect your slots.</strong> Every no-show is revenue with the same fixed costs. Estimate it with the <Link to="/tools/no-show-cost-calculator" className={link}>no-show cost calculator</Link> and size a deposit with the <Link to="/tools/deposit-calculator" className={link}>deposit calculator</Link>.</li>
          <li><strong>Cut admin hours.</strong> Online booking replaces back-and-forth DMs, which raises your effective hourly rate without changing prices.</li>
          <li><strong>Review fixed costs once a year</strong>, including the software you pay for. The <Link to="/tools/booking-app-fee-calculator" className={link}>booking app fee calculator</Link> compares what booking apps cost.</li>
        </ul>
      </Prose>
    </ToolPage>
  );
}
